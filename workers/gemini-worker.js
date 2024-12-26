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
      const { prompt, model, searchEnabled, messages } = await request.json();

      // 修正消息格式
      const contents = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{
          text: msg.content || prompt
        }]
      }));

      // 如果没有历史消息，使用当前提示
      if (!contents.length) {
        contents.push({
          role: 'user',
          parts: [{
            text: prompt
          }]
        });
      }

      // 创建请求结构
      const requestBody = {
        contents,
        generationConfig: {
          temperature: 0.3,    // 控制创造性/随机性
          topK: 40,           // 控制词汇多样性
          topP: 0.95,         // 控制输出概率阈值
          maxOutputTokens: 8192 // 最大输出长度
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

      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
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