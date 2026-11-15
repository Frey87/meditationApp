
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("meditation", {
      name: "Meditation Reminders",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const existing = await Notifications.getPermissionsAsync();

  if (existing.granted) return true;

  const requested = await Notifications.requestPermissionsAsync();

  return requested.granted;
}

export async function scheduleDailyReminder(hour, minute) {
  const permitted = await requestNotificationPermission();

  if (!permitted) {
    throw new Error("Notification permission was not granted.");
  }

  await Notifications.cancelAllScheduledNotificationsAsync();

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Mindful Moments 🧘",
      body: "Take a moment to relax and meditate.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      ...(Platform.OS === "android"
        ? { channelId: "meditation" }
        : {}),
    },
  });
}

export async function cancelDailyReminder() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function sendTestNotification() {
  const permitted = await requestNotificationPermission();

  if (!permitted) {
    throw new Error("Notification permission was not granted.");
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: "Mindful Moments",
      body: "This is your test meditation reminder.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
      ...(Platform.OS === "android"
        ? { channelId: "meditation" }
        : {}),
    },
  });
}
