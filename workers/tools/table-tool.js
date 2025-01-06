import { corsHeaders, handleOptions } from '../utils/cors.js'

export async function handleTableData(request, env) {
  if (request.method === 'OPTIONS') {
    return handleOptions()
  }

  const url = new URL(request.url)
  const endpoint = url.pathname.split('/').pop()

  // 处理单元格图片上传
  if (endpoint === 'upload-cell-image') {
    return handleCellImageUpload(request, env)
  }

  // 处理图片上传
  if (endpoint === 'upload') {
    return handleImageUpload(request, env)
  }

  // 处理图片删除
  if (endpoint === 'delete-image') {
    return handleImageDelete(request, env)
  }

  // 处理文件上传
  if (endpoint === 'upload-file') {
    return handleFileUpload(request, env)
  }

  // 处理文件下载/预览
  if (endpoint === 'access-file') {
    return handleFileAccess(request, env)
  }

  // 处理文件删除
  if (endpoint === 'delete-file') {
    return handleFileDelete(request, env)
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

    try {
      // 上传到 R2
      await env.TRAVEL_IMAGES.put(fileName, file.stream(), {
        httpMetadata: {
          contentType: file.type
        }
      })

      // 生成图片访问 URL
      const baseUrl = new URL(request.url).origin
      const imageUrl = `${baseUrl}/images/${fileName}`

      // 更新表格数据中的附件信息
      const key = `${pageId}:${tableId}`
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
    } catch (uploadError) {
      console.error('上传到 R2 失败:', uploadError)
      throw new Error('文件上传失败')
    }
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
async function handleImageDelete(request, env) {
  try {
    const { pageId, tableId, fileName } = await request.json()

    if (!pageId || !tableId || !fileName) {
      throw new Error('缺少必要参数')
    }

    try {
      // 从 R2 删除文件
      await env.TRAVEL_IMAGES.delete(fileName)

      // 更新表格数据
      const key = `${pageId}:${tableId}`
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
    } catch (deleteError) {
      console.error('删除文件失败:', deleteError)
      throw new Error('删除文件失败')
    }
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

// 处理单元格图片上传
async function handleCellImageUpload(request, env) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const pageId = formData.get('pageId')
    const tableId = formData.get('tableId')
    const cellId = formData.get('cellId')

    if (!file || !pageId || !tableId || !cellId) {
      throw new Error('缺少必要参数')
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('只能上传图片文件')
    }

    // 生成唯一文件名
    const fileExt = file.name.split('.').pop()
    const fileName = `${pageId}/${tableId}/cell_${cellId}_${Date.now()}.${fileExt}`

    try {
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
          url: imageUrl
        }
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (uploadError) {
      console.error('上传到 R2 失败:', uploadError)
      throw new Error('文件上传失败')
    }
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

// 处理文件上传
async function handleFileUpload(request, env) {
  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const pageId = formData.get('pageId')
    const tableId = formData.get('tableId')
    const cellId = formData.get('cellId')

    if (!file || !pageId || !tableId) {
      throw new Error('缺少必要参数')
    }

    // 检查文件类型和大小
    const allowedTypes = new Set([
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ])

    if (!allowedTypes.has(file.type)) {
      throw new Error('不支持的文件类型')
    }

    // 限制文件大小（10MB）
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      throw new Error('文件大小超过限制')
    }

    // 生成文件名
    const fileExt = file.name.split('.').pop()
    const fileName = cellId 
      ? `${pageId}/${tableId}/cell_${cellId}_${Date.now()}.${fileExt}`
      : `${pageId}/${tableId}/${Date.now()}_${file.name}`

    // 上传到 R2
    await env.TRAVEL_IMAGES.put(fileName, file.stream(), {
      httpMetadata: {
        contentType: file.type
      }
    })

    // 生成访问 URL
    const baseUrl = new URL(request.url).origin
    const fileUrl = `${baseUrl}/images/${fileName}`

    // 更新表格数据
    const key = `${pageId}:${tableId}`
    let tableData = await env.TRAVEL_DATA.get(key, { type: 'json' }) || { rows: [], attachments: [] }
    
    if (!cellId) {  // 只有普通附件才添加到 attachments
      tableData.attachments = tableData.attachments || []
      tableData.attachments.push({
        name: file.name,
        key: fileName,
        url: fileUrl,
        type: file.type,
        size: file.size,
        uploadedAt: new Date().toISOString()
      })
      await env.TRAVEL_DATA.put(key, JSON.stringify(tableData))
    }

    return new Response(JSON.stringify({
      success: true,
      file: {
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size
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

// 处理文件下载/预览
async function handleFileAccess(request, env) {
  try {
    const url = new URL(request.url)
    const key = decodeURIComponent(url.pathname.replace('/images/', ''))
    
    const object = await env.TRAVEL_IMAGES.get(key)
    
    if (!object) {
      return new Response('File not found', { 
        status: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
    }

    const headers = new Headers()
    object.writeHttpMetadata(headers)
    headers.set('etag', object.httpEtag)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Cache-Control', 'public, max-age=31536000')
    
    // 对于下载类型的文件，添加下载头
    const isDownloadable = !object.httpMetadata.contentType?.startsWith('image/')
    if (isDownloadable) {
      headers.set('Content-Disposition', `attachment; filename="${key.split('/').pop()}"`)
    }

    return new Response(object.body, {
      headers
    })
  } catch (error) {
    console.error('获取文件失败:', error)
    return new Response('Error fetching file', { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}

// 处理文件删除
async function handleFileDelete(request, env) {
  try {
    const { pageId, tableId, fileName } = await request.json()

    if (!pageId || !tableId || !fileName) {
      throw new Error('缺少必要参数')
    }

    // 从 R2 删除文件
    await env.TRAVEL_IMAGES.delete(fileName)

    // 更新表格数据
    const key = `${pageId}:${tableId}`
    let tableData = await env.TRAVEL_DATA.get(key, { type: 'json' }) || { rows: [], attachments: [] }
    
    // 从附件列表中移除
    tableData.attachments = (tableData.attachments || []).filter(
      attachment => attachment.key !== fileName
    )

    await env.TRAVEL_DATA.put(key, JSON.stringify(tableData))

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

// 在路由处理中添加删除文件的路由
async function handleRequest(request, env) {
  const url = new URL(request.url)
  const path = url.pathname

  // 处理文件删除
  if (path.endsWith('/delete-file')) {
    return handleFileDelete(request, env)
  }

  // ... 其他路由处理保持不变 ...
} 