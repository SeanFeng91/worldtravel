import { ENDPOINTS } from '../config/index.js';

export const mapTools = {
  'function_declarations': [{
    'name': 'draw_map',
    'description': 'Render a Google Maps static map using the specified parameters.',
    'parameters': {
      'type': 'OBJECT',
      'properties': {
        'center': {
          'type': 'STRING',
          'description': 'Location to center the map. It can be a lat,lng pair (e.g. 40.714728,-73.998672), or a string address of a location (e.g. Beijing,China).'
        },
        'zoom': {
          'type': 'NUMBER',
          'description': 'Google Maps zoom level. 1 is the world, 20 is zoomed in to building level. Integer only. Level 11 shows about a 15km radius.'
        },
        'markers': {
          'type': 'ARRAY',
          'items': {
            'type': 'STRING'
          },
          'description': 'List of locations to mark on the map. Each marker can include style information.'
        },
        'path': {
          'type': 'STRING',
          'description': 'Path to draw on the map, including style information and points.'
        }
      },
      'required': ['center', 'zoom']
    }
  }]
};

export async function handleMapTool(call, env) {
  try {
    let args;
    if (typeof call.functionCall.args === 'string') {
      args = JSON.parse(call.functionCall.args);
    } else if (typeof call.functionCall.args === 'object') {
      args = call.functionCall.args;
    } else {
      throw new Error('Invalid arguments format');
    }

    if (!args.center || !args.zoom) {
      throw new Error('center 和 zoom 参数是必需的');
    }

    const zoom = Math.max(0, Math.min(21, parseInt(args.zoom)));

    // 地理编码处理
    if (typeof args.center === 'string' && !args.center.includes(',')) {
      const geocodeResponse = await fetch(
        `${ENDPOINTS.MAPS}/geocode/json?address=${encodeURIComponent(args.center)}&key=${env.GOOGLE_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();
      
      if (geocodeData.status === 'OK') {
        const location = geocodeData.results[0].geometry.location;
        args.center = `${location.lat},${location.lng}`;
      } else {
        throw new Error(`Geocoding failed: ${geocodeData.status}`);
      }
    }

    // 处理标记点
    if (args.markers?.length) {
      args.markers = await Promise.all(
        args.markers.map(async (marker) => {
          if (typeof marker === 'string' && !marker.includes(',')) {
            try {
              const markerGeocodeResponse = await fetch(
                `${ENDPOINTS.MAPS}/geocode/json?address=${encodeURIComponent(marker)}&key=${env.GOOGLE_API_KEY}`
              );
              const markerGeocodeData = await markerGeocodeResponse.json();
              
              if (markerGeocodeData.status === 'OK') {
                const location = markerGeocodeData.results[0].geometry.location;
                return `${location.lat},${location.lng}`;
              }
            } catch (error) {
              console.error('Marker geocoding error:', error);
              return null;
            }
          }
          return marker;
        })
      );

      args.markers = args.markers.filter(marker => marker !== null);
    }

    return {
      type: 'map',
      center: args.center,
      zoom: zoom,
      markers: args.markers || [],
      path: args.path
    };
  } catch (error) {
    console.error('Map generation error:', error);
    throw error;
  }
} 