// app/home.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { router } from "expo-router";
import { getCurrentWeather, getWeatherIcon, getWeatherEmoji, getWeatherColor } from "../services/weatherService";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentCity, setCurrentCity] = useState("Jakarta");
  const [error, setError] = useState(null);

  const fetchWeather = async (city = currentCity) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentWeather(city);
      
      if (data && data.cod === 200) {
        setWeather(data);
      } else {
        setError("Kota tidak ditemukan");
        setWeather(null);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Gagal mengambil data cuaca");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWeather();
    setRefreshing(false);
  };

  const changeCity = (city) => {
    setCurrentCity(city);
    fetchWeather(city);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a73e8" />
        <Text style={styles.loadingText}>Memuat data cuaca...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>🌤️ Angin Nusantara</Text>
        <Text style={styles.welcome}>Aplikasi Cuaca Indonesia</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchWeather()}
          >
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <>
          {/* Weather Card */}
          <View style={[styles.weatherCard, { backgroundColor: getWeatherColor(weather.weather[0].main)[0] }]}>
            <View style={styles.locationSection}>
              <Text style={styles.cityName}>
                {weather.name}, {weather.sys.country}
              </Text>
              <Text style={styles.dateTime}>
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </View>

            <View style={styles.weatherMain}>
              <View style={styles.temperatureSection}>
                <Text style={styles.temperature}>
                  {Math.round(weather.main.temp)}°C
                </Text>
                <Text style={styles.feelsLike}>
                  Terasa seperti: {Math.round(weather.main.feels_like)}°C
                </Text>
              </View>
              
              <View style={styles.conditionSection}>
                <Image
                  source={{ uri: getWeatherIcon(weather.weather[0].icon) }}
                  style={styles.weatherIcon}
                />
                <Text style={styles.condition}>
                  {getWeatherEmoji(weather.weather[0].main)} {weather.weather[0].description}
                </Text>
              </View>
            </View>

            <View style={styles.weatherDetails}>
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>💧</Text>
                  <Text style={styles.detailLabel}>Kelembaban</Text>
                  <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🌬️</Text>
                  <Text style={styles.detailLabel}>Angin</Text>
                  <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                </View>
              </View>
              
              <View style={styles.detailRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📊</Text>
                  <Text style={styles.detailLabel}>Tekanan</Text>
                  <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>👁️</Text>
                  <Text style={styles.detailLabel}>Visibilitas</Text>
                  <Text style={styles.detailValue}>
                    {(weather.visibility / 1000).toFixed(1)} km
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Quick Cities */}
          <View style={styles.quickCities}>
            <Text style={styles.sectionTitle}>Kota Lainnya</Text>
            <View style={styles.cityButtons}>
              {["Surabaya", "Bandung", "Medan", "Bali", "Yogyakarta"].map((city) => (
                <TouchableOpacity
                  key={city}
                  style={styles.cityButton}
                  onPress={() => changeCity(city)}
                >
                  <Text style={styles.cityButtonText}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      ) : null}

      {/* Navigation Menu */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Menu Aplikasi</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push("/search")}
        >
          <Text style={styles.menuIcon}>🔍</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Cari Kota</Text>
            <Text style={styles.menuDescription}>Cari informasi cuaca kota lain</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push("/saved")}
        >
          <Text style={styles.menuIcon}>💾</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Kota Tersimpan</Text>
            <Text style={styles.menuDescription}>Lihat daftar kota favorit</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Profil</Text>
            <Text style={styles.menuDescription}>Pengaturan akun</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.menuIcon}>🚪</Text>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Keluar</Text>
            <Text style={styles.menuDescription}>Logout dari aplikasi</Text>
          </View>
          <Text style={styles.menuArrow}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Data cuaca oleh OpenWeatherMap</Text>
        <Text style={styles.footerSubtext}>© 2024 Angin Nusantara</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  header: {
    backgroundColor: "#1a73e8",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  welcome: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
  weatherCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  locationSection: {
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  weatherMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  temperatureSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 56,
    fontWeight: "bold",
    color: "white",
  },
  feelsLike: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 5,
  },
  conditionSection: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
  condition: {
    fontSize: 16,
    color: "white",
    fontWeight: "500",
    marginTop: 5,
    textAlign: "center",
  },
  weatherDetails: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    padding: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 3,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  quickCities: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  cityButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cityButton: {
    backgroundColor: "#f0f7ff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cityButtonText: {
    color: "#1a73e8",
    fontWeight: "500",
  },
  menuSection: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 12,
    color: "#666",
  },
  menuArrow: {
    fontSize: 20,
    color: "#999",
  },
  footer: {
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  footerSubtext: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#d32f2f",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});