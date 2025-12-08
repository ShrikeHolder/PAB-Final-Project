import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import NewsCard from "../components/newsCard";
import { useNews } from "../context/newsContext";

const Saved = () => {
  const { savedArticles, toggleSaveArticle, isSaved } = useNews();

  const handleRemoveArticle = (articleId) => {
    const article = savedArticles.find((a) => a.id === articleId);
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
      onSave={handleRemoveArticle}
      onPress={() => {
        // Dapat ditambahkan navigasi ke detail page
      }}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <MaterialIcons name="bookmark-border" size={64} color="#ccc" />
      </View>
      <Text style={styles.emptyTitle}>Belum Ada Berita Tersimpan</Text>
      <Text style={styles.emptyDescription}>
        Bookmark berita favorit Anda untuk membaca nanti
      </Text>
      <TouchableOpacity style={styles.emptyButton}>
        <Text style={styles.emptyButtonText}>Jelajahi Berita</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={styles.headerIconContainer}>
          <MaterialIcons name="bookmark" size={28} color="#fff" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Berita Tersimpan</Text>
          <Text style={styles.headerCount}>
            {savedArticles.length} artikel
          </Text>
        </View>
      </View>

      {savedArticles.length > 0 && (
        <Text style={styles.infoText}>
          Kelola koleksi berita favorit Anda dengan mudah
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={savedArticles}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={!savedArticles.length ? renderEmptyState : null}
        contentContainerStyle={[
          styles.listContent,
          savedArticles.length === 0 && styles.emptyListContent,
        ]}
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
  emptyListContent: {
    flexGrow: 1,
  },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#AA0002",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  headerCount: {
    fontSize: 13,
    color: "#999",
  },
  infoText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyDescription: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: "#AA0002",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Saved;
