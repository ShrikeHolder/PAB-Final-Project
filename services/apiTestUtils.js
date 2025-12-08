/**
 * API Testing & Development Utilities
 * Gunakan file ini untuk test API integration
 */

import * as newsApiService from "../services/newsApiService";
import { newsArticles } from "../data/newsData";

/**
 * Test API Configuration
 */
export const testApiConfiguration = () => {
  const status = newsApiService.getApiStatus();
  console.log("=== API Configuration Status ===");
  console.log("Configured:", status.configured);
  console.log("Base URL:", status.baseUrl);
  console.log("API Key:", status.apiKey);
  console.log("Message:", status.message);
  console.log("================================\n");

  return status;
};

/**
 * Test Top Headlines Fetch
 */
export const testTopHeadlines = async () => {
  console.log("=== Testing Top Headlines ===");
  console.log("Fetching top headlines...\n");

  try {
    const result = await newsApiService.getTopHeadlines({
      pageSize: 5, // Limit untuk testing
    });

    if (result.success) {
      console.log("✅ Success!");
      console.log("Articles fetched:", result.data.length);
      console.log("Total available:", result.totalResults);

      const formatted = newsApiService.formatArticles(result.data);
      console.log("\nFormatted article sample:");
      console.log(JSON.stringify(formatted[0], null, 2));
    } else {
      console.log("❌ Error:", result.error);
      console.log("Using mock data fallback\n");
    }

    console.log("============================\n");
    return result;
  } catch (error) {
    console.error("❌ Exception:", error.message);
    console.log("============================\n");
    throw error;
  }
};

/**
 * Test Category Search
 */
export const testCategorySearch = async (category = "technology") => {
  console.log(`=== Testing Category Search: ${category} ===`);

  try {
    const result = await newsApiService.getNewsByCategory(category, 5);

    if (result.success) {
      console.log("✅ Success!");
      console.log("Articles found:", result.data.length);

      const formatted = newsApiService.formatArticles(result.data);
      formatted.forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.title}`);
        console.log(`   Category: ${article.category}`);
        console.log(`   Date: ${article.date}`);
      });
    } else {
      console.log("❌ Error:", result.error);
    }

    console.log("\n================================\n");
    return result;
  } catch (error) {
    console.error("❌ Exception:", error.message);
    console.log("================================\n");
    throw error;
  }
};

/**
 * Test Search Everything
 */
export const testSearchEverything = async (query = "artificial intelligence") => {
  console.log(`=== Testing Search Everything: "${query}" ===`);

  try {
    const result = await newsApiService.searchEverything({
      q: query,
      pageSize: 5,
      sortBy: "publishedAt",
    });

    if (result.success) {
      console.log("✅ Success!");
      console.log("Articles found:", result.data.length);

      const formatted = newsApiService.formatArticles(result.data);
      formatted.forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.title}`);
        console.log(`   Source: ${article.source}`);
        console.log(`   Date: ${article.date}`);
      });
    } else {
      console.log("❌ Error:", result.error);
    }

    console.log("\n================================\n");
    return result;
  } catch (error) {
    console.error("❌ Exception:", error.message);
    console.log("================================\n");
    throw error;
  }
};

/**
 * Test Data Formatting
 */
export const testDataFormatting = () => {
  console.log("=== Testing Data Formatting ===");

  const formatted = newsApiService.formatArticles(newsArticles);

  console.log("✅ Formatted articles count:", formatted.length);
  console.log("\nSample formatted article:");
  console.log(JSON.stringify(formatted[0], null, 2));

  console.log("\n================================\n");
  return formatted;
};

/**
 * Run All Tests
 */
export const runAllTests = async () => {
  console.log("🧪 RUNNING ALL API TESTS\n");

  try {
    // Test 1: Configuration
    testApiConfiguration();

    // Test 2: Data Formatting
    testDataFormatting();

    // Test 3: Top Headlines
    await testTopHeadlines();

    // Test 4: Category Search
    await testCategorySearch("technology");

    // Test 5: Search Everything
    await testSearchEverything("COVID-19");

    console.log("✅ ALL TESTS COMPLETED\n");
  } catch (error) {
    console.error("❌ TEST FAILED:", error.message);
  }
};

/**
 * Log API Response Structure
 */
export const logApiResponseStructure = async () => {
  console.log("=== API Response Structure ===\n");

  try {
    const result = await newsApiService.getTopHeadlines({
      pageSize: 1,
    });

    console.log("Raw API Response Structure:");
    console.log(JSON.stringify(result, null, 2));

    console.log("\n================================\n");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

/**
 * Quick API Health Check
 */
export const quickHealthCheck = async () => {
  console.log("🔍 QUICK API HEALTH CHECK\n");

  const status = newsApiService.getApiStatus();
  console.log("API Status:", status.message);

  if (!status.configured) {
    console.log("⚠️ API not configured - using mock data");
    return false;
  }

  try {
    console.log("Testing connection...");
    const result = await newsApiService.getTopHeadlines({
      pageSize: 1,
    });

    if (result.success) {
      console.log("✅ API HEALTHY - Connection successful!");
      console.log("Articles available:", result.totalResults);
      return true;
    } else {
      console.log("❌ API ERROR -", result.error);
      return false;
    }
  } catch (error) {
    console.log("❌ CONNECTION FAILED -", error.message);
    return false;
  }
};

/**
 * Test Pagination
 */
export const testPagination = async () => {
  console.log("=== Testing Pagination ===\n");

  try {
    for (let page = 1; page <= 3; page++) {
      console.log(`Fetching page ${page}...`);
      const result = await newsApiService.getTopHeadlines({
        page,
        pageSize: 5,
      });

      if (result.success) {
        console.log(`✅ Page ${page}: ${result.data.length} articles`);
      } else {
        console.log(`❌ Page ${page}: Error -`, result.error);
      }
    }

    console.log("\n================================\n");
  } catch (error) {
    console.error("Error:", error.message);
  }
};

/**
 * Export test utilities untuk digunakan di dev
 */
export default {
  testApiConfiguration,
  testTopHeadlines,
  testCategorySearch,
  testSearchEverything,
  testDataFormatting,
  runAllTests,
  logApiResponseStructure,
  quickHealthCheck,
  testPagination,
};

/**
 * HOW TO USE:
 *
 * 1. Import di file yang ingin test:
 *    import * as apiTests from '../services/apiTestUtils';
 *
 * 2. Jalankan test dari console atau component:
 *    apiTests.quickHealthCheck();
 *    await apiTests.testTopHeadlines();
 *    await apiTests.runAllTests();
 *
 * 3. Buka console (Dev Tools) untuk melihat hasil
 *
 * Note: Jangan gunakan di production, hanya untuk development
 */
