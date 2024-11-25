/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env) {
	  // 验证 API 密钥
	  const apiKey = request.headers.get('X-API-Key');
	  if (apiKey !== env.API_KEY) {  // 这里的 env.API_KEY 需要在 Worker 中也设置相同的值
		return new Response(JSON.stringify({ error: '无效的 API 密钥' }), {
		  status: 401,
		});
	  }
  
	  // 添加调试日志，记录请求方法和请求头
	  console.log('收到请求:', request.method);
	  console.log('请求头:', Object.fromEntries(request.headers));
  
	  // 处理 CORS 预检请求
	  if (request.method === 'OPTIONS') {
		return new Response(null, {
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
			'Access-Control-Max-Age': '86400',
		  },
		});
	  }
  
	  // 处理 GET 请求，从 URL 参数中获取提示词
	  if (request.method === 'GET') {
		try {
		  // 从 URL 获取 prompt 参数，这里可以接收 Vitepress 发送的 GET 请求
		  const url = new URL(request.url);
		  const userPrompt = url.searchParams.get('prompt');
		  
		  // 如果没有提供 prompt，使用默认值
		  const prompt = userPrompt ? decodeURIComponent(userPrompt) : 'spaceship';
		  
		  console.log('使用的 prompt:', prompt); // 添加日志便于调试

		  // 调用 AI 模型生成图片
		  const response = await env.AI.run(
			'@cf/stabilityai/stable-diffusion-xl-base-1.0',
			{ prompt: prompt }
		  );
	  
		  // 返回生成的图片，设置响应头为图片类型，允许跨域访问
		  return new Response(response, {
			headers: {
			  'Content-Type': 'image/png',
			  'Access-Control-Allow-Origin': '*',
			},
		  });
		} catch (error) {
		  // 错误处理，返回 JSON 格式的错误信息
		  console.error('处理请求时出错:', error);
		  return new Response(
			JSON.stringify({ error: error.message }),
			{
			  status: 500,
			  headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			  },
			}
		  );
		}
	  }
  
	  // 处理非 POST 请求，返回错误信息
	  if (request.method !== 'POST') {
		return new Response(
		  JSON.stringify({
			error: '只支持 POST 请求',
			method: request.method,
		  }),
		  {
			status: 405,
			headers: {
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			},
		  }
		);
	  }
  
	  // 处理 POST 请求
	  try {
		// 解析请求体中的 JSON 数据
		const data = await request.json();
		console.log('收到的数据:', data);
  
		// 调用 AI 模型生成图片
		const response = await env.AI.run(
		  '@cf/stabilityai/stable-diffusion-xl-base-1.0',
		  { prompt: data.prompt }
		);
  
		// 返回生成的图片，设置响应头为图片类型，允许跨域访问
		return new Response(response, {
		  headers: {
			'Content-Type': 'image/png',
			'Access-Control-Allow-Origin': '*',
		  },
		});
	  } catch (error) {
		// 错误处理，返回 JSON 格式的错误信息
		console.error('处理请求时出错:', error);
		return new Response(
		  JSON.stringify({
			error: error.message,
			stack: error.stack,
		  }),
		  {
			status: 500,
			headers: {
			  'Content-Type': 'application/json',
			  'Access-Control-Allow-Origin': '*',
			},
		  }
		);
	  }
	}
  };