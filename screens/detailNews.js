import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

/**
 * Detail Berita Page (Optional - untuk navigasi lebih lanjut)
 * Halaman ini dapat diintegrasikan ke dalam navigasi stack di masa depan
 */
const DetailNews = ({ route, navigation }) => {
  // Placeholder untuk detail berita
  const article = route?.params?.article || {
    id: 1,
    title: "Berita Contoh",
    category: "Teknologi",
    date: "2 jam yang lalu",
    author: "John Doe",
    imageUrl: "https://images.unsplash.com/photo-1677442d019cecf8d88c5a3db0e5b7c5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header dengan back button */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Detail Berita</Text>
        </View>

        {/* Featured Image */}
        <View style={styles.imageContainer}>
          {/* Image dapat diintegrasikan dengan react-native-fast-image untuk performance */}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Category */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{article.category}</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>{article.title}</Text>

          {/* Meta Information */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="person" size={14} color="#999" />
              <Text style={styles.metaText}>{article.author}</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialIcons name="access-time" size={14} color="#999" />
              <Text style={styles.metaText}>{article.date}</Text>
            </View>
          </View>

          {/* Content Text */}
          <Text style={styles.content}>{article.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },
  imageContainer: {
    width: width,
    height: 250,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    padding: 16,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#AA0002",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 12,
    lineHeight: 28,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
});

export default DetailNews;
