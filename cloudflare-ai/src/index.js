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
		// 处理聊天请求
		if (path === '/ai/chat' && request.method === 'POST') {
		  const { messages } = await request.json();
		  console.log('收到的消息:', messages); // 调试日志
  
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
		// 处理图片生成请求
		else if (path === '/ai/image' && request.method === 'GET') {
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
		// 处理未知路径或方法
		else {
		  return new Response(
			JSON.stringify({ 
			  error: '无效的请求方法或路径',
			  path: path,
			  method: request.method
			}), 
			{
			  status: 405,
			  headers: {
				...corsHeaders,
				'Content-Type': 'application/json'
			  }
			}
		  );
		}
	  } catch (error) {
		console.error('处理请求时出错:', error);
		return new Response(
		  JSON.stringify({ error: error.message }), 
		  {
			status: 500,
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'application/json'
			}
		  }
		);
	  }
	}
  };