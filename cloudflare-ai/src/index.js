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
	  // 添加调试日志
	  console.log('收到请求:', request.method);
	  console.log('请求头:', Object.fromEntries(request.headers));
  
	  // 处理 CORS 预检请求
	  if (request.method === 'OPTIONS') {
		return new Response(null, {
		  headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
		  },
		});
	  }
  
	  // 修改这部分，同时支持 GET 和 POST
	  if (request.method === 'GET') {
		try {
		  // 从 URL 获取 prompt 参数
		  const url = new URL(request.url);
		  const userPrompt = url.searchParams.get('prompt');
		  
		  // 如果没有提供 prompt，使用默认值
		  const prompt = userPrompt ? decodeURIComponent(userPrompt) : 'spaceship';
		  
		  console.log('使用的 prompt:', prompt); // 添加日志便于调试

		  const response = await env.AI.run(
			'@cf/stabilityai/stable-diffusion-xl-base-1.0',
			{ prompt: prompt }
		  );
	  
		  return new Response(response, {
			headers: {
			  'Content-Type': 'image/png',
			  'Access-Control-Allow-Origin': '*',
			},
		  });
		} catch (error) {
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
  
	  // POST 请求处理保持不变
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
  
	  try {
		const data = await request.json();
		console.log('收到的数据:', data);
  
		const response = await env.AI.run(
		  '@cf/stabilityai/stable-diffusion-xl-base-1.0',
		  { prompt: data.prompt }
		);
  
		return new Response(response, {
		  headers: {
			'Content-Type': 'image/png',
			'Access-Control-Allow-Origin': '*',
		  },
		});
	  } catch (error) {
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