import { ENDPOINTS } from '../config/index.js';

export const youtubeTools = {
  'function_declarations': [{
    'name': 'search_youtube',
    'description': '搜索YouTube视频并返回相关结果，可用于查找教程、旅游视频等',
    'parameters': {
      'type': 'OBJECT',
      'properties': {
        'query': {
          'type': 'STRING',
          'description': '搜索关键词'
        },
        'maxResults': {
          'type': 'INTEGER',
          'description': '返回结果数量(1-5)',
          'minimum': 1,
          'maximum': 5
        }
      },
      'required': ['query']
    }
  }]
};

export async function handleYouTubeTool(call, env) {
  try {
    let args;
    if (typeof call.functionCall.args === 'string') {
      args = JSON.parse(call.functionCall.args);
    } else {
      args = call.functionCall.args;
    }

    const { query, maxResults = 3 } = args;

    const params = new URLSearchParams({
      part: 'snippet',
      q: query,
      maxResults: Math.min(Math.max(1, maxResults), 5),
      type: 'video',
      key: env.GOOGLE_API_KEY
    });

    const response = await fetch(
      `${ENDPOINTS.YOUTUBE}/search?${params.toString()}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`YouTube API Error: ${errorText}`);
    }

    const data = await response.json();
    
    return {
      type: 'youtube_results',
      kind: data.kind,
      etag: data.etag,
      nextPageToken: data.nextPageToken,
      regionCode: data.regionCode,
      pageInfo: data.pageInfo,
      results: data.items.map(item => ({
        kind: item.kind,
        etag: item.etag,
        id: item.id,
        snippet: item.snippet,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      }))
    };
  } catch (error) {
    console.error('YouTube search error:', error);
    throw error;
  }
} 