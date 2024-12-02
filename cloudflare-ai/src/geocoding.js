import { OPENSTREETMAP_API } from './config.js';

export async function getCoordinates(placeName) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `${OPENSTREETMAP_API.GEOCODING_URL}?q=${encodeURIComponent(placeName)}&format=json&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('地理编码请求失败');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      throw new Error(`未找到地点: ${placeName}`);
    }
    
    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    };
  } catch (error) {
    console.error('地理编码错误:', error);
    throw error;
  }
}

export async function getRoute(points) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const coordinates = points.map(p => `${p.lon},${p.lat}`).join(';');
    const response = await fetch(
      `${OPENSTREETMAP_API.ROUTING_URL}/${coordinates}?overview=full&geometries=geojson`
    );
    
    if (!response.ok) {
      throw new Error('路线规划请求失败');
    }
    
    const data = await response.json();
    return data.routes[0].geometry;
  } catch (error) {
    console.error('路线规划错误:', error);
    throw error;
  }
} 