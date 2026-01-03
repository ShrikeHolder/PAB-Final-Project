// app/_layout.js

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { StyledProvider } from "@gluestack-style/react";
import { config } from "@gluestack-ui/config";

export default function RootLayout() {
  return (
    <StyledProvider config={config}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor="#2196F3" />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="about" />

          {/* Tabs masuk sebagai Satu Screen */}
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaProvider>
    </StyledProvider>
  );
}
