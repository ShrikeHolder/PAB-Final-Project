// app/splash.js

import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#2196F3", "#1976D2"]} style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

      <Box flex={1} justifyContent="center" alignItems="center">
        {/* Logo */}
        <Box alignItems="center" mb="$8">
          <Box
            size={120}
            rounded="$full"
            bg="$whiteAlpha300"
            justifyContent="center"
            alignItems="center"
            shadow="$4"
          >
            <Text fontSize="$6xl">🌤️</Text>
          </Box>
        </Box>

        {/* Text */}
        <Box alignItems="center">
          <Text
            fontSize="$4xl"
            fontWeight="$bold"
            color="$white"
            letterSpacing={2}
            mb="$2"
          >
            ANGIN NUSANTARA
          </Text>
          <Text fontSize="$md" color="$whiteAlpha900" letterSpacing={1}>
            Prakiraan Cuaca Indonesia
          </Text>
        </Box>

        {/* Loading */}
        <Box position="absolute" bottom={60}>
          <Text color="$whiteAlpha800" fontSize="$sm">
            Memuat aplikasi...
          </Text>
        </Box>
      </Box>
    </LinearGradient>
  );
}
