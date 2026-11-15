
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSitemap } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const router = useRouter();

  const sitemap = useSitemap();

    useEffect(() => {
  console.log(
    "REGISTERED ROUTES:",
    JSON.stringify(sitemap, null, 2)
  );
}, [sitemap]);

  const [userName, setUserName] = useState("Friend");

  useEffect(() => {
    async function loadProfile() {
      try {
        const stored = await AsyncStorage.getItem("registeredUser");
        if (stored) {
          const user = JSON.parse(stored);
          setUserName(user.userName || "Friend");
        }
      } catch (error) {
        console.log("Profile loading error:", error);
      }
    }

    loadProfile();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("isLoggedIn");
              router.replace("/login");
            } catch {
              Alert.alert("Error", "Unable to log out.");
            }
          },
        },
      ]
    );
  };

  const MenuItem = ({ icon, title, description, onPress }) => (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color="#293D34"
        />
      </View>

      <View style={styles.menuText}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={25}
        color="#607168"
      />
    </Pressable>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color="#293D34"
        />
      </Pressable>

      <Text style={styles.heading}>Settings</Text>

      <View style={styles.profile}>
        <MaterialCommunityIcons
          name="account-circle"
          size={55}
          color="#293D34"
        />
        <View>
          <Text style={styles.welcome}>Hello, {userName}!</Text>
          <Text style={styles.subtitle}>
            Personalize your mindfulness journey.
          </Text>
        </View>
      </View>

      <MenuItem
        icon="palette-outline"
        title="Preferences"
        description="Appearance and theme settings"
        onPress={() => router.push("/preferences")}
      />

      <MenuItem
        icon="heart-outline"
        title="My Favorites"
        description="Your saved meditation exercises"
        onPress={() => router.push("/favorites")}
      />

      <MenuItem
        icon="bell-outline"
        title="Daily Reminders"
        description="Manage meditation notifications"
        onPress={() => router.push("/reminders")}
      />

      <MenuItem
        icon="logout"
        title="Logout"
        description="Sign out of your account"
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F0",
  },
  content: {
    padding: 24,
    paddingTop: 65,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#293D34",
    marginTop: 25,
    marginBottom: 25,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5EEE8",
    padding: 20,
    borderRadius: 18,
    marginBottom: 30,
    gap: 12,
  },
  welcome: {
    fontSize: 19,
    fontWeight: "700",
    color: "#293D34",
  },
  subtitle: {
    color: "#607168",
    fontSize: 12,
    marginTop: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 13,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#E5EEE8",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#293D34",
  },
  menuDescription: {
    fontSize: 12,
    color: "#607168",
    marginTop: 5,
  },
});
