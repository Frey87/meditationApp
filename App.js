
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.logoContainer}>
          <MaterialCommunityIcons
              name="meditation"
              size={64}
              color="#FFFFFF"
          />
      </View>

      <Text style={styles.title}>
        Mindful Moments
      </Text>

      <Text style={styles.subtitle}>
        Your journey to mindfulness begins here.
      </Text>

      <Text style={styles.description}>
        Relax your mind, find your balance,
        and make every moment count.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  icon: {
    fontSize: 65,
    marginBottom: 25
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#293D34",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 18,
    color: "#607168",
    textAlign: "center",
    marginTop: 16
  },
  description: {
    fontSize: 15,
    color: "#607168",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 25
  },
  logoContainer: {
  width: 110,
  height: 110,
  borderRadius: 55,
  backgroundColor: "#293D34",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 25
  },

});
