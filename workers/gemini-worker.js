const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1alpha'

// 修改地图工具定义为官方格式
const mapTools = {
  'function_declarations': [{
    'name': 'draw_map',
    'description': 'Render a Google Maps static map using the specified parameters.',
    'parameters': {
      'type': 'OBJECT',
      'properties': {
        'center': {
          'type': 'STRING',
          'description': 'Location to center the map. It can be a lat,lng pair (e.g. 40.714728,-73.998672), or a string address of a location (e.g. Beijing,China).'
        },
        'zoom': {
          'type': 'NUMBER',
          'description': 'Google Maps zoom level. 1 is the world, 20 is zoomed in to building level. Integer only. Level 11 shows about a 15km radius.'
        },
        'markers': {
          'type': 'ARRAY',
          'items': {
            'type': 'STRING'
          },
          'description': 'List of locations to mark on the map. Each marker can include style information.'
        },
        'path': {
          'type': 'STRING',
          'description': 'Path to draw on the map, including style information and points.'
        }
      },
      'required': ['center', 'zoom']
    }
  }]
};

// 处理工具调用的异步函数
async function handleToolCalls(toolCalls, env) {
  const results = [];
  
  for (const call of toolCalls) {
    if (call.functionCall?.name === 'draw_map') {
      try {
        // 直接使用 args，不需要 JSON.parse
        const args = call.functionCall.args;
        console.log('Map function args:', args);
        
        // 验证必要参数
        if (!args.center || !args.zoom) {
          throw new Error('center 和 zoom 参数是必需的');
        }

        // 验证并规范化缩放级别
        const zoom = Math.max(0, Math.min(21, parseInt(args.zoom)));

        // 构建基础参数
        const params = new URLSearchParams({
          key: env.MAPS_API_KEY,
          center: args.center,
          zoom: zoom,
          size: '512x512',
          scale: 2,
          language: 'zh-CN'
        });

        // 处理标记
        if (args.markers?.length) {
          args.markers.forEach(marker => {
            params.append('markers', `color:red|size:mid|${marker}`);
          });
        }

        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
        console.log('Generated map URL:', mapUrl);

        results.push({
          type: 'map',
          url: mapUrl,
          center: args.center,
          zoom: zoom,
          markers: args.markers || []
        });
      } catch (error) {
        console.error('Map generation error:', error);
        throw error;
      }
    }
  }
  
  return results;
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    try {
      const { prompt, model, searchEnabled, mapEnabled, messages, settings } = await request.json();

      // 验证和规范化设置参数
      const validatedSettings = {
        temperature: Math.max(0, Math.min(1, settings?.temperature ?? 0.3)),
        topK: Math.max(1, Math.min(40, settings?.topK ?? 40)),
        topP: Math.max(0, Math.min(1, settings?.topP ?? 0.95)),
        maxOutputTokens: Math.max(1000, Math.min(8192, settings?.maxOutputTokens ?? 8192))
      };

      console.log('Using AI settings:', validatedSettings);

      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{
          text: msg.content
        }]
      }));

      // 添加系统提示来平衡地图功能和详细回答
      if (mapEnabled) {
        contents.unshift({
          role: 'user',
          parts: [{
            text: `你有地图工具可以使用。在提供详细建议和信息的同时，可以在需要展示位置时使用 draw_map 函数。请确保回答全面且详细，不要仅仅因为有地图功能就简化回答。`
          }]
        });
      }

      if (!contents.length) {
        contents.push({
          role: 'user',
          parts: [{
            text: prompt
          }]
        });
      }

      const requestBody = {
        contents,
        generationConfig: {
          ...validatedSettings,
          stopSequences: [],
          candidateCount: 1,
        }
      };

      // 添加工具
      if (mapEnabled || searchEnabled) {
        requestBody.tools = [];
        
        if (searchEnabled) {
          requestBody.tools.push({
            'google_search': {}
          });
        }
        
        if (mapEnabled) {
          requestBody.tools.push(mapTools);
        }
      }

      console.log('Request to Gemini:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${GEMINI_API_ENDPOINT}/models/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GOOGLE_API_KEY
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('Gemini Response:', JSON.stringify(data, null, 2));

      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }

      // 检查并提取文本内容
      const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!textContent && !data.candidates?.[0]?.content?.parts) {
        throw new Error('No text content in response');
      }

      // 构建响应数据
      const responseData = {
        success: true,
        data: {
          candidates: [{
            content: {
              parts: data.candidates[0].content.parts
            }
          }]
        },
        usedSettings: validatedSettings,
        tokenUsage: data.usageMetadata
      };

      // 检查工具调用
      if (data.candidates?.[0]?.content?.parts) {
        console.log('Checking for tool calls in parts:', data.candidates[0].content.parts);
        
        const toolCalls = data.candidates[0].content.parts
          .filter(part => part.functionCall)
          .map(part => ({
            functionCall: {
              name: part.functionCall.name,
              args: part.functionCall.args
            }
          }));

        console.log('Found tool calls:', toolCalls);

        if (toolCalls.length > 0) {
          console.log('Processing tool calls...');
          const toolResults = await handleToolCalls(toolCalls, env);
          if (toolResults.length > 0) {
            console.log('Tool results:', toolResults);
            responseData.toolResults = toolResults;
          }
        }
      }

      console.log('Final response:', responseData);

      return new Response(JSON.stringify(responseData), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      return new Response(JSON.stringify({
        success: false,
        error: error.message
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
}