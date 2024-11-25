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
	  const url = new URL(request.url);
	  const path = url.pathname;
  
	  // 通用的 CORS 头
	  const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
	  };
  
	  // 添加调试日志
	  console.log('收到请求:', {
		method: request.method,
		path: path,
		headers: Object.fromEntries(request.headers)
	  });
  
	  // 处理 CORS 预检请求
	  if (request.method === 'OPTIONS') {
		return new Response(null, {
		  headers: corsHeaders,
		});
	  }
  
	  // API 密钥验证
	  const apiKey = request.headers.get('X-API-Key');
	  if (apiKey !== env.API_KEY) {
		return new Response(JSON.stringify({ error: '无效的 API 密钥' }), {
		  status: 401,
		  headers: {
			...corsHeaders,
			'Content-Type': 'application/json',
		  },
		});
	  }
  
	  try {
		// 聊天功能
		if (path === '/ai/chat') {
		  if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: '聊天功能只支持 POST 请求' }), {
			  status: 405,
			  headers: {
				...corsHeaders,
				'Content-Type': 'application/json'
			  }
			});
		  }
  
		  const { messages } = await request.json();
		  const stream = await env.AI.run('@cf/meta/llama-3.1-70b-instruct', {
			messages,
			stream: true,
		  });
  
		  return new Response(stream, {
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'text/event-stream',
			},
		  });
		} 
		// 图片生成功能
		else if (path === '/ai/image') {
		  if (request.method !== 'GET') {
			return new Response(JSON.stringify({ error: '图片生成只支持 GET 请求' }), {
			  status: 405,
			  headers: {
				...corsHeaders,
				'Content-Type': 'application/json'
			  }
			});
		  }
  
		  const userPrompt = url.searchParams.get('prompt');
		  const prompt = userPrompt ? decodeURIComponent(userPrompt) : 'spaceship';
		  
		  const response = await env.AI.run(
			'@cf/stabilityai/stable-diffusion-xl-base-1.0',
			{ prompt }
		  );
	  
		  return new Response(response, {
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'image/png',
			},
		  });
		} 
		// 未知路径
		else {
		  return new Response(JSON.stringify({ error: '未找到该路径', path }), {
			status: 404,
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'application/json'
			}
		  });
		}
	  } catch (error) {
		console.error('处理请求时出错:', error);
		return new Response(JSON.stringify({ 
		  error: error.message,
		  details: error.stack
		}), {
		  status: 500,
		  headers: {
			...corsHeaders,
			'Content-Type': 'application/json'
		  }
		});
	  }
	}
  };