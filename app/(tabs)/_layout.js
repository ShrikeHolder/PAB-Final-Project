// app/(tabs)/_layout.js

import { Tabs } from "expo-router";

// Icons
import HomeIcon from "../../assets/home.svg";
import StarIcon from "../../assets/star.svg";
import UserIcon from "../../assets/user.svg";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Tersimpan",
          tabBarIcon: ({ color }) => (
            <StarIcon width={24} height={24} fill={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <UserIcon width={24} height={24} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
