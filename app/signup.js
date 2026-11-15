
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignupScreen() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!userName.trim() || !normalizedEmail || !password) {
      Alert.alert("Registration Error", "Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert("Registration Error", "Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Registration Error",
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== "Demo12345!") {
      Alert.alert(
        "Demo Registration",
        "Use the demo password: Demo12345!"
      );
      return;
    }

    try {
      await AsyncStorage.setItem(
        "registeredUser",
        JSON.stringify({
          userName: userName.trim(),
          email: normalizedEmail,
        })
      );

      Alert.alert("Success", "Account created successfully.");
      router.replace("/login");
    } catch {
      Alert.alert("Error", "Unable to create account.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>Mindful Moments</Text>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Begin your mindfulness journey.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />

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

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Link href="/login" style={styles.link}>
          Login
        </Link>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
