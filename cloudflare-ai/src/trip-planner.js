export function parseTravelPlan(aiResponse) {
  const plan = {
    overview: '',
    days: [],
    locations: []
  };

  try {
    // 提取行程总览
    const overviewMatch = aiResponse.match(/行程总览[:：]\s*([^\n]+)/);
    if (overviewMatch) {
      plan.overview = overviewMatch[1].trim();
    }

    // 提取每天行程
    const dayRegex = /第(\d+)天[：:]([\s\S]*?)(?=第\d+天|$)/g;
    let dayMatch;
    
    while ((dayMatch = dayRegex.exec(aiResponse)) !== null) {
      const dayNumber = parseInt(dayMatch[1]);
      const dayContent = dayMatch[2];
      
      // 提取地点和时间
      const locations = [];
      const locationRegex = /([上中下午晚]午|早上|凌晨)[：:]\s*(.+?)\s*[（(](\d{1,2}:\d{2})[-~到至](\d{1,2}:\d{2})[）)]/g;
      
      let locationMatch;
      while ((locationMatch = locationRegex.exec(dayContent)) !== null) {
        const location = {
          period: locationMatch[1],
          name: locationMatch[2].trim(),
          startTime: locationMatch[3],
          endTime: locationMatch[4],
          day: dayNumber
        };
        
        locations.push(location);
        plan.locations.push(location);
      }
      
      plan.days.push({
        day: dayNumber,
        locations: locations
      });
    }
    
    return plan;
  } catch (error) {
    console.error('解析旅行计划失败:', error);
    throw error;
  }
}

export function convertToGeoJSON(locations, route) {
  return {
    type: 'FeatureCollection',
    features: [
      // 地点标记
      ...locations.map((loc, index) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [loc.lon, loc.lat]
        },
        properties: {
          name: loc.name,
          day: loc.day,
          startTime: loc.startTime,
          endTime: loc.endTime,
          order: index + 1
        }
      })),
      // 路线
      {
        type: 'Feature',
        geometry: route,
        properties: {
          type: 'route'
        }
      }
    ]
  };
} 