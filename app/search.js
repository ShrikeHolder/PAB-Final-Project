// app/search.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import { getCurrentWeather, getWeatherIcon, getWeatherEmoji } from "../services/weatherService";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState(["Jakarta", "Surabaya", "Bandung"]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    Keyboard.dismiss();
    setLoading(true);
    
    try {
      const weatherData = await getCurrentWeather(searchQuery);
      
      if (weatherData && weatherData.cod === 200) {
        setResults([weatherData]);
        
        // Add to recent searches (no duplicates)
        if (!recentSearches.includes(searchQuery)) {
          setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
        }
      } else {
        setResults([]);
        alert(`Kota "${searchQuery}" tidak ditemukan`);
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("Terjadi kesalahan saat mencari");
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.weatherCard}
      onPress={() => {
        router.push({
          pathname: "/home",
          params: { city: item.name }
        });
      }}
    >
      <View style={styles.weatherHeader}>
        <View>
          <Text style={styles.cityName}>{item.name}, {item.sys.country}</Text>
          <Text style={styles.weatherDesc}>{item.weather[0].description}</Text>
        </View>
        <Image
          source={{ uri: getWeatherIcon(item.weather[0].icon) }}
          style={styles.weatherIcon}
        />
      </View>
      
      <View style={styles.weatherDetails}>
        <Text style={styles.temperature}>{Math.round(item.main.temp)}°C</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>💧 {item.main.humidity}%</Text>
          <Text style={styles.stat}>🌬️ {item.wind.speed} m/s</Text>
          <Text style={styles.stat}>📊 {item.main.pressure} hPa</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Simpan Kota</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari kota (contoh: Jakarta, Surabaya, Bandung)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={styles.searchButtonText}>Cari</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Pencarian Terakhir</Text>
          <View style={styles.recentList}>
            {recentSearches.map((city, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentItem}
                onPress={() => {
                  setSearchQuery(city);
                  handleSearch();
                }}
              >
                <Text style={styles.recentCity}>{city}</Text>
                <Text style={styles.recentArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Results */}
      <FlatList
        data={results}
        renderItem={renderWeatherItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.resultsList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Cari kota untuk melihat informasi cuaca
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Contoh: Jakarta, Surabaya, Bandung, Medan, Bali
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#1a73e8",
    paddingHorizontal: 25,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  searchButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  recentSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  recentList: {
    gap: 10,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
  },
  recentCity: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  recentArrow: {
    fontSize: 18,
    color: "#1a73e8",
  },
  resultsList: {
    paddingBottom: 20,
  },
  weatherCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  weatherHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  weatherDesc: {
    fontSize: 14,
    color: "#666",
    textTransform: "capitalize",
    marginTop: 2,
  },
  weatherIcon: {
    width: 60,
    height: 60,
  },
  weatherDetails: {
    marginBottom: 15,
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  stats: {
    flexDirection: "row",
    gap: 15,
  },
  stat: {
    fontSize: 14,
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});