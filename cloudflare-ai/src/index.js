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
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Accept, Cache-Control, Connection, cache-control, Cache-Control, Content-Type, X-Requested-With',
		'Access-Control-Expose-Headers': 'Content-Length, Content-Type, X-Content-Type-Options',
		'Access-Control-Max-Age': '86400',
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
		  status: 204,
		  headers: {
			...corsHeaders,
			'Access-Control-Allow-Origin': request.headers.get('Origin') || '*',
		  }
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
		// 通用聊天功能
		if (path === '/ai/chat') {
		  const { messages } = await request.json();
		  
		  // 添加明确的中文指令
		  const systemMessage = {
			role: 'system',
			content: '你是一个友好的中文助手。请始终使用简体中文回复，保持清晰的格式和结构。避免使用其他语言。'
		  };
		  
		  const messageHistory = [
			systemMessage,
			...messages
		  ];

		  const stream = await env.AI.run('@cf/meta/llama-3.1-70b-instruct', {
			messages: messageHistory,
			stream: true,
			max_tokens: 1000,
			temperature: 0.7,
		  });

		  return new Response(stream, {
			headers: {
			  ...corsHeaders,
			  'Content-Type': 'text/event-stream',
			},
		  });
		}
		
		// 旅行规划对话
		else if (path === '/ai/travel-chat') {
		  try {
			const { messages } = await request.json();
			
			const systemMessage = {
			  role: 'system',
			  content: `你是个专业的旅行规划助手。请按照以下规则处理用户请求：

1. 分析用户的旅行需求，包括目的地、时间、预算等
2. 生成合理的旅行路线，包含具体地点和时间安排
3. 所有回复必须使用中文
4. 回复必须严格按照以下格式：

行程总览: [简要描述整体行程]

第1天:
上午: [地点名称]（09:00-12:00）
- 描述: [具体活动]
- 交通: [如何到达]
- 费用: [预计费用]

中午: [地点名称]（12:00-14:00）
...

第2天:
...

总预算估算: [预算范围]

旅行建议:
- [建议1]
- [建议2]
...`
			};

			const messageHistory = [
			  systemMessage,
			  ...messages
			];

			const stream = await env.AI.run('@cf/meta/llama-3.1-70b-instruct', {
			  messages: messageHistory,
			  stream: true,
			  max_tokens: 2000,
			  temperature: 0.7,
			});

			// 返回流式响应
			return new Response(stream, {
			  headers: {
				...corsHeaders,
				'Content-Type': 'text/event-stream',
				'Cache-Control': 'no-cache',
				'Connection': 'keep-alive'
			  }
			});

		  } catch (error) {
			console.error('处理旅行聊天请求时出错:', error);
			return new Response(JSON.stringify({ 
			  error: '处理请求失败',
			  message: error.message,
			  stack: error.stack
			}), {
			  status: 500,
			  headers: {
				...corsHeaders,
				'Content-Type': 'application/json'
			  }
			});
		  }
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

		// 旅行计划管理相的路由
		else if (path === '/ai/travel-plans' && request.method === 'GET') {
		  if (!env.TRAVEL_PLANS) {
			return new Response(JSON.stringify({ error: '未配置 KV 存储' }), {
			  status: 400,
			  headers: { 'Content-Type': 'application/json' }
			});
		  }

		  const plansIndex = await env.TRAVEL_PLANS.get('plans_index');
		  return new Response(plansIndex || '[]', {
			headers: { 'Content-Type': 'application/json' }
		  });
		}
		else if (path.startsWith('/ai/travel-plans/') && request.method === 'GET') {
		  // ... 获取特定旅行计划详情的代码 ...
		}
		else if (path.startsWith('/ai/travel-plans/') && request.method === 'DELETE') {
		  // ... 删除旅行计划的代码 ...
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
		  stack: error.stack
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