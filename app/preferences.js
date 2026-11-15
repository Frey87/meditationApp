
import React from "react";
import {
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "../context/ThemeContext";

export default function PreferencesScreen() {
  const router = useRouter();
  const { theme, colors, changeTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Pressable onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={colors.text}
        />
      </Pressable>

      <Text style={[styles.heading, { color: colors.text }]}>
        Preferences
      </Text>

      <Text style={[styles.description, { color: colors.secondary }]}>
        Customize your meditation experience.
      </Text>

      <View
        style={[
          styles.settingCard,
          { backgroundColor: colors.surface },
        ]}
      >
        <MaterialCommunityIcons
          name={isDark ? "weather-night" : "weather-sunny"}
          size={28}
          color={colors.accent}
        />

        <View style={styles.settingText}>
          <Text style={[styles.title, { color: colors.text }]}>
            Dark Mode
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondary },
            ]}
          >
            {isDark ? "Dark theme enabled" : "Light theme enabled"}
          </Text>
        </View>

        <Switch
          value={isDark}
          onValueChange={(enabled) =>
            changeTheme(enabled ? "dark" : "light")
          }
          trackColor={{
            false: "#C1D0C6",
            true: "#607168",
          }}
          thumbColor={isDark ? "#E28A68" : "#FFFFFF"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 65,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 28,
  },
  description: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 30,
  },
  settingCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 16,
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 5,
  },
});
