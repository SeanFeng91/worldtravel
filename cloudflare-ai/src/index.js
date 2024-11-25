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
	  // 获取请求路径
	  const url = new URL(request.url);
	  const path = url.pathname;
  
	  // 通用的 CORS 头
	  const corsHeaders = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
		'Access-Control-Max-Age': '86400',
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
  
	  // 根据路径处理不同请求
	  try {
		if (path === '/ai/chat') {
		  // 处理聊天请求
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
		} else {
		  // 处理图片生成请求（原有功能）
		  const userPrompt = url.searchParams.get('prompt');
		  const prompt = userPrompt ? decodeURIComponent(userPrompt) : 'spaceship';
		  
		  console.log('使用的 prompt:', prompt);
  
		  const response = await env.AI.run(
			'@cf/stabilityai/stable-diffusion-xl-base-1.0',
			{ prompt: prompt }
		  );
	  
		  // 返回生成的图片，添加 CORS 头
		  return new Response(response, {
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'image/png',
			},
		  });
		}
	  } catch (error) {
		console.error('处理请求时出错:', error);
		return new Response(
		  JSON.stringify({ error: error.message }),
		  {
			status: 500,
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'application/json',
			},
		  }
		);
	  }
	}
  };