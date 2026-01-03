// app/profile.js

import React, { useEffect, useState } from "react";
import { Box, Text, ScrollView, Pressable } from "@gluestack-ui/themed";
import { Switch, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Services
import { logoutUser, getCurrentUserProfile } from "../../services/authService";
import { getSavedCitiesCount } from "../../services/cityService";

// Icons
import CityIcon from "../../assets/city.svg";
import CalendarIcon from "../../assets/calendar.svg";
import BellIcon from "../../assets/bell.svg";
import MapIcon from "../../assets/map.svg";
import InfoIcon from "../../assets/about.svg";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [totalSavedCities, setTotalSavedCities] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getCurrentUserProfile();
      setUserData(profile);

      const count = await getSavedCitiesCount();
      setTotalSavedCities(count);
    };
    loadProfile();
  }, []);

  if (!userData) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Memuat profil...</Text>
      </Box>
    );
  }

  const formattedJoinDate = new Date(userData.joinDate).toLocaleDateString(
    "id-ID",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const handleToggleNotifications = () => {
    Alert.alert(
      "Fitur Belum Aktif",
      "Notifikasi cuaca akan tersedia pada versi berikutnya."
    );
    setNotificationsEnabled((prev) => !prev);
  };

  const handleToggleLocation = () => {
    Alert.alert(
      "Fitur Belum Aktif",
      "Lokasi otomatis akan menggunakan GPS pada versi berikutnya."
    );
    setLocationEnabled((prev) => !prev);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Konfirmasi Keluar",
      "Apakah Anda yakin ingin keluar dari aplikasi?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await logoutUser();
              if (result.success) {
                router.replace("/login");
                Alert.alert("Berhasil", "Anda telah keluar dari aplikasi");
              } else {
                Alert.alert("Error", result.error);
              }
            } catch (error) {
              Alert.alert("Error", "Gagal keluar dari aplikasi");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView bg="$coolGray50" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={["#2196F3", "#1976D2"]}
        style={{
          paddingTop: 60,
          paddingBottom: 40,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <Box alignItems="center">
          <LinearGradient
            colors={["#FFFFFF", "#E3F2FD"]}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text fontSize="$4xl" fontWeight="$bold" color="$primary600">
              {userData.displayName?.charAt(0) || "U"}
            </Text>
          </LinearGradient>

          <Text mt="$4" fontSize="$2xl" fontWeight="$bold" color="$white">
            {userData.displayName}
          </Text>
          <Text color="rgba(255,255,255,0.9)">{userData.email}</Text>
        </Box>
      </LinearGradient>

      {/* Stats */}
      <Box flexDirection="row" px="$5" mt="$-6" mb="$6">
        <Box
          flex={1}
          bg="$white"
          rounded="$xl"
          p="$4"
          mx="$1"
          alignItems="center"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          <CityIcon width={22} height={22} />
          <Text mt="$2" fontWeight="$bold" color="$primary600">
            {totalSavedCities}
          </Text>
          <Text fontSize="$xs" color="$coolGray500">
            Kota Tersimpan
          </Text>
        </Box>

        <Box
          flex={1}
          bg="$white"
          rounded="$xl"
          p="$4"
          mx="$1"
          alignItems="center"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          <CalendarIcon width={22} height={22} />
          <Text mt="$2" fontSize="$xs" color="$coolGray700">
            {formattedJoinDate}
          </Text>
          <Text fontSize="$xs" color="$coolGray500">
            Bergabung
          </Text>
        </Box>
      </Box>

      {/* Settings */}
      <Box px="$5" mb="$8">
        <Text fontSize="$lg" fontWeight="$bold" mb="$4">
          Pengaturan
        </Text>

        <Box
          bg="$white"
          rounded="$2xl"
          p="$5"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          {/* Notifikasi */}
          <Box flexDirection="row" justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              <BellIcon width={20} height={20} />
              <Box ml="$4">
                <Text fontWeight="$medium">Notifikasi</Text>
                <Text fontSize="$xs" color="$coolGray500">
                  Atur notifikasi cuaca
                </Text>
              </Box>
            </Box>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
            />
          </Box>

          {/* Lokasi */}
          <Box flexDirection="row" justifyContent="space-between" pt="$4">
            <Box flexDirection="row" alignItems="center">
              <MapIcon width={20} height={20} />
              <Box ml="$4">
                <Text fontWeight="$medium">Lokasi Otomatis</Text>
                <Text fontSize="$xs" color="$coolGray500">
                  Gunakan lokasi saat ini
                </Text>
              </Box>
            </Box>
            <Switch
              value={locationEnabled}
              onValueChange={handleToggleLocation}
            />
          </Box>

          {/* Tentang Aplikasi */}
          <Pressable
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pt="$4"
            onPress={() => router.push("/about")}
          >
            <Box flexDirection="row" alignItems="center">
              <InfoIcon width={20} height={20} />
              <Box ml="$4">
                <Text fontWeight="$medium">Tentang Aplikasi</Text>
                <Text fontSize="$xs" color="$coolGray500">
                  Informasi aplikasi & pengembang
                </Text>
              </Box>
            </Box>

            <Text fontSize="$xl" color="$coolGray400">
              ›
            </Text>
          </Pressable>
        </Box>
      </Box>

      {/* Logout Button */}
      <Pressable mx="$5" mb="$8" onPress={handleLogout}>
        <LinearGradient
          colors={["#FF6B6B", "#F44336"]}
          style={{
            paddingVertical: 18,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text color="$white" fontWeight="$bold">
            KELUAR DARI AKUN
          </Text>
        </LinearGradient>
      </Pressable>

      {/* Version */}
      <Box alignItems="center" pb="$6">
        <Text fontSize="$xs" color="$coolGray400">
          Angin Nusantara v1.0.0
        </Text>
      </Box>
    </ScrollView>
  );
}
