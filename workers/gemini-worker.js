const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1alpha'

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
      const { prompt, model, searchEnabled } = await request.json();

      // 创建请求结构
      const requestBody = {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      // 如果启用搜索，使用官方的搜索工具配置
      if (searchEnabled) {
        requestBody.tools = [{
          'google_search': {}
        }];
      }

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(`${GEMINI_API_ENDPOINT}/models/${model}:generateContent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": env.GOOGLE_API_KEY
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      // 检查是否有错误
      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }

      // 检查响应格式
      if (!data.candidates?.[0]?.content?.parts) {
        throw new Error('Invalid response format');
      }

      return new Response(JSON.stringify({
        success: true,
        data: data
      }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (error) {
      console.error('Error:', error);
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