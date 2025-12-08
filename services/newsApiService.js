import axios from "axios";
import Constants from "expo-constants";

/**
 * News Service
 * Supports two providers:
 * - NewsAPI (https://newsapi.org)
 * - Currents API (https://currentsapi.services)
 *
 * Configuration via environment variables:
 * - EXPO_PUBLIC_NEWSAPI_KEY or NEWSAPI_KEY
 * - EXPO_PUBLIC_CURRENTS_KEY or CURRENTS_API_KEY
 */

// Read keys from environment (Expo supports EXPO_PUBLIC_* vars)
const NEWSAPI_KEY =
  process.env.EXPO_PUBLIC_NEWSAPI_KEY || process.env.NEWSAPI_KEY || (Constants.manifest?.extra?.NEWSAPI_KEY) || "YOUR_API_KEY_HERE";
const CURRENTS_KEY =
  process.env.EXPO_PUBLIC_CURRENTS_KEY || process.env.CURRENTS_API_KEY || (Constants.manifest?.extra?.CURRENTS_KEY) || null;

const NEWSAPI_BASE = "https://newsapi.org/v2";
const CURRENTS_BASE = "https://api.currentsapi.services/v1";

const newsApiClient = axios.create({
  baseURL: NEWSAPI_BASE,
  timeout: 10000,
  params: {
    apiKey: NEWSAPI_KEY,
  },
});

const currentsClient = axios.create({
  baseURL: CURRENTS_BASE,
  timeout: 10000,
});

/**
 * Get top headlines dengan optional filters
 * @param {Object} params - Filter parameters
 * @param {string} params.country - ISO 3166-1 alpha-2 country code (e.g., 'id' untuk Indonesia)
 * @param {string} params.category - Category filter (business, entertainment, general, health, science, sports, technology)
 * @param {string} params.q - Search query
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.pageSize - Articles per page (default: 20, max: 100)
 * @returns {Promise} Articles data
 */
export const getTopHeadlines = async (params = {}) => {
  // If Currents API key is present, prefer Currents
  if (CURRENTS_KEY) {
    try {
      const resp = await currentsClient.get("/latest-news", {
        params: {
          apiKey: CURRENTS_KEY,
          category: params.category || undefined,
          language: params.language || "id",
          page_size: params.pageSize || 20,
          page_number: params.page || 1,
        },
      });

      return {
        success: true,
        data: resp.data.news || resp.data,
      };
    } catch (error) {
      console.error("Currents: Error fetching latest news:", error?.response?.data || error.message);
      // Fallthrough to NewsAPI if available
    }
  }

  // Fallback to NewsAPI
  try {
    const response = await newsApiClient.get("/top-headlines", {
      params: {
        country: params.country || "id",
        category: params.category || undefined,
        q: params.q || undefined,
        page: params.page || 1,
        pageSize: params.pageSize || 20,
      },
    });

    return {
      success: true,
      data: response.data.articles,
      totalResults: response.data.totalResults,
      status: response.data.status,
    };
  } catch (error) {
    console.error("NewsAPI: Error fetching headlines:", error?.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      data: [],
    };
  }
};

/**
 * Search everything
 * @param {Object} params - Search parameters
 * @param {string} params.q - Search query (required)
 * @param {string} params.language - Language code (e.g., 'id', 'en')
 * @param {string} params.sortBy - Sort by (publishedAt, relevancy, popularity)
 * @param {number} params.page - Page number
 * @param {number} params.pageSize - Articles per page
 * @returns {Promise} Articles data
 */
export const searchEverything = async (params = {}) => {
  if (!params.q) {
    return {
      success: false,
      error: "Search query (q) is required",
      data: [],
    };
  }

  // If Currents configured, use its search endpoint
  if (CURRENTS_KEY) {
    try {
      const resp = await currentsClient.get("/search", {
        params: {
          apiKey: CURRENTS_KEY,
          keywords: params.q,
          language: params.language || "id",
          page_number: params.page || 1,
          page_size: params.pageSize || 20,
        },
      });

      return {
        success: true,
        data: resp.data.news || resp.data,
      };
    } catch (err) {
      console.error("Currents: Error searching articles:", err?.response?.data || err.message);
      // Fall through to NewsAPI
    }
  }

  try {
    const response = await newsApiClient.get("/everything", {
      params: {
        q: params.q,
        language: params.language || "id",
        sortBy: params.sortBy || "publishedAt",
        page: params.page || 1,
        pageSize: params.pageSize || 20,
      },
    });

    return {
      success: true,
      data: response.data.articles,
      totalResults: response.data.totalResults,
      status: response.data.status,
    };
  } catch (error) {
    console.error("NewsAPI: Error searching articles:", error?.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
      data: [],
    };
  }
};

/**
 * Get news by category
 * @param {string} category - Category (business, entertainment, general, health, science, sports, technology)
 * @param {number} pageSize - Articles per page (default: 20)
 * @returns {Promise} Articles data
 */
export const getNewsByCategory = async (category = "general", pageSize = 20) => {
  return getTopHeadlines({
    category,
    pageSize,
  });
};

/**
 * Format article data untuk aplikasi
 * @param {Array} articles - Raw articles dari API
 * @returns {Array} Formatted articles
 */
export const formatArticles = (articles = []) => {
  return articles.map((article, index) => {
    // Support both NewsAPI and Currents API article shapes
    const title = article.title || article.title;
    const description = article.description || article.summary || "Tidak ada deskripsi";
    const content = article.content || article.description || article.summary || "Konten tidak tersedia";
    const publishedAt = article.publishedAt || article.published || article.published_at || article.publishedDate || null;
    const imageUrl = article.urlToImage || article.image || article.media || "https://via.placeholder.com/500x280?text=No+Image";
    const sourceName = (article.source && article.source.name) || article.source || article.source_id || article.author || "Unknown";

    return {
      id: article.id || index + 1,
      title,
      description,
      content,
      category: extractCategory(sourceName),
      date: formatDate(publishedAt),
      imageUrl,
      source: sourceName,
      url: article.url || article.link,
      author: article.author || "Unknown",
      publishedAt: publishedAt,
    };
  });
};

/**
 * Extract category dari source name
 * @param {string} source - Source name
 * @returns {string} Category
 */
const extractCategory = (source = "") => {
  const categories = [
    "Teknologi",
    "Bisnis",
    "Gadget",
    "Lingkungan",
    "Startup",
    "Kesehatan",
    "Hiburan",
    "Ekonomi",
  ];

  for (let category of categories) {
    if (source?.toLowerCase().includes(category.toLowerCase())) {
      return category;
    }
  }

  return "Umum"; // Default category
};

/**
 * Format date untuk display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit yang lalu`;
  if (diffHours < 24) return `${diffHours} jam yang lalu`;
  if (diffDays < 7) return `${diffDays} hari yang lalu`;

  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Check if API key is configured
 * @returns {boolean} True if API key is configured
 */
export const isApiKeyConfigured = () => {
  return (NEWSAPI_KEY && NEWSAPI_KEY !== "YOUR_API_KEY_HERE") || Boolean(CURRENTS_KEY);
};

/**
 * Get API configuration status
 * @returns {Object} Status info
 */
export const getApiStatus = () => {
  return {
    configured: isApiKeyConfigured(),
    providers: {
      newsapi: NEWSAPI_KEY && NEWSAPI_KEY !== "YOUR_API_KEY_HERE",
      currents: Boolean(CURRENTS_KEY),
    },
    message: isApiKeyConfigured()
      ? "API key configured"
      : "⚠️ API key not configured - using mock data",
  };
};

export default {
  getTopHeadlines,
  searchEverything,
  getNewsByCategory,
  formatArticles,
  isApiKeyConfigured,
  getApiStatus,
};
