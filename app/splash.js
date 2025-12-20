// app/splash.js
import { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace("/(main)/home");
        } else {
          router.replace("/(auth)/login");
        }
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Angin Nusantara</Text>
      <Text style={styles.subtitle}>Aplikasi Cuaca Indonesia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a73e8",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
  },
});