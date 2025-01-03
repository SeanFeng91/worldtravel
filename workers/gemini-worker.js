import { corsHeaders, handleOptions } from './utils/cors.js';
import { youtubeTools, handleYouTubeTool } from './tools/youtube-tool.js';
import { handleMapTool } from './tools/map-tool.js';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1alpha';  // 使用固定的 endpoint

async function handleTravelData(request, env) {
  // 处理 OPTIONS 预检请求
  if (request.method === 'OPTIONS') {
    return handleOptions()
  }

  // GET 请求从 URL 参数获取 pageId
  if (request.method === 'GET') {
    const url = new URL(request.url)
    const pageId = url.searchParams.get('pageId')

    if (!pageId) {
      return new Response(JSON.stringify({ error: 'pageId is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    try {
      const data = await env.TRAVEL_DATA.get(pageId, { type: 'json' })
      return new Response(JSON.stringify({ rows: data || [] }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } catch (error) {
      console.error('KV read error:', error)
      return new Response(JSON.stringify({ error: 'Failed to read data' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  }

  // POST 请求从请求体获取 pageId
  if (request.method === 'POST') {
    try {
      const body = await request.json()
      console.log('Received POST data:', body)

      const { pageId, rows } = body
      
      if (!pageId) {
        return new Response(JSON.stringify({ 
          error: 'pageId is required',
          receivedBody: body
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        })
      }

      await env.TRAVEL_DATA.put(pageId, JSON.stringify(rows))
      
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
        error: 'Failed to save data',
        details: error.message 
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

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    
    if (url.pathname === '/api/travel-data') {
      return handleTravelData(request, env)
    }
    
    if (request.method === "OPTIONS") {
      return handleOptions();
    }

    try {
      const { prompt, messages, settings, searchEnabled, mapEnabled, youtubeEnabled } = await request.json();

      // 构建系统提示词
      const systemPrompt = {
        role: 'model',
        parts: [{ text: `你是一个智能助手。
          ${searchEnabled ? '你可以使用搜索功能获取实时信息。当用户询问新闻、天气、机票等实时信息时，请主动使用搜索功能。' : ''}
          ${youtubeEnabled ? '你可以搜索相关视频。当用户需要视频资源时，请主动使用视频搜索功能。' : ''}
          请用中文回答。` 
        }]
      };

      // 构建对话历史
      const contents = [
        systemPrompt,
        ...messages.filter(msg => msg.content?.trim()).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }))
      ];

      // 添加当前提示
      if (prompt?.trim()) {
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });
      } else {
        console.warn('Empty prompt received');
        throw new Error('提示内容不能为空');
      }

      // 在发送请求前检查内容
      if (!contents.length || !contents.some(content => content.parts?.[0]?.text?.trim())) {
        throw new Error('对话内容不能为空');
      }

      // 配置工具
      console.log('Configuring tools:', { searchEnabled, youtubeEnabled, mapEnabled });
      if (youtubeEnabled) {
        console.log('YouTube tools configuration:', youtubeTools);
      }
      const tools = [];
      if (searchEnabled) {
        tools.push({ 'google_search': {} });
      }
      if (youtubeEnabled) {
        tools.push({
          functionDeclarations: [{
            name: "search_youtube",
            description: "搜索YouTube视频内容",
            parameters: {
              type: "object",
              properties: {
                query: {
                  type: "string",
                  description: "搜索关键词"
                },
                maxResults: {
                  type: "integer",
                  description: "返回结果数量(1-50)"
                }
              },
              required: ["query"]
            }
          }]
        });
      }
      if (mapEnabled) {
        tools.push({
          functionDeclarations: [{
            name: "draw_map",
            description: "在地图上标记位置点",
            parameters: {
              type: "object",
              properties: {
                center: {
                  type: "string",
                  description: "地图中心点，格式为'纬度,经度'或地址"
                },
                zoom: {
                  type: "number",
                  description: "地图缩放级别(1-20)"
                },
                markers: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "要标记的位置列表，每个位置可以是'纬度,经度'或地址"
                }
              },
              required: ["center", "zoom"]
            }
          }]
        });
      }

      const requestBody = {
        contents,
        tools,
        generationConfig: {
          temperature: settings?.temperature || 0.7,
          topK: settings?.topK || 40,
          topP: settings?.topP || 0.95,
          maxOutputTokens: settings?.maxOutputTokens || 2048,
        }
      };

      // 使用老版本的 endpoint 和路径格式
      const response = await fetch(`${GEMINI_API_ENDPOINT}/models/gemini-2.0-flash-exp:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': env.GEMINI_API_KEY
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      
      // 处理工具调用
      let toolResults = [];
      let aiResponse = '';  // 添加变量存储 AI 响应

      if (data.candidates?.[0]?.content?.parts) {
        const parts = data.candidates[0].content.parts;
        
        for (const part of parts) {
          // 收集文本响应
          if (part.text) {
            aiResponse += part.text;
          }
          
          // 处理工具调用
          if (part.functionCall && part.functionCall.name === 'search_youtube') {
            try {
              const { query, maxResults = 5 } = part.functionCall.args;
              console.log('YouTube search query:', query);
              
              const youtubeResponse = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=${maxResults}&type=video&key=${env.GOOGLE_API_KEY}`,
                {
                  headers: {
                    'Accept': 'application/json'
                  }
                }
              );

              if (!youtubeResponse.ok) {
                const errorText = await youtubeResponse.text();
                console.error('YouTube API error response:', errorText);
                throw new Error(`YouTube API error: ${youtubeResponse.status} ${errorText}`);
              }

              const youtubeData = await youtubeResponse.json();
              console.log('YouTube API response:', youtubeData);
              
              const videos = youtubeData.items.map(item => ({
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.default.url,
                videoId: item.id.videoId,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`
              }));

              toolResults.push({
                type: 'youtube',
                data: {
                  videos,
                  totalResults: youtubeData.pageInfo.totalResults
                }
              });
            } catch (error) {
              console.error('YouTube search error:', error);
              toolResults.push({
                type: 'youtube',
                error: error.message
              });
            }
          }
        }
      }

      console.log('Final toolResults:', toolResults);  // 添加日志

      return new Response(JSON.stringify({
        success: true,
        data: {
          ...data,
          text: aiResponse  // 添加文本响应
        },
        toolResults
      }), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message || 'Unknown error'
      }), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders
        },
        status: error.status || 500
      });
    }
  }
}