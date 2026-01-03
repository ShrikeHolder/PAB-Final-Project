// app/login.js

import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  InputField,
  Pressable,
  Spinner,
} from "@gluestack-ui/themed";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Services
import { loginUser } from "../services/authService";

// Icons
import EyeOpen from "../assets/eye-open.svg";
import EyeClose from "../assets/eye-close.svg";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Harap isi email dan password");
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Berhasil", "Login berhasil!");
        router.replace("/(tabs)/home");
      } else {
        Alert.alert("Error", result.error);
      }
    } catch {
      Alert.alert("Error", "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#E3F2FD", "#FFFFFF"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          showsVerticalScrollIndicator={false}
        >
          <Box px="$5">
            {/* Header */}
            <Box alignItems="center" mb="$10">
              <LinearGradient
                colors={["#2196F3", "#1976D2"]}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text fontSize="$5xl">🌤️</Text>
              </LinearGradient>

              <Text
                fontSize="$3xl"
                fontWeight="$bold"
                color="$primary600"
                mt="$5"
              >
                Selamat Datang
              </Text>
              <Text color="$coolGray500" mt="$1">
                Masuk ke akun Anda
              </Text>
            </Box>

            {/* Form */}
            <Box
              bg="$white"
              p="$6"
              rounded="$2xl"
              borderWidth={1}
              borderColor="$coolGray200"
            >
              {/* Email */}
              <Input
                bg="$coolGray100"
                rounded="$lg"
                borderColor="$coolGray200"
                mb="$5"
              >
                <InputField
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </Input>

              {/* Password */}
              <Box position="relative" mb="$6">
                <Input
                  bg="$coolGray100"
                  rounded="$lg"
                  borderColor="$coolGray200"
                >
                  <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                </Input>

                <Pressable
                  position="absolute"
                  right="$3"
                  top="50%"
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ transform: [{ translateY: -12 }] }}
                >
                  {showPassword ? (
                    <EyeOpen width={22} height={22} />
                  ) : (
                    <EyeClose width={22} height={22} />
                  )}
                </Pressable>
              </Box>

              {/* Login Button */}
              <Pressable
                onPress={handleLogin}
                disabled={loading}
                opacity={loading ? 0.6 : 1}
              >
                <LinearGradient
                  colors={["#2196F3", "#1976D2"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 56,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {loading ? (
                    <Spinner color="$white" />
                  ) : (
                    <Text color="$white" fontWeight="$bold">
                      MASUK
                    </Text>
                  )}
                </LinearGradient>
              </Pressable>

              {/* Register */}
              <Box
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                mt="$6"
              >
                <Text color="$coolGray500">Belum punya akun? </Text>
                <Pressable onPress={() => router.push("/register")}>
                  <Text color="$primary600" fontWeight="$bold">
                    Daftar Sekarang
                  </Text>
                </Pressable>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
