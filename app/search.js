import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { useNews } from "../context/newsContext";
import * as newsApiService from "../services/newsApiService";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { isSaved, toggleSaveArticle } = useNews();

  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setSearched(true);

      if (!newsApiService.isApiKeyConfigured()) {
        // For mock data, do a simple text search
        const mockArticles = newsApiService.formatArticles(
          require("../data/newsData").newsArticles
        );
        const filtered = mockArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered);
        return;
      }

      const result = await newsApiService.searchEverything({
        q: query,
        pageSize: 20,
      });

      if (result.success) {
        const formattedArticles = newsApiService.formatArticles(result.data);
        setSearchResults(formattedArticles);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    performSearch(text);
  };

  const handleSaveArticle = (articleId) => {
    const article = searchResults.find((a) => a.id === articleId);
    if (article) {
      toggleSaveArticle(article);
    }
  };

  const renderNewsItem = ({ item }) => (
    <NewsCard
      id={item.id}
      title={item.title}
      description={item.description}
      category={item.category}
      date={item.date}
      imageUrl={item.imageUrl}
      isSaved={isSaved(item.id)}
      onSave={handleSaveArticle}
      onPress={() => {}}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      {!searched ? (
        <>
          <MaterialIcons name="search" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Cari Berita</Text>
          <Text style={styles.emptyDescription}>
            Masukkan kata kunci untuk mencari berita
          </Text>
        </>
      ) : loading ? (
        <>
          <ActivityIndicator size="large" color="#AA0002" />
          <Text style={styles.emptyTitle}>Mencari...</Text>
        </>
      ) : (
        <>
          <MaterialIcons name="not-interested" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Tidak Ada Hasil</Text>
          <Text style={styles.emptyDescription}>
            Coba kata kunci yang berbeda
          </Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Cari Berita</Text>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={22} color="#AA0002" />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari berita, topik, atau penulis..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <MaterialIcons name="close" size={22} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
    color: "#222",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Search;
