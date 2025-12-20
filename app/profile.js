import { View, Text, StyleSheet, Button } from "react-native";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Button title="Go to Login" onPress={() => router.push("/login")} />

      <Button title="Go to Register" onPress={() => router.push("/register")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
