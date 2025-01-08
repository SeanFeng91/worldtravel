import { corsHeaders } from '../utils/cors.js';

// 处理 R2 图片请求
export async function handleR2Image(request, env) {
  try {
    const url = new URL(request.url)
    const key = decodeURIComponent(url.pathname.replace('/images/', ''))
    
    console.log('Fetching image with key:', key)  // 添加日志

    const object = await env.TRAVEL_IMAGES.get(key)
    
    if (!object) {
      console.error('Image not found:', key)
      return new Response('Image not found', { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'text/plain'
        }
      })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Cache-Control', 'public, max-age=31536000')
    
    if (!headers.get('Content-Type')) {
      // 根据文件扩展名设置 Content-Type
      const ext = key.split('.').pop().toLowerCase()
      const contentTypes = {
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'webp': 'image/webp'
      }
      headers.set('Content-Type', contentTypes[ext] || 'application/octet-stream')
    }

    return new Response(object.body, {
      headers
    })
  } catch (error) {
    console.error('获取图片失败:', error)
    return new Response('Error fetching image', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
      }
    })
  }
}

// 处理图片上传
export async function handleImageUpload(request, env) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const pageId = formData.get('pageId')
    const tableId = formData.get('tableId')

    if (!file) {
      throw new Error('没有找到文件')
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      throw new Error('只能上传图片文件')
    }

    // 生成唯一文件名
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

    // 上传到 R2
    await env.TRAVEL_IMAGES.put(fileName, file.stream(), {
      httpMetadata: {
        contentType: file.type
      }
    })

    // 生成图片访问 URL
    const baseUrl = new URL(request.url).origin
    const imageUrl = `${baseUrl}/images/${fileName}`

    return new Response(JSON.stringify({
      success: true,
      file: {
        name: file.name,
        url: imageUrl,
        key: fileName
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('上传失败:', error)
    return new Response(JSON.stringify({ 
      error: error.message || '上传失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

// 处理图片删除
export async function handleImageDelete(request, env) {
  try {
    const { key } = await request.json()
    
    if (!key) {
      throw new Error('缺少图片 key')
    }

    await env.TRAVEL_IMAGES.delete(key)

    return new Response(JSON.stringify({
      success: true
    }), {
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  } catch (error) {
    console.error('删除失败:', error)
    return new Response(JSON.stringify({ 
      error: error.message || '删除失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
} 