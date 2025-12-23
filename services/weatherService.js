const API_KEY = "87bc1f3a8b32529cd12be0cb45f02f47";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Get current weather for a city
 * @param {string} city - City name (e.g., "Jakarta")
 * @returns {Promise<Object|null>} Weather data or null if error
 */
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=id`
    );
    
    if (!response.ok) {
      console.error(`API Error: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Validasi data
    if (data.cod !== 200) {
      console.error("Weather API Error:", data.message);
      return null;
    }
    
    return {
      ...data,
      formatted: {
        temp: `${Math.round(data.main.temp)}°C`,
        feelsLike: `${Math.round(data.main.feels_like)}°C`,
        humidity: `${data.main.humidity}%`,
        pressure: `${data.main.pressure} hPa`,
        windSpeed: `${data.wind.speed.toFixed(1)} m/s`,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        city: `${data.name}, ${data.sys.country}`,
        time: new Date().toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }
    };
    
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

/**
 * Get weather forecast for 5 days
 * @param {string} city - City name
 * @returns {Promise<Array|null>} Forecast data or null
 */
export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=id&cnt=5`
    );
    
    if (!response.ok) {
      console.error(`Forecast API Error: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    // Format forecast data for UI
    if (data.list && data.list.length > 0) {
      const forecastDays = [];
      const daysMap = {};
      
      data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString('id-ID', { weekday: 'short' });
        
        if (!daysMap[dayKey]) {
          daysMap[dayKey] = {
            day: dayKey,
            temp: Math.round(item.main.temp),
            icon: item.weather[0].icon,
            desc: item.weather[0].description,
            date: date.toLocaleDateString('id-ID', { 
              day: 'numeric',
              month: 'short'
            })
          };
        }
      });
      
      return Object.values(daysMap).slice(0, 5);
    }
    
    return [];
    
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
};

/**
 * Search for cities by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} List of matching cities
 */
export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/find?q=${encodeURIComponent(query)}&appid=${API_KEY}&type=like&sort=population&cnt=5`
    );
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.list || [];
    
  } catch (error) {
    console.error("Error searching cities:", error);
    return [];
  }
};

/**
 * Get weather icon URL from OpenWeatherMap
 * @param {string} iconCode - Icon code from API
 * @returns {string} Icon URL
 */
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Get emoji for weather condition
 * @param {string} condition - Weather condition
 * @returns {string} Emoji
 */
export const getWeatherEmoji = (mainCondition) => {
  const emojis = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "😶‍🌫️",
  };
  return emojis[mainCondition] || "🌡️";
};

export default {
  getCurrentWeather,
  getWeatherForecast,
  searchCities,
  getWeatherIcon,
  getWeatherEmoji,
};