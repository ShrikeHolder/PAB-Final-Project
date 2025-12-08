import { useState, useCallback } from "react";

/**
 * Hook untuk menghandle refresh dan loading state
 * @param {Function} onRefresh - Callback saat refresh dipanggil
 * @param {number} duration - Durasi loading dalam ms
 */
export const useRefreshControl = (onRefresh, duration = 2000) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    onRefresh && onRefresh();
    setTimeout(() => setRefreshing(false), duration);
  }, [onRefresh, duration]);

  return { refreshing, handleRefresh };
};

/**
 * Hook untuk filter artikel berdasarkan kategori
 * @param {Array} articles - Array artikel
 * @param {string} selectedCategory - Kategori yang dipilih
 */
export const useCategoryFilter = (articles, selectedCategory) => {
  return selectedCategory === "Semua"
    ? articles
    : articles.filter((article) => article.category === selectedCategory);
};

/**
 * Hook untuk search artikel
 * @param {Array} articles - Array artikel
 * @param {string} searchQuery - Query pencarian
 */
export const useArticleSearch = (articles, searchQuery) => {
  if (!searchQuery.trim()) return articles;

  return articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
