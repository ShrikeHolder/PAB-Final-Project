// app/home.js - Perbaikan lengkap untuk bagian saveCurrentCity
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  TextInput,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { getCurrentWeather, getWeatherForecast, getWeatherIcon, getWeatherEmoji } from '../services/weatherService';
import { saveCity } from '../services/cityService';
import { getCachedUser } from '../services/authService';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  // State untuk data cuaca
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCity, setCurrentCity] = useState('Jakarta');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('User');

  // Fungsi untuk memuat data cuaca
  const loadWeatherData = async (city = currentCity) => {
    setLoading(true);
    setError(null);
    
    try {
      // Load current weather
      const currentWeather = await getCurrentWeather(city);
      
      if (!currentWeather) {
        throw new Error(`Tidak dapat menemukan data cuaca untuk kota: ${city}`);
      }
      
      setWeatherData(currentWeather);
      
      // Load forecast data
      const forecast = await getWeatherForecast(city);
      if (forecast) {
        setForecastData(forecast);
      }
      
      // Update current city jika pencarian berhasil
      if (city !== currentCity) {
        setCurrentCity(city);
      }
      
    } catch (error) {
      console.error('Error loading weather:', error);
      setError(error.message || 'Terjadi kesalahan saat memuat data cuaca');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data saat pertama kali render
  useEffect(() => {
    loadWeatherData();
    
    // Load user data
    const loadUserData = async () => {
      const user = await getCachedUser();
      if (user?.displayName) {
        setUserName(user.displayName);
      }
    };
    loadUserData();
  }, []);

  // Fungsi refresh
  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData();
  };

  // Fungsi pencarian kota
  const handleSearch = () => {
    if (searchQuery.trim()) {
      loadWeatherData(searchQuery.trim());
      setSearchQuery('');
    }
  };

  // Fungsi untuk menyimpan kota
  const saveCurrentCity = async () => {
    if (!weatherData) return;
    
    try {
      const result = await saveCity(weatherData.name);
      if (result.success) {
        Alert.alert(
          'Berhasil',
          `${weatherData.name} telah disimpan ke favorit`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Gagal menyimpan kota',
        [{ text: 'OK' }]
      );
    }
  };

  // Tampilkan loading
  if (loading && !weatherData) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Memuat data cuaca...</Text>
      </View>
    );
  }

  // Tampilkan error
  if (error && !weatherData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => loadWeatherData()}
        >
          <Text style={styles.retryButtonText}>Coba Lagi</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.retryButton, { marginTop: 10, backgroundColor: '#4CAF50' }]} 
          onPress={() => {
            setCurrentCity('Jakarta');
            loadWeatherData('Jakarta');
          }}
        >
          <Text style={styles.retryButtonText}>Kembali ke Jakarta</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Data contoh untuk kota tersimpan (sementara)
  const savedCities = [
    { id: 1, name: 'Bandung', temp: 24, desc: 'Hujan Ringan' },
    { id: 2, name: 'Surabaya', temp: 32, desc: 'Cerah' },
  ];

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          colors={['#2196F3']}
          tintColor="#2196F3"
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={['#2196F3', '#1976D2']}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>
              {new Date().getHours() < 12 ? 'Selamat Pagi' : 
               new Date().getHours() < 15 ? 'Selamat Siang' :
               new Date().getHours() < 19 ? 'Selamat Sore' : 'Selamat Malam'},</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/saved')}
            >
              <Text style={styles.iconText}>📚</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.push('/profile')}
            >
              <Text style={styles.iconText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari kota (contoh: Bandung, Surabaya)..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity 
            style={styles.searchButton} 
            onPress={handleSearch}
            disabled={!searchQuery.trim()}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Current Weather Card */}
      {weatherData && (
        <View style={styles.currentWeatherCard}>
          <View style={styles.weatherHeader}>
            <View>
              <Text style={styles.cityName}>
                {weatherData.name}, {weatherData.sys.country}
              </Text>
              <Text style={styles.weatherDate}>
                Hari ini • {new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </Text>
            </View>
            <TouchableOpacity onPress={saveCurrentCity}>
              <Text style={styles.saveIcon}>⭐</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weatherMain}>
            <View>
              <Text style={styles.temperature}>
                {Math.round(weatherData.main.temp)}°
              </Text>
              <Text style={styles.weatherDescription}>
                {weatherData.weather[0].description}
              </Text>
            </View>
            <View>
              <Image
                source={{ uri: getWeatherIcon(weatherData.weather[0].icon) }}
                style={styles.weatherImage}
              />
              <Text style={styles.weatherEmoji}>
                {getWeatherEmoji(weatherData.weather[0].main)}
              </Text>
            </View>
          </View>

          <View style={styles.weatherDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🌡️</Text>
              <Text style={styles.detailLabel}>Terasa</Text>
              <Text style={styles.detailValue}>
                {Math.round(weatherData.main.feels_like)}°
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💧</Text>
              <Text style={styles.detailLabel}>Kelembapan</Text>
              <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💨</Text>
              <Text style={styles.detailLabel}>Angin</Text>
              <Text style={styles.detailValue}>
                {weatherData.wind.speed.toFixed(1)} m/s
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Forecast Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prakiraan 5 Hari</Text>
          <Text style={styles.seeAllText}>Diperbarui: {weatherData?.formatted?.time || '--:--'}</Text>
        </View>
        
        {forecastData.length > 0 ? (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.forecastScroll}
          >
            {forecastData.map((item, index) => (
              <View key={index} style={styles.forecastCard}>
                <Text style={styles.forecastDay}>{item.day}</Text>
                <Text style={styles.forecastDate}>{item.date}</Text>
                <Image
                  source={{ uri: getWeatherIcon(item.icon) }}
                  style={styles.forecastImage}
                />
                <Text style={styles.forecastTemp}>{item.temp}°</Text>
                <Text style={styles.forecastDesc} numberOfLines={2}>
                  {item.desc}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.noForecast}>
            <Text style={styles.noForecastText}>
              Data prakiraan tidak tersedia
            </Text>
          </View>
        )}
      </View>

      {/* Saved Cities Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Kota Tersimpan</Text>
          <TouchableOpacity onPress={() => router.push('/saved')}>
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {savedCities.map((city) => (
          <TouchableOpacity 
            key={city.id} 
            style={styles.savedCityCard}
            onPress={() => {
              setCurrentCity(city.name);
              loadWeatherData(city.name);
            }}
          >
            <View style={styles.cityInfo}>
              <Text style={styles.cityNameSmall}>{city.name}</Text>
              <Text style={styles.cityWeather}>{city.desc}</Text>
            </View>
            <View style={styles.cityTemp}>
              <Text style={styles.temperatureSmall}>{city.temp}°</Text>
              <Text style={styles.weatherIconSmall}>☀️</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Weather Tips */}
      {weatherData && (
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips Cuaca Hari Ini</Text>
          <Text style={styles.tipsText}>
            {weatherData.weather[0].main === 'Rain' 
              ? 'Hari ini akan hujan, jangan lupa bawa payung atau jas hujan.'
              : weatherData.weather[0].main === 'Clear'
              ? 'Cuaca cerah, sempurna untuk aktivitas outdoor.'
              : weatherData.main.temp > 30
              ? 'Suhu cukup panas, pastikan minum air yang cukup.'
              : 'Cuaca cukup nyaman, cocok untuk beraktivitas di luar.'}
          </Text>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.navItemActive]}
          onPress={() => router.replace('/home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Beranda</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/saved')}
        >
          <Text style={styles.navIcon}>⭐</Text>
          <Text style={styles.navText}>Tersimpan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#2196F3',
    marginTop: 15,
  },
  errorIcon: {
    fontSize: 50,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 4,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
  searchButton: {
    padding: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  currentWeatherCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -15,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cityName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  weatherDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  saveIcon: {
    fontSize: 24,
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  temperature: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  weatherImage: {
    width: 80,
    height: 80,
  },
  weatherEmoji: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
  forecastScroll: {
    marginHorizontal: -5,
  },
  forecastCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    width: 110,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  forecastDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  forecastDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  forecastImage: {
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  forecastTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 2,
  },
  forecastDesc: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  noForecast: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  noForecastText: {
    color: '#999',
    fontSize: 14,
  },
  savedCityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  cityInfo: {
    flex: 1,
  },
  cityNameSmall: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cityWeather: {
    fontSize: 14,
    color: '#666',
    textTransform: 'capitalize',
  },
  cityTemp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperatureSmall: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 10,
  },
  weatherIconSmall: {
    fontSize: 30,
  },
  tipsCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 15,
    padding: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#2196F3',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  navText: {
    fontSize: 12,
    color: '#666',
  },
});