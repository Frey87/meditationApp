
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Login Error", "Please fill in all fields.");
      return;
    }

    try {
      const saved = await AsyncStorage.getItem("registeredUser");
      const user = saved ? JSON.parse(saved) : null;

      if (
        !user ||
        user.email !== email.trim().toLowerCase() ||
        password !== "Demo12345!"
      ) {
        Alert.alert("Login Error", "Invalid email or password.");
        return;
      }

      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/home");
    } catch {
      Alert.alert("Error", "Unable to log in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Mindful Moments</Text>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>
        Continue your mindfulness journey.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={styles.footer}>
        Don't have an account?{" "}
        <Link href="/signup" style={styles.link}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
    backgroundColor: "#F2F5F0",
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    color: "#293D34",
    textAlign: "center",
    marginBottom: 35,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#293D34",
  },
  subtitle: {
    color: "#607168",
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8E1DA",
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#B64F2C",
    borderRadius: 12,
    padding: 17,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    marginTop: 28,
    color: "#607168",
  },
  link: {
    color: "#B64F2C",
    fontWeight: "700",
  },
});
