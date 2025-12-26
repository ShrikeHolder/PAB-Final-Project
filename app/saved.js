// app/saved.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { getWeatherIcon } from "../services/weatherService";
import {
  getSavedCities,
  deleteCity,
  updateCityWeather,
} from "../services/cityService";

export default function SavedScreen() {
  const [savedCities, setSavedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load data kota tersimpan
  const loadSavedCities = async () => {
    setLoading(true);

    try {
      const result = await getSavedCities();

      if (result.success) {
        setSavedCities(result.cities);
      } else if (result.error && result.error !== "User belum login") {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      console.error("Error loading cities:", error);
      Alert.alert("Error", "Gagal memuat data kota tersimpan");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadSavedCities();
  }, []);

  const handleRemoveCity = async (cityId, cityName) => {
    Alert.alert("Hapus Kota", `Hapus ${cityName} dari daftar tersimpan?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteCity(cityId);
            Alert.alert("Berhasil", "Kota telah dihapus dari daftar tersimpan");
            loadSavedCities();
          } catch (error) {
            Alert.alert("Error", error.message || "Gagal menghapus kota");
          }
        },
      },
    ]);
  };

  const handleRefreshCity = async (cityId, cityName) => {
    try {
      const result = await updateCityWeather(cityId);
      if (result.success) {
        Alert.alert("Berhasil", "Data cuaca diperbarui");
        // Update UI
        setSavedCities((prev) =>
          prev.map((city) =>
            city.id === cityId
              ? {
                  ...city,
                  ...result.updatedData,
                  lastUpdated: new Date(),
                }
              : city
          )
        );
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Gagal memperbarui data");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadSavedCities();
  };

  const filteredCities = savedCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (city.country &&
        city.country.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Tampilkan loading
  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Memuat data kota...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#2196F3"]}
          tintColor="#2196F3"
        />
      }
    >
      {/* Header */}
      <LinearGradient colors={["#2196F3", "#1976D2"]} style={styles.header}>
        {/* <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity> */}

        <Text style={styles.headerTitle}>Kota Tersimpan</Text>
        <Text style={styles.headerSubtitle}>
          {savedCities.length} kota dalam daftar
        </Text>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari kota tersimpan..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Cities List */}
      <View style={styles.citiesContainer}>
        {filteredCities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏙️</Text>
            <Text style={styles.emptyTitle}>
              {searchQuery
                ? "Kota Tidak Ditemukan"
                : "Tidak Ada Kota Tersimpan"}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "Coba cari dengan nama kota lain"
                : "Simpan kota favorit Anda dari halaman beranda"}
            </Text>
          </View>
        ) : (
          filteredCities.map((city) => (
            <View key={city.id} style={styles.cityCard}>
              <View style={styles.cityHeader}>
                <View style={styles.cityInfo}>
                  <Text style={styles.cityName}>{city.name}</Text>
                  <Text style={styles.cityCountry}>
                    {city.country || "Indonesia"}
                  </Text>
                </View>
                <View style={styles.temperatureBadge}>
                  <Text style={styles.temperatureText}>
                    {city.temperature || "--"}°
                  </Text>
                </View>
              </View>

              <View style={styles.weatherInfo}>
                <View style={styles.weatherIconContainer}>
                  {city.icon ? (
                    <Image
                      source={{ uri: getWeatherIcon(city.icon) }}
                      style={styles.weatherImage}
                    />
                  ) : (
                    <Text style={styles.weatherIcon}>☀️</Text>
                  )}
                  <Text style={styles.weatherDescription}>
                    {city.description || "--"}
                  </Text>
                </View>

                <View style={styles.weatherDetails}>
                  <View style={styles.weatherDetail}>
                    <Text style={styles.detailIcon}>💧</Text>
                    <Text style={styles.detailText}>
                      {city.humidity || "--"}%
                    </Text>
                  </View>
                  <View style={styles.weatherDetail}>
                    <Text style={styles.detailIcon}>💨</Text>
                    <Text style={styles.detailText}>
                      {city.windSpeed || "--"} m/s
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.cityFooter}>
                <Text style={styles.lastUpdated}>
                  {city.lastUpdated
                    ? `Diperbarui: ${new Date(
                        city.lastUpdated
                      ).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "--:--"}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleRefreshCity(city.id, city.name)}
                  >
                    <Text style={styles.actionIcon}>🔄</Text>
                    <Text style={styles.actionText}>Refresh</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => handleRemoveCity(city.id, city.name)}
                  >
                    <Text style={styles.actionIcon}>🗑️</Text>
                    <Text style={[styles.actionText, styles.removeText]}>
                      Hapus
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Add More Cities */}
      <TouchableOpacity
        style={styles.addMoreCard}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.addMoreIcon}>➕</Text>
        <View style={styles.addMoreInfo}>
          <Text style={styles.addMoreTitle}>Tambahkan Kota Lain</Text>
          <Text style={styles.addMoreText}>
            Cari dan simpan kota untuk memantau cuacanya
          </Text>
        </View>
        <Text style={styles.addMoreArrow}>›</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 60,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  searchContainer: {
    position: "relative",
    margin: 20,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 45,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    position: "absolute",
    left: 15,
    top: 14,
    fontSize: 18,
    color: "#999",
  },
  citiesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    lineHeight: 20,
  },
  cityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cityCountry: {
    fontSize: 14,
    color: "#666",
  },
  temperatureBadge: {
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  temperatureText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
  },
  weatherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  weatherIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  weatherIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  weatherDescription: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  weatherDetails: {
    flexDirection: "row",
  },
  weatherDetail: {
    alignItems: "center",
    marginLeft: 20,
  },
  detailIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  cityFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastUpdated: {
    fontSize: 12,
    color: "#999",
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: "#FFEBEE",
  },
  actionIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  actionText: {
    fontSize: 12,
    color: "#2196F3",
    fontWeight: "500",
  },
  removeText: {
    color: "#F44336",
  },
  addMoreCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  addMoreIcon: {
    fontSize: 28,
    marginRight: 15,
    color: "#2196F3",
  },
  addMoreInfo: {
    flex: 1,
  },
  addMoreTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  addMoreText: {
    fontSize: 14,
    color: "#666",
  },
  addMoreArrow: {
    fontSize: 24,
    color: "#999",
  },
});
