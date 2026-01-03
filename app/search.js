// app/search.js

import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  InputField,
  ScrollView,
  Pressable,
  Spinner,
  Image,
  FlatList,
} from "@gluestack-ui/themed";
import { Keyboard, Alert } from "react-native";
import { router } from "expo-router";
import { getCurrentWeather, getWeatherIcon } from "../services/weatherService";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "Jakarta",
    "Surabaya",
    "Bandung",
  ]);

  const handleSearch = async (queryOverride) => {
    const query = queryOverride ?? searchQuery;

    if (!query.trim()) return;

    Keyboard.dismiss();
    setLoading(true);

    try {
      const weatherData = await getCurrentWeather(query);

      if (weatherData && weatherData.cod === 200) {
        setResults([weatherData]);

        if (!recentSearches.includes(query)) {
          setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
        }
      } else {
        setResults([]);
        Alert.alert("Tidak Ditemukan", `Kota "${query}" tidak ditemukan`);
      }
    } catch (error) {
      Alert.alert("Error", "Terjadi kesalahan saat mencari kota");
    } finally {
      setLoading(false);
    }
  };

  const renderWeatherItem = ({ item }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/home",
          params: { city: item.name },
        })
      }
    >
      <Box bg="$white" rounded="$2xl" p="$5" mb="$4" shadow="$3">
        {/* Header */}
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="$3"
        >
          <Box>
            <Text fontSize="$lg" fontWeight="$bold">
              {item.name}, {item.sys.country}
            </Text>
            <Text
              fontSize="$sm"
              color="$coolGray500"
              textTransform="capitalize"
            >
              {item.weather[0].description}
            </Text>
          </Box>

          <Image
            source={{ uri: getWeatherIcon(item.weather[0].icon) }}
            alt="weather"
            size="lg"
          />
        </Box>

        {/* Details */}
        <Box mb="$3">
          <Text fontSize="$4xl" fontWeight="$bold">
            {Math.round(item.main.temp)}°C
          </Text>

          <Box flexDirection="row" mt="$2">
            <Text fontSize="$sm" color="$coolGray500" mr="$4">
              💧 {item.main.humidity}%
            </Text>
            <Text fontSize="$sm" color="$coolGray500" mr="$4">
              🌬️ {item.wind.speed} m/s
            </Text>
            <Text fontSize="$sm" color="$coolGray500">
              📊 {item.main.pressure} hPa
            </Text>
          </Box>
        </Box>

        {/* Save Button */}
        <Box bg="$primary600" rounded="$lg" py="$2" alignItems="center">
          <Text color="$white" fontWeight="$bold">
            Simpan Kota
          </Text>
        </Box>
      </Box>
    </Pressable>
  );

  return (
    <ScrollView
      bg="$coolGray100"
      px="$5"
      py="$5"
      showsVerticalScrollIndicator={false}
    >
      {/* Search */}
      <Box flexDirection="row" mb="$5">
        <Input
          flex={1}
          bg="$white"
          rounded="$xl"
          borderColor="$coolGray200"
          mr="$3"
        >
          <InputField
            placeholder="Cari kota (Jakarta, Surabaya, Bandung)"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => handleSearch()}
            returnKeyType="search"
          />
        </Input>

        <Pressable
          bg="$primary600"
          rounded="$xl"
          px="$5"
          justifyContent="center"
          onPress={() => handleSearch()}
          disabled={loading}
        >
          {loading ? (
            <Spinner color="$white" />
          ) : (
            <Text color="$white" fontWeight="$bold">
              Cari
            </Text>
          )}
        </Pressable>
      </Box>

      {/* Searcher Recent */}
      {recentSearches.length > 0 && (
        <Box bg="$white" rounded="$2xl" p="$5" mb="$5" shadow="$2">
          <Text fontWeight="$bold" mb="$3">
            Pencarian Terakhir
          </Text>

          {recentSearches.map((city, index) => (
            <Pressable
              key={index}
              bg="$coolGray100"
              rounded="$lg"
              px="$4"
              py="$3"
              mb="$2"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              onPress={() => {
                setSearchQuery(city);
                handleSearch(city);
              }}
            >
              <Text fontWeight="$medium">{city}</Text>
              <Text color="$primary600">→</Text>
            </Pressable>
          ))}
        </Box>
      )}

      {/* Search Result */}
      <FlatList
        data={results}
        renderItem={renderWeatherItem}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        ListEmptyComponent={
          <Box alignItems="center" py="$10">
            <Text color="$coolGray500" textAlign="center">
              Cari kota untuk melihat informasi cuaca
            </Text>
            <Text color="$coolGray400" textAlign="center" mt="$2">
              Contoh: Jakarta, Surabaya, Bandung, Medan, Bali
            </Text>
          </Box>
        }
      />
    </ScrollView>
  );
}
