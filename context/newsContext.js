import React, { createContext, useState, useContext } from "react";

const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);

  const toggleSaveArticle = (article) => {
    const isAlreadySaved = savedArticles.some((item) => item.id === article.id);

    if (isAlreadySaved) {
      setSavedArticles(savedArticles.filter((item) => item.id !== article.id));
    } else {
      setSavedArticles([...savedArticles, article]);
    }
  };

  const isSaved = (articleId) => {
    return savedArticles.some((item) => item.id === articleId);
  };

  const value = {
    savedArticles,
    toggleSaveArticle,
    isSaved,
  };

  return (
    <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
