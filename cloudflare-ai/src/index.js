/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };

export default {
	async fetch(request, env) {
		// 处理 CORS 预检请求
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		try {
			// 确保请求方法是 POST
			if (request.method !== 'POST') {
				throw new Error('只支持 POST 请求');
			}

			// 检查请求体是否为空
			const text = await request.text();
			if (!text) {
				throw new Error('请求体不能为空');
			}

			// 尝试解析 JSON
			let data;
			try {
				data = JSON.parse(text);
			} catch (e) {
				throw new Error('无效的 JSON 格式: ' + e.message);
			}

			// 验证 prompt 参数
			if (!data.prompt) {
				throw new Error('缺少 prompt 参数');
			}

			const inputs = {
				prompt: data.prompt,
			};

			const response = await env.AI.run(
				'@cf/stabilityai/stable-diffusion-xl-base-1.0',
				inputs,
			);

			return new Response(response, {
				headers: {
					'content-type': 'image/png',
					'Access-Control-Allow-Origin': '*',
				},
			});
		} catch (error) {
			console.error('Error:', error);
			return new Response(
				JSON.stringify({ 
					error: error.message,
					stack: error.stack // 开发时可以添加，生产环境建议移除
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
	},
};
  