import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNews } from "../context/newsContext";

const Profile = () => {
  const { savedArticles } = useNews();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const stats = [
    {
      icon: "bookmark",
      label: "Berita Tersimpan",
      value: savedArticles.length.toString(),
      color: "#AA0002",
    },
    {
      icon: "favorite",
      label: "Berita Disukai",
      value: "0",
      color: "#FF6B9D",
    },
    {
      icon: "visibility",
      label: "Berita Dibaca",
      value: "0",
      color: "#2F80ED",
    },
  ];

  const menuItems = [
    {
      icon: "notifications",
      label: "Notifikasi",
      value: "switch",
      enabled: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      icon: "settings",
      label: "Pengaturan",
      value: "arrow",
    },
    {
      icon: "help-outline",
      label: "Bantuan & Dukungan",
      value: "arrow",
    },
    {
      icon: "info",
      label: "Tentang Aplikasi",
      value: "arrow",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImage}>
          <MaterialIcons name="person" size={48} color="#fff" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Pembaca Berita</Text>
          <Text style={styles.profileEmail}>user@nusamedia.com</Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View
              style={[styles.statIconContainer, { backgroundColor: stat.color }]}
            >
              <MaterialIcons name={stat.icon} size={24} color="#fff" />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>Pengaturan</Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              index !== menuItems.length - 1 && styles.menuItemBorder,
            ]}
          >
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIcon}>
                <MaterialIcons name={item.icon} size={22} color="#AA0002" />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>

            {item.value === "switch" ? (
              <Switch
                value={item.enabled}
                onValueChange={item.onToggle}
                trackColor={{ false: "#ccc", true: "#AAA" }}
                thumbColor={item.enabled ? "#AA0002" : "#f4f3f4"}
              />
            ) : (
              <MaterialIcons name="chevron-right" size={24} color="#ccc" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Keluar dari Akun</Text>
      </TouchableOpacity>

      {/* Version Info */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Nusa Media v1.0.0</Text>
        <Text style={styles.copyrightText}>© 2024 Nusa Media. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#AA0002",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 6,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  statLabel: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    textAlign: "center",
  },
  menuContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#999",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    textTransform: "uppercase",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AA0002",
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
  versionContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 11,
    color: "#ccc",
  },
});

export default Profile;
