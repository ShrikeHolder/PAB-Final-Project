import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

// Screens
import Home from "./home";
import Search from "./search";
import Saved from "./saved";
import Profile from "./profile";

// Icons
import HomeIcon from "../assets/home.svg";
import SearchIcon from "../assets/search.svg";
import SavedIcon from "../assets/saved.svg";
import ProfileIcon from "../assets/profile.svg";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.main}>
          {page === "search" && <Search />}
          {page === "saved" && <Saved />}
          {page === "profile" && <Profile />}
          {page === "home" && <Home navigation={setPage} />}
        </View>

        <SafeAreaView style={styles.nav} edges={["bottom"]}>
          <TouchableOpacity
            onPress={() => setPage("home")}
            style={[styles.navBtn, page === "home" && styles.navActive]}
          >
            <HomeIcon
              width={28}
              height={28}
              fill={page === "home" ? "#2f80ed" : "#666"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPage("search")}
            style={[styles.navBtn, page === "search" && styles.navActive]}
          >
            <SearchIcon
              width={28}
              height={28}
              fill={page === "search" ? "#2f80ed" : "#666"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPage("saved")}
            style={[styles.navBtn, page === "saved" && styles.navActive]}
          >
            <SavedIcon
              width={28}
              height={28}
              fill={page === "saved" ? "#2f80ed" : "#666"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPage("profile")}
            style={[styles.navBtn, page === "profile" && styles.navActive]}
          >
            <ProfileIcon
              width={28}
              height={28}
              fill={page === "profile" ? "#2f80ed" : "#666"}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    width: "100%",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  nav: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  navBtn: {
    flex: 1,
    alignItems: "center",
    padding: 12,
  },
  navActive: {
    backgroundColor: "#eef6ff",
  },
  navText: {
    color: "#666",
  },
  navTextActive: {
    color: "#2f80ed",
    fontWeight: "700",
  },
});
