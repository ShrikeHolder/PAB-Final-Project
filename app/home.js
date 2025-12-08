import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { useNews } from "../context/newsContext";
import { newsArticles } from "../data/newsData";
import * as newsApiService from "../services/newsApiService";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSaved, toggleSaveArticle } = useNews();

  const categories = [
    "Semua",
    "Teknologi",
    "Bisnis",
    "Gadget",
    "Lingkungan",
    "Startup",
    "Kesehatan",
    "Hiburan",
    "Ekonomi",
  ];

  // API category mapping
  const categoryMapping = {
    Teknologi: "technology",
    Bisnis: "business",
    Gadget: "technology",
    Lingkungan: "general",
    Startup: "business",
    Kesehatan: "health",
    Hiburan: "entertainment",
    Ekonomi: "business",
    Semua: "general",
  };

  // Fetch articles dari API
  const fetchArticles = useCallback(async (category = "Semua") => {
    try {
      setLoading(true);
      setError(null);

      // Check if API is configured
      if (!newsApiService.isApiKeyConfigured()) {
        // Gunakan mock data jika API key tidak dikonfigurasi
        const mockArticles = newsApiService.formatArticles(newsArticles);
        setArticles(mockArticles);
        console.warn("⚠️ API key not configured, using mock data");
        return;
      }

      // Fetch dari API
      const apiCategory = categoryMapping[category];
      const result = await newsApiService.getTopHeadlines({
        category: apiCategory === "general" ? undefined : apiCategory,
        pageSize: 20,
      });

      if (result.success) {
        const formattedArticles = newsApiService.formatArticles(result.data);
        setArticles(formattedArticles);
      } else {
        // Fallback to mock data on error
        console.warn("API error, using mock data:", result.error);
        const mockArticles = newsApiService.formatArticles(newsArticles);
        setArticles(mockArticles);
        setError(result.error);
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      // Fallback to mock data
      const mockArticles = newsApiService.formatArticles(newsArticles);
      setArticles(mockArticles);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load & category change
  useEffect(() => {
    fetchArticles(selectedCategory);
  }, [selectedCategory, fetchArticles]);

  const filteredNews =
    selectedCategory === "Semua"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchArticles(selectedCategory).finally(() => {
      setRefreshing(false);
    });
  }, [selectedCategory, fetchArticles]);

  const handleSaveArticle = (articleId) => {
    const article = articles.find((a) => a.id === articleId);
    if (article) {
      toggleSaveArticle(article);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryItemText,
          selectedCategory === item && styles.categoryItemTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

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
      onPress={() => {
        // Dapat ditambahkan navigasi ke detail page
      }}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* API Status Indicator */}
      {error && (
        <View style={styles.errorBanner}>
          <MaterialIcons name="warning" size={16} color="#fff" />
          <Text style={styles.errorText}>
            Menggunakan data lokal - {error}
          </Text>
        </View>
      )}

      {!newsApiService.isApiKeyConfigured() && (
        <View style={styles.warningBanner}>
          <MaterialIcons name="info" size={16} color="#fff" />
          <Text style={styles.warningText}>
            Gunakan NewsAPI untuk data real-time (edit API key di services)
          </Text>
        </View>
      )}

      {/* API Status + Test button */}
      <View style={styles.apiStatusRow}>
        <Text style={styles.statusText}>{newsApiService.getApiStatus().message}</Text>
        <TouchableOpacity
          style={styles.testButton}
          onPress={async () => {
            try {
              if (!newsApiService.isApiKeyConfigured()) {
                Alert.alert(
                  "API Not Configured",
                  "API key belum dikonfigurasi. Tambahkan key di app.json atau set environment variable."
                );
                return;
              }

              const res = await newsApiService.getTopHeadlines({ pageSize: 3 });
              if (res.success) {
                Alert.alert("API OK", `Berhasil mengambil ${res.data.length} artikel dari API`);
              } else {
                Alert.alert("API Error", res.error || "Gagal mengambil data dari API");
              }
            } catch (err) {
              Alert.alert("API Error", err.message || "Terjadi kesalahan saat menghubungi API");
            }
          }}
        >
          <Text style={styles.testButtonText}>Test API</Text>
        </TouchableOpacity>
      </View>

      {/* Logo & Title */}
      <View style={styles.logoSection}>
        <View style={styles.logoIcon}>
          <MaterialIcons name="newspaper" size={32} color="#fff" />
        </View>
        <View>
          <Text style={styles.appName}>Nusa Media</Text>
          <Text style={styles.appTagline}>Berita Terpercaya Indonesia</Text>
        </View>
      </View>

      {/* Search Section */}
      <TouchableOpacity style={styles.searchBox}>
        <MaterialIcons name="search" size={20} color="#999" />
        <Text style={styles.searchText}>Cari berita...</Text>
      </TouchableOpacity>

      {/* Category Filter */}
      <Text style={styles.sectionTitle}>Kategori</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.categoriesContainer}
      />

      <Text style={styles.sectionTitle}>
        Berita Terbaru {loading && <ActivityIndicator size="small" color="#AA0002" />}
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#AA0002" />
          <Text style={styles.loadingText}>Memuat berita...</Text>
        </>
      ) : (
        <>
          <MaterialIcons name="article" size={48} color="#ccc" />
          <Text style={styles.emptyText}>Tidak ada berita ditemukan</Text>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredNews}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#AA0002"]}
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  listContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFA500",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  warningText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
    flex: 1,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#AA0002",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#222",
  },
  appTagline: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchText: {
    marginLeft: 8,
    color: "#999",
    fontSize: 14,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryItem: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 8,
  },
  categoryItemActive: {
    backgroundColor: "#AA0002",
  },
  categoryItemText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  categoryItemTextActive: {
    color: "#fff",
  },
  apiStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#666",
  },
  testButton: {
    backgroundColor: "#AA0002",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  testButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
  },
});

export default Home;
