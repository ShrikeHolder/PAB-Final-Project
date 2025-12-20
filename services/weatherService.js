// services/weatherService.js - VERSION TANPA GAMBAR
const API_KEY = "87bc1f3a8b32529cd12be0cb45f02f47";

// Base URL untuk API
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
export const getWeatherEmoji = (condition) => {
  const emojis = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
    Drizzle: "🌦️",
    Mist: "🌫️",
    Fog: "🌫️",
    Smoke: "💨",
    Haze: "😶‍🌫️",
    Dust: "💨",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "💨",
    Tornado: "🌪️",
  };
  return emojis[condition] || "🌡️";
};

/**
 * Get background color based on weather
 * @param {string} condition - Weather condition
 * @returns {string} Hex color
 */
export const getWeatherColor = (condition) => {
  const colors = {
    Clear: ["#87CEEB", "#E0F7FA"], // Sky blue gradient
    Clouds: ["#B0C4DE", "#ECEFF1"], // Light gray gradient
    Rain: ["#4682B4", "#B3E5FC"], // Blue gradient
    Snow: ["#F0F8FF", "#E3F2FD"], // White-blue gradient
    Thunderstorm: ["#2F4F4F", "#546E7A"], // Dark gray gradient
    Drizzle: ["#5F9EA0", "#80DEEA"], // Cyan gradient
    Mist: ["#CFD8DC", "#ECEFF1"], // Light gray gradient
  };
  
  return colors[condition] || ["#1a73e8", "#64B5F6"]; // Default blue gradient
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
    return data.list || [];
    
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

export default {
  getCurrentWeather,
  getWeatherIcon,
  getWeatherEmoji,
  getWeatherColor,
  getWeatherForecast,
  searchCities,
};