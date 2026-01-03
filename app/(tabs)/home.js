// app/home.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  ScrollView,
  Pressable,
  Input,
  InputField,
  Spinner,
} from "@gluestack-ui/themed";
import { RefreshControl, Alert, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Services
import {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherIcon,
} from "../../services/weatherService";
import { saveCity, isCitySaved } from "../../services/cityService";
import { getCachedUser } from "../../services/authService";

// Icons
import SearchIcon from "../../assets/search.svg";
import StarIcon from "../../assets/star.svg";
import TempIcon from "../../assets/temp.svg";
import WaterIcon from "../../assets/water.svg";
import WindIcon from "../../assets/wind.svg";
import InfoIcon from "../../assets/about.svg";
import UnsavedIcon from "../../assets/unsaved.svg";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");
  const [isSaved, setIsSaved] = useState(false);

  const loadWeatherData = async (city = "Jakarta") => {
    try {
      setLoading(true);

      const current = await getCurrentWeather(city);
      const forecast = await getWeatherForecast(city);

      setWeatherData(current);
      setForecastData(forecast || []);

      const saved = await isCitySaved(current.name);
      setIsSaved(saved);
    } catch (e) {
      Alert.alert("Error", "Gagal memuat data cuaca");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadWeatherData();
    (async () => {
      const user = await getCachedUser();
      if (user?.displayName) setUserName(user.displayName);
    })();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadWeatherData(weatherData?.name || "Jakarta");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsSaved(false);
      loadWeatherData(searchQuery.trim());
      setSearchQuery("");
    }
  };

  const handleSaveCity = async () => {
    if (!weatherData) return;

    if (isSaved) {
      Alert.alert("Info", "Kota ini sudah tersimpan");
      return;
    }

    const result = await saveCity(weatherData.name);
    if (result.success) {
      setIsSaved(true);
      Alert.alert("Berhasil", "Kota berhasil disimpan");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  if (loading && !weatherData) {
    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        bg="$coolGray50"
      >
        <Spinner size="large" color="$primary600" />
        <Text mt="$4" color="$primary600">
          Memuat data cuaca...
        </Text>
      </Box>
    );
  }

  return (
    <ScrollView
      bg="$coolGray50"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#2196F3"]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <LinearGradient
        colors={["#2196F3", "#1976D2"]}
        style={{
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        {/* Greetings */}
        <Text color="$white" fontSize="$2xl" fontWeight="$bold">
          {new Date().getHours() < 12
            ? "Selamat Pagi, "
            : new Date().getHours() < 18
            ? "Selamat Sore, "
            : "Selamat Malam, "}
          {userName}
        </Text>

        {/* Search */}
        <Box mt="$5" position="relative">
          <Input
            bg="rgba(255,255,255,0.2)"
            borderRadius="$xl"
            borderWidth={1}
            borderColor="rgba(255,255,255,0.3)"
            height={50}
          >
            <InputField
              placeholder="Cari kota..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              pl="$10"
              color="$white"
            />
          </Input>

          <Box
            position="absolute"
            left="$4"
            top="50%"
            style={{ transform: [{ translateY: -9 }] }}
          >
            <SearchIcon width={18} height={18} />
          </Box>
        </Box>
      </LinearGradient>

      {/* Current Weather */}
      {weatherData && (
        <Box
          bg="$white"
          mx="$5"
          mt="$-6"
          p="$5"
          rounded="$2xl"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="$4"
          >
            <Box>
              <Text fontSize="$xl" fontWeight="$bold">
                {weatherData.name}, {weatherData.sys.country}
              </Text>
              <Text fontSize="$sm" color="$coolGray500">
                Hari ini •{" "}
                {new Date().toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </Text>
            </Box>

            <Pressable onPress={handleSaveCity}>
              {isSaved ? (
                <StarIcon width={22} height={22} />
              ) : (
                <UnsavedIcon width={22} height={22} />
              )}
            </Pressable>
          </Box>

          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mb="$5"
          >
            <Box>
              <Text fontSize="$6xl" fontWeight="$bold" color="$primary600">
                {Math.round(weatherData.main.temp)}°
              </Text>
              <Text color="$coolGray600" textTransform="capitalize">
                {weatherData.weather[0].description}
              </Text>
            </Box>

            <Image
              source={{ uri: getWeatherIcon(weatherData.weather[0].icon) }}
              style={{ width: 90, height: 90 }}
            />
          </Box>

          {/* Details */}
          <Box
            flexDirection="row"
            justifyContent="space-around"
            pt="$4"
            borderTopWidth={1}
            borderTopColor="$coolGray100"
          >
            <Box alignItems="center">
              <TempIcon width={20} height={20} />
              <Text fontSize="$xs" color="$coolGray500">
                Terasa
              </Text>
              <Text fontWeight="$bold">
                {Math.round(weatherData.main.feels_like)}°
              </Text>
            </Box>

            <Box alignItems="center">
              <WaterIcon width={20} height={20} />
              <Text fontSize="$xs" color="$coolGray500">
                Kelembapan
              </Text>
              <Text fontWeight="$bold">{weatherData.main.humidity}%</Text>
            </Box>

            <Box alignItems="center">
              <WindIcon width={20} height={20} />
              <Text fontSize="$xs" color="$coolGray500">
                Angin
              </Text>
              <Text fontWeight="$bold">
                {weatherData.wind.speed.toFixed(1)} m/s
              </Text>
            </Box>
          </Box>
        </Box>
      )}

      {/* Forecast */}
      <Box px="$5" mt="$8">
        <Text fontSize="$lg" fontWeight="$bold" mb="$4">
          Prakiraan 5 Hari
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {forecastData.map((item, i) => (
            <Box
              key={i}
              bg="$white"
              borderWidth={1}
              borderColor="$coolGray200"
              rounded="$xl"
              p="$4"
              mr="$3"
              width={110}
              alignItems="center"
            >
              <Text fontWeight="$bold">{item.day}</Text>
              <Text fontSize="$xs" color="$coolGray500">
                {item.date}
              </Text>

              <Image
                source={{ uri: getWeatherIcon(item.icon) }}
                style={{ width: 50, height: 50 }}
              />

              <Text fontWeight="$bold" color="$primary600">
                {item.temp}°
              </Text>
              <Text fontSize="$xs" color="$coolGray600" textAlign="center">
                {item.desc}
              </Text>
            </Box>
          ))}
        </ScrollView>
      </Box>

      {/* Tips */}
      {weatherData && (
        <Box
          bg="$coolGray100"
          mx="$5"
          mt="$8"
          p="$5"
          rounded="$xl"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          <Box flexDirection="row" alignItems="center" mb="$2">
            <InfoIcon width={28} height={28} />
            <Text ml="$2" fontWeight="$bold">
              Tips Cuaca Hari Ini
            </Text>
          </Box>
          <Text color="$coolGray700">
            {weatherData.weather[0].main === "Rain"
              ? "Hari ini akan hujan, jangan lupa bawa payung."
              : weatherData.weather[0].main === "Clear"
              ? "Cuaca cerah, cocok untuk aktivitas luar."
              : "Cuaca cukup nyaman untuk beraktivitas."}
          </Text>
        </Box>
      )}

      {/* Separator */}
      <Box height={30} />
    </ScrollView>
  );
}
