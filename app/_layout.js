
import React from "react";
import { Stack } from "expo-router";
import {
  ThemeProvider,
  useTheme,
} from "../context/ThemeContext";

function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="home" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="favorites" />
      <Stack.Screen name="reminders" />
      <Stack.Screen name="meditation/[id]" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
