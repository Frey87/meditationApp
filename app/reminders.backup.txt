
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleDailyReminder,
  cancelDailyReminder,
  sendTestNotification,
} from "../services/notifications";
import { useTheme } from "../context/ThemeContext";

const STORAGE_KEY = "meditationReminders";

export default function RemindersScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const [enabled, setEnabled] = useState(false);
  const [time, setTime] = useState(() => {
    const date = new Date();
    date.setHours(8, 0, 0, 0);
    return date;
  });
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const settings = JSON.parse(stored);
          const date = new Date();
          date.setHours(settings.hour ?? 8, settings.minute ?? 0, 0, 0);
          setTime(date);
          setEnabled(Boolean(settings.enabled));
        }
      } catch (error) {
        console.log("Reminder loading error:", error);
      } finally {
        setLoaded(true);
      }
    }

    loadSettings();
  }, []);

  const saveSettings = async (nextEnabled, nextTime) => {
    setBusy(true);

    try {
      if (nextEnabled) {
        await scheduleDailyReminder(
          nextTime.getHours(),
          nextTime.getMinutes()
        );
      } else {
        await cancelDailyReminder();
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          enabled: nextEnabled,
          hour: nextTime.getHours(),
          minute: nextTime.getMinutes(),
        })
      );

      setEnabled(nextEnabled);
      setTime(nextTime);

      Alert.alert(
        "Saved",
        nextEnabled
          ? "Your daily reminder is scheduled."
          : "Daily reminders are disabled."
      );
    } catch (error) {
      Alert.alert(
        "Notification Error",
        error.message || "Unable to save reminder."
      );
    } finally {
      setBusy(false);
    }
  };

  const handleTest = async () => {
    setBusy(true);

    try {
      await sendTestNotification();
      Alert.alert(
        "Test Scheduled",
        "A notification should arrive in approximately 5 seconds."
      );
    } catch (error) {
      Alert.alert("Notification Error", error.message);
    } finally {
      setBusy(false);
    }
  };

  if (!loaded) {
    return (
      <View style={[styles.container, {
        backgroundColor: colors.background,
        justifyContent: "center",
      }]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[
      styles.container,
      { backgroundColor: colors.background },
    ]}>
      <Pressable onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={colors.text}
        />
      </Pressable>

      <Text style={[styles.heading, { color: colors.text }]}>
        Daily Reminders
      </Text>

      <Text style={[styles.description, {
        color: colors.secondary,
      }]}>
        Make mindfulness part of your daily routine.
      </Text>

      <View style={[
        styles.card,
        { backgroundColor: colors.surface },
      ]}>
        <MaterialCommunityIcons
          name="bell-outline"
          size={28}
          color={colors.accent}
        />

        <View style={styles.settingText}>
          <Text style={[styles.label, { color: colors.text }]}>
            Enable Reminders
          </Text>
          <Text style={{ color: colors.secondary }}>
            Receive a daily notification
          </Text>
        </View>

        <Switch
          value={enabled}
          disabled={busy}
          onValueChange={(value) => saveSettings(value, time)}
        />
      </View>

      <View style={[
        styles.card,
        { backgroundColor: colors.surface },
      ]}>
        <View style={styles.timeSection}>
          <Text style={[styles.label, { color: colors.text }]}>
            Reminder Time
          </Text>

          <DateTimePicker
            value={time}
            mode="time"
            display={Platform.OS === "ios" ? "compact" : "default"}
            onChange={(event, selectedTime) => {
              if (event.type === "dismissed" || !selectedTime) return;
              setTime(selectedTime);
            }}
          />
        </View>
      </View>

      <Pressable
        style={[styles.button, busy && { opacity: 0.5 }]}
        disabled={busy}
        onPress={() => saveSettings(enabled, time)}
      >
        <Text style={styles.buttonText}>
          Save Reminder
        </Text>
      </Pressable>

      <Pressable
        style={[styles.testButton, busy && { opacity: 0.5 }]}
        disabled={busy}
        onPress={handleTest}
      >
        <Text style={styles.testButtonText}>
          Send Test Notification
        </Text>
      </Pressable>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  settingText: {
    flex: 1,
    marginLeft: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  timeSection: {
    flex: 1,
    gap: 12,
  },
  button: {
    backgroundColor: "#B64F2C",
    borderRadius: 12,
    padding: 17,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  testButton: {
    borderWidth: 1,
    borderColor: "#B64F2C",
    borderRadius: 12,
    padding: 17,
    alignItems: "center",
    marginTop: 15,
  },
  testButtonText: {
    color: "#B64F2C",
    fontWeight: "700",
  },
});
