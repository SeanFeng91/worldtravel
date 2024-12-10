const BASE_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes'
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

export async function calculateRoute(origin, destination, waypoints = []) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      },
      body: JSON.stringify({
        origin: {
          location: {
            latLng: {
              latitude: origin.lat,
              longitude: origin.lng
            }
          }
        },
        destination: {
          location: {
            latLng: {
              latitude: destination.lat,
              longitude: destination.lng
            }
          }
        },
        intermediates: waypoints.map(point => ({
          location: {
            latLng: {
              latitude: point.lat,
              longitude: point.lng
            }
          }
        })),
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        languageCode: "zh-CN"
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`路线计算失败: ${errorData.error?.message || '未知错误'}`)
    }

    return await response.json()
  } catch (error) {
    console.error('路线计算错误:', error)
    throw error
  }
}

export async function geocodeAddress(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}&language=zh-CN`
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`地址解析失败: ${errorData.error?.message || '未知错误'}`)
    }

    const data = await response.json()
    if (data.status !== 'OK') {
      throw new Error(`地址解析失败: ${data.status}`)
    }

    return data.results[0].geometry.location
  } catch (error) {
    console.error('地址解析错误:', error)
    throw error
  }
}