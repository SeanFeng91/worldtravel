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
      const { prompt, model, searchEnabled, messages, settings } = await request.json();

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
          text: msg.content || prompt
        }]
      }));

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
          ...validatedSettings,  // 使用验证后的设置
          stopSequences: [],
          candidateCount: 1,
        }
      };

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

      // 检查响应格式并确保完整性
      if (!data.candidates?.[0]?.content?.parts) {
        throw new Error('Invalid response format');
      }

      // 添加设置信息到响应中
      const responseData = {
        success: true,
        data: data,
        usedSettings: validatedSettings,  // 返回实际使用的设置
        tokenUsage: data.usageMetadata    // 返回 token 使用情况
      };

      return new Response(JSON.stringify(responseData), {
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