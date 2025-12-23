// app/_layout.js
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return null; // Atau tampilkan loading screen
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      <Stack 
        screenOptions={{ 
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: "slide_from_right",
          headerBackTitle: "Kembali"
        }}
      >
        {/* Splash Screen - No Header */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Angin Nusantara'
          }} 
        />
        
        {/* Login Screen - No Header */}
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: false,
            title: 'Login'
          }} 
        />
        
        {/* Register Screen - No Header */}
        <Stack.Screen 
          name="register" 
          options={{ 
            headerShown: false,
            title: 'Daftar'
          }} 
        />
        
        {/* Home Screen - No Header */}
        <Stack.Screen 
          name="home" 
          options={{ 
            headerShown: false,
            title: 'Beranda'
          }} 
        />
        
        {/* Saved Screen - With Header */}
        <Stack.Screen 
          name="saved" 
          options={{ 
            headerShown: true,
            title: 'Kota Tersimpan',
            headerBackTitleVisible: true
          }} 
        />
        
        {/* Profile Screen - With Header */}
        <Stack.Screen 
          name="profile" 
          options={{ 
            headerShown: true,
            title: 'Profil Pengguna',
            headerBackTitleVisible: true
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}