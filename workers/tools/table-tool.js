import { corsHeaders, handleOptions } from '../utils/cors.js'

export async function handleTableData(request, env) {
  if (request.method === 'OPTIONS') {
    return handleOptions()
  }

  const url = new URL(request.url)
  const endpoint = url.pathname.split('/').pop()

  // 处理图片上传
  if (endpoint === 'upload') {
    return handleImageUpload(request, env)
  }

  // 处理图片删除
  if (endpoint === 'delete-image') {
    return handleImageDelete(request, env)
  }

  // 处理表格数据
  return handleTableContent(request, env)
}

// 处理表格内容数据
async function handleTableContent(request, env) {
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

      // 使用相同的 key 格式
      const key = `${pageId}:${tableId}`
      const data = await env.TRAVEL_DATA.get(key, { type: 'json' })
      
      // 确保返回有效的数据结构
      const response = {
        rows: data?.rows || [],
        attachments: data?.attachments || []
      }

      return new Response(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      console.error('Read error:', error)
      return new Response(JSON.stringify({ 
        error: error.message || '读取数据失败'
      }), {
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
          const parsedData = JSON.parse(data)
          if (!Array.isArray(parsedData)) {
            throw new Error('数据格式错误：应为数组')
          }
          // 确保每个元素都是对象
          parsedData.forEach((row, index) => {
            if (typeof row !== 'object' || row === null) {
              throw new Error(`第 ${index + 1} 行数据格式错误`)
            }
          })
          existingData.rows = parsedData
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError, 'Raw data:', data)
          throw new Error(`数据格式错误: ${jsonError.message}`)
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
        error: error.message || '保存失败'
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

// 处理图片上传
async function handleImageUpload(request, env) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const pageId = formData.get('pageId')
    const tableId = formData.get('tableId')

    if (!file || !pageId || !tableId) {
      throw new Error('缺少必要参数')
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      throw new Error('只能上传图片文件')
    }

    // 生成唯一文件名
    const fileExt = file.name.split('.').pop()
    const fileName = `${pageId}/${tableId}/${Date.now()}.${fileExt}`

    // 上传到 R2
    await env.TRAVEL_IMAGES.put(fileName, file.stream(), {
      httpMetadata: {
        contentType: file.type
      }
    })

    // 获取图片访问URL
    const imageUrl = await env.TRAVEL_IMAGES.get(fileName).url

    // 更新表格数据中的附件信息
    const key = `table:${pageId}:${tableId}`
    let tableData = await env.TRAVEL_DATA.get(key, { type: 'json' }) || { rows: [], attachments: [] }
    
    tableData.attachments = tableData.attachments || []
    tableData.attachments.push({
      name: file.name,
      key: fileName,
      url: imageUrl,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    })

    await env.TRAVEL_DATA.put(key, JSON.stringify(tableData))

    return new Response(JSON.stringify({
      success: true,
      file: {
        name: file.name,
        url: imageUrl
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// 处理图片删除
async function handleImageDelete(request, env) {
  try {
    const { pageId, tableId, fileName } = await request.json()

    if (!pageId || !tableId || !fileName) {
      throw new Error('缺少必要参数')
    }

    // 从 R2 删除文件
    await env.TRAVEL_IMAGES.delete(fileName)

    // 更新表格数据
    const key = `table:${pageId}:${tableId}`
    let tableData = await env.TRAVEL_DATA.get(key, { type: 'json' })
    
    if (tableData && tableData.attachments) {
      tableData.attachments = tableData.attachments.filter(
        attachment => attachment.key !== fileName
      )
      await env.TRAVEL_DATA.put(key, JSON.stringify(tableData))
    }

    return new Response(JSON.stringify({
      success: true,
      message: '删除成功'
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('删除失败:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
} 