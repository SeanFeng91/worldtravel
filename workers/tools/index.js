import { mapTools, handleMapTool } from './map-tool.js';
import { youtubeTools, handleYouTubeTool } from './youtube-tool.js';

export const tools = {
  map: mapTools,
  youtube: youtubeTools
};

export async function handleToolCalls(toolCalls, env) {
  const results = [];
  
  for (const call of toolCalls) {
    try {
      switch(call.functionCall?.name) {
        case 'draw_map':
          results.push(await handleMapTool(call, env));
          break;
        case 'search_youtube':
          results.push(await handleYouTubeTool(call, env));
          break;
        default:
          console.warn(`Unknown tool called: ${call.functionCall?.name}`);
      }
    } catch (error) {
      console.error(`Error handling tool ${call.functionCall?.name}:`, error);
      results.push({
        type: 'error',
        tool: call.functionCall?.name,
        error: error.message
      });
    }
  }
  
  return results;
}