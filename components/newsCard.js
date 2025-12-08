import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const NewsCard = ({
  id,
  title,
  description,
  category,
  date,
  imageUrl,
  isSaved,
  onSave,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </View>

      {/* Content Container */}
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.date}>{date}</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => onSave && onSave(id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons
              name={isSaved ? "bookmark" : "bookmark-border"}
              size={20}
              color={isSaved ? "#AA0002" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  categoryBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#AA0002",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  contentContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 12,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 11,
    color: "#999",
    flex: 1,
  },
  saveButton: {
    padding: 6,
  },
});

export default NewsCard;
