import { corsHeaders, handleOptions } from '../utils/cors.js'

export async function handleKVData(request, env) {
  // 处理 OPTIONS 请求
  if (request.method === 'OPTIONS') {
    return handleOptions()
  }

  // GET 请求处理
  if (request.method === 'GET') {
    try {
      const url = new URL(request.url)
      const pageId = url.searchParams.get('pageId')
      const tableId = url.searchParams.get('tableId')

      if (!pageId || !tableId) {
        return new Response(JSON.stringify({ 
          error: 'pageId and tableId are required' 
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        })
      }

      const key = `${pageId}:${tableId}`
      const data = await env.TRAVEL_DATA.get(key, { type: 'json' })

      return new Response(JSON.stringify({
        rows: data?.rows || [],
        attachments: data?.attachments || []
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      console.error('Read error:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }

  // POST 请求处理
  if (request.method === 'POST') {
    try {
      const formData = await request.formData()
      const pageId = formData.get('pageId')
      const tableId = formData.get('tableId')
      const data = formData.get('data')

      if (!pageId || !tableId) {
        throw new Error('pageId and tableId are required')
      }

      const key = `${pageId}:${tableId}`
      let existingData = await env.TRAVEL_DATA.get(key, { type: 'json' }) || { rows: [], attachments: [] }

      if (data) {
        try {
          existingData.rows = JSON.parse(data)
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError, 'Raw data:', data)
          throw new Error(`Invalid JSON data: ${jsonError.message}`)
        }
      }

      await env.TRAVEL_DATA.put(key, JSON.stringify(existingData))

      return new Response(JSON.stringify({ 
        success: true,
        message: '数据保存成功'
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      console.error('Save error:', error)
      return new Response(JSON.stringify({ 
        error: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }
} 