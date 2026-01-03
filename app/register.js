// app/register.js

import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  InputField,
  Pressable,
  ScrollView,
  Spinner,
} from "@gluestack-ui/themed";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Services
import { registerUser } from "../services/authService";

// Icons
import EyeOpen from "../assets/eye-open.svg";
import EyeClose from "../assets/eye-close.svg";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Harap lengkapi semua data");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password minimal 6 karakter");
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(email, password, name);
      if (result.success) {
        Alert.alert("Sukses", "Registrasi berhasil! Silakan login.", [
          { text: "OK", onPress: () => router.replace("/login") },
        ]);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch {
      Alert.alert("Error", "Terjadi kesalahan saat registrasi");
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
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingVertical: 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Box mb="$10">
            <Box height={110} mb="$5" />

            <Text
              fontSize="$3xl"
              fontWeight="$bold"
              color="$primary600"
              mb="$1"
            >
              Buat Akun Baru
            </Text>
            <Text color="$coolGray500">Daftarkan diri Anda untuk mulai</Text>
          </Box>

          {/* Form */}
          <Box
            bg="$white"
            p="$6"
            rounded="$2xl"
            borderWidth={1}
            borderColor="$coolGray200"
          >
            {/* Nama */}
            <Input
              bg="$coolGray100"
              rounded="$lg"
              borderColor="$coolGray200"
              mb="$5"
            >
              <InputField
                placeholder="Nama Lengkap"
                value={name}
                onChangeText={setName}
              />
            </Input>

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
            <Box position="relative" mb="$5">
              <Input bg="$coolGray100" rounded="$lg" borderColor="$coolGray200">
                <InputField
                  placeholder="Password (minimal 6 karakter)"
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

            {/* Konfirmasi Password */}
            <Input
              bg="$coolGray100"
              rounded="$lg"
              borderColor="$coolGray200"
              mb="$6"
            >
              <InputField
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
            </Input>

            {/* Register Button */}
            <Pressable
              onPress={handleRegister}
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
                    DAFTAR
                  </Text>
                )}
              </LinearGradient>
            </Pressable>

            {/* Login */}
            <Box
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              mt="$6"
            >
              <Text color="$coolGray500">Sudah punya akun? </Text>
              <Pressable onPress={() => router.replace("/login")}>
                <Text color="$primary600" fontWeight="$bold">
                  Masuk Sekarang
                </Text>
              </Pressable>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
