// app/about.js

import React from "react";
import { Box, Text, ScrollView, Pressable } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Icons
import InfoIcon from "../assets/about-white.svg";

export default function AboutScreen() {
  return (
    <ScrollView bg="$coolGray50">
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
          <InfoIcon width={48} height={48} style={{ color: "white" }} />
          <Text mt="$4" fontSize="$2xl" fontWeight="$bold" color="$white">
            Tentang Aplikasi
          </Text>
          <Text color="rgba(255,255,255,0.9)">Angin Nusantara</Text>
        </Box>
      </LinearGradient>

      {/* Content */}
      <Box px="$5" mt="$6">
        <Box
          bg="$white"
          rounded="$2xl"
          p="$5"
          borderWidth={1}
          borderColor="$coolGray200"
          mb="$6"
        >
          <Text fontWeight="$bold" mb="$2">
            Deskripsi
          </Text>
          <Text color="$coolGray700">
            Angin Nusantara adalah aplikasi cuaca berbasis mobile yang
            menyediakan informasi cuaca terkini, prakiraan 5 hari, serta fitur
            penyimpanan kota favorit menggunakan API OpenWeatherMap.
          </Text>
        </Box>

        <Box
          bg="$white"
          rounded="$2xl"
          p="$5"
          borderWidth={1}
          borderColor="$coolGray200"
          mb="$6"
        >
          <Text fontWeight="$bold" mb="$2">
            Teknologi
          </Text>
          <Text color="$coolGray700">
            • React Native (Expo){"\n"}• Gluestack UI{"\n"}• Firebase
            Authentication & Firestore{"\n"}• OpenWeatherMap API
          </Text>
        </Box>

        <Box
          bg="$white"
          rounded="$2xl"
          p="$5"
          borderWidth={1}
          borderColor="$coolGray200"
        >
          <Text fontWeight="$bold" mb="$2">
            Versi Aplikasi
          </Text>
          <Text color="$coolGray700">
            Versi 1.0.0{"\n"}© 2026 Angin Nusantara
          </Text>
        </Box>
      </Box>

      {/* Back */}
      <Pressable mx="$5" my="$8" onPress={() => router.back()}>
        <Box bg="$primary600" py="$4" rounded="$xl" alignItems="center">
          <Text color="$white" fontWeight="$bold">
            KEMBALI
          </Text>
        </Box>
      </Pressable>
    </ScrollView>
  );
}
