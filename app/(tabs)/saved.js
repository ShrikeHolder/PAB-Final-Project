// app/saved.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Pressable,
  ScrollView,
  Input,
  InputField,
  Spinner,
} from "@gluestack-ui/themed";
import { Alert, RefreshControl, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Untuk bantu refresh secara otomatis saat screen difokuskan
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

// Services
import { getWeatherIcon } from "../../services/weatherService";
import {
  getSavedCities,
  deleteCity,
  updateCityWeather,
} from "../../services/cityService";

// Icons
import SearchIcon from "../../assets/search.svg";
import WaterIcon from "../../assets/water.svg";
import WindIcon from "../../assets/wind.svg";
import RefreshIcon from "../../assets/refresh.svg";
import TrashIcon from "../../assets/trash.svg";
import AddIcon from "../../assets/add.svg";

export default function SavedScreen() {
  const [savedCities, setSavedCities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedCities = async () => {
    setLoading(true);
    try {
      const result = await getSavedCities();
      if (result.success) {
        setSavedCities(result.cities);
      } else if (result.error && result.error !== "User belum login") {
        Alert.alert("Error", result.error);
      }
    } catch {
      Alert.alert("Error", "Gagal memuat data kota tersimpan");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Auto-refresh kalau ada kota baru ditambahkan
  useFocusEffect(
    useCallback(() => {
      loadSavedCities();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadSavedCities();
  };

  const handleRemoveCity = (id, name) => {
    Alert.alert("Hapus Kota", `Hapus ${name} dari daftar tersimpan?`, [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: async () => {
          await deleteCity(id);
          loadSavedCities();
        },
      },
    ]);
  };

  const handleRefreshCity = async (id) => {
    const result = await updateCityWeather(id);
    if (result.success) loadSavedCities();
  };

  const filteredCities = savedCities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.country?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading
  if (loading && !refreshing) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="#F8F9FA">
        <Spinner size="large" color="#2196F3" />
        <Text mt={10} color="#666">
          Memuat data kota...
        </Text>
      </Box>
    );
  }

  return (
    <ScrollView
      bg="#F8F9FA"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#2196F3"]}
        />
      }
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
        <Text
          fontSize={28}
          fontWeight="700"
          color="#FFFFFF"
          textAlign="center"
          mb={8}
        >
          Kota Tersimpan
        </Text>
        <Text fontSize={16} color="rgba(255,255,255,0.9)" textAlign="center">
          {savedCities.length} kota dalam daftar
        </Text>
      </LinearGradient>

      {/* Search */}
      <Box m={20} position="relative">
        <Input
          bg="#FFFFFF"
          borderRadius={12}
          borderWidth={1}
          borderColor="#E9ECEF"
          height={45}
        >
          <InputField
            placeholder="Cari kota tersimpan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            pl={45}
            py={14}
            fontSize={16}
          />
        </Input>

        <Box position="absolute" left={15} top={14}>
          <SearchIcon width={18} height={18} />
        </Box>
      </Box>

      {/* List */}
      <Box px={20} mb={20}>
        {filteredCities.length === 0 ? (
          <Box alignItems="center" py={60} px={40}>
            <Text fontSize={64} opacity={0.5} mb={20}>
              🏙️
            </Text>
            <Text fontSize={20} fontWeight="700" color="#666" mb={10}>
              Tidak Ada Kota
            </Text>
            <Text fontSize={14} color="#999" textAlign="center">
              Simpan kota favorit dari halaman beranda
            </Text>
          </Box>
        ) : (
          filteredCities.map((city) => (
            <Box
              key={city.id}
              bg="#FFFFFF"
              borderRadius={20}
              p={20}
              mb={15}
              borderWidth={1}
              borderColor="#E9ECEF"
            >
              {/* Header */}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mb={15}
              >
                <Box>
                  <Text fontSize={20} fontWeight="700" color="#333" mb={4}>
                    {city.name}
                  </Text>
                  <Text fontSize={14} color="#666">
                    {city.country || "Indonesia"}
                  </Text>
                </Box>

                <Box bg="#F8F9FA" borderRadius={20} px={16} py={8}>
                  <Text fontSize={24} fontWeight="700" color="#2196F3">
                    {city.temperature || "--"}°
                  </Text>
                </Box>
              </Box>

              {/* Weather */}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                pb={15}
                mb={20}
                borderBottomWidth={1}
                borderBottomColor="#F0F0F0"
              >
                <Box flexDirection="row" alignItems="center">
                  {city.icon && (
                    <Image
                      source={{ uri: getWeatherIcon(city.icon) }}
                      style={{ width: 40, height: 40, marginRight: 10 }}
                    />
                  )}
                  <Text fontSize={16} color="#666" fontWeight="500">
                    {city.description || "--"}
                  </Text>
                </Box>

                <Box flexDirection="row">
                  <Box alignItems="center" ml={20}>
                    <WaterIcon width={18} height={18} />
                    <Text fontSize={14} color="#666" mt={5}>
                      {city.humidity || "--"}%
                    </Text>
                  </Box>
                  <Box alignItems="center" ml={20}>
                    <WindIcon width={18} height={18} />
                    <Text fontSize={14} color="#666" mt={5}>
                      {city.windSpeed || "--"} m/s
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Footer */}
              <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={12} color="#999">
                  {city.lastUpdated
                    ? `Diperbarui: ${new Date(
                        city.lastUpdated
                      ).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "--:--"}
                </Text>

                <Box flexDirection="row">
                  <Pressable
                    flexDirection="row"
                    alignItems="center"
                    bg="#F8F9FA"
                    borderRadius={8}
                    px={12}
                    py={8}
                    ml={10}
                    onPress={() => handleRefreshCity(city.id)}
                  >
                    <RefreshIcon width={14} height={14} />
                    <Text fontSize={12} color="#2196F3" ml={6}>
                      Refresh
                    </Text>
                  </Pressable>

                  <Pressable
                    flexDirection="row"
                    alignItems="center"
                    bg="#FFEBEE"
                    borderRadius={8}
                    px={12}
                    py={8}
                    ml={10}
                    onPress={() => handleRemoveCity(city.id, city.name)}
                  >
                    <TrashIcon width={14} height={14} />
                    <Text fontSize={12} color="#F44336" ml={6}>
                      Hapus
                    </Text>
                  </Pressable>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Tambah Kota */}
      <Pressable
        mx={20}
        mb={30}
        bg="#FFFFFF"
        borderRadius={20}
        p={20}
        borderWidth={1}
        borderColor="#E9ECEF"
        flexDirection="row"
        alignItems="center"
        onPress={() => router.push("/home")}
      >
        <AddIcon width={20} height={20} />
        <Box flex={1} ml={15}>
          <Text fontSize={16} fontWeight="700" color="#333" mb={4}>
            Tambahkan Kota Lain
          </Text>
          <Text fontSize={14} color="#666">
            Cari dan simpan kota favorit
          </Text>
        </Box>
        <Text fontSize={24} color="#999">
          ›
        </Text>
      </Pressable>
    </ScrollView>
  );
}
