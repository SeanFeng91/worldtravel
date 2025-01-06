export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  "Access-Control-Max-Age": "86400"

}

export function handleOptions() {
  return new Response(null, {
    headers: corsHeaders
  })
} 