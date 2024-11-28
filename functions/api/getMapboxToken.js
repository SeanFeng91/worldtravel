export async function onRequest(context) {
  console.log('API 被调用');  // 调试日志
  console.log('环境变量:', context.env.MAPBOX_ACCESS_TOKEN);  // 检查环境变量

  // 确保返回正确的 JSON 格式
  return new Response(
    JSON.stringify({
      token: context.env.MAPBOX_ACCESS_TOKEN
    }), 
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    }
  );
} 