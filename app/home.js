import DailyQuotes from "../components/DailyQuotes";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { meditations } from "../constants/meditations";


export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState("Friend");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const saved = await AsyncStorage.getItem("registeredUser");
        if (saved) {
          const user = JSON.parse(saved);
          setUserName(user.userName || "Friend");
        }
      } catch (error) {
        console.log("Unable to load user:", error);
      }
    };

    loadUser();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {userName}!</Text>
          <Text style={styles.subtitle}>
            Take a moment for yourself today.
          </Text>
        </View>

            <Pressable
            style={styles.logo}
            onPress={() => router.push("/settings")}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            >
            <MaterialCommunityIcons
                name="cog-outline"
                size={30}
                color="#FFFFFF"
            />
            </Pressable>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>DAILY MEDITATION</Text>
        <Text style={styles.bannerTitle}>Find Your Inner Peace</Text>
        <Text style={styles.bannerDescription}>
          Breathe deeply, slow down, and reconnect with yourself.
        </Text>

        <Pressable
          style={styles.startButton}
          onPress={() => router.push("/meditation/1")}
        >
          <Text style={styles.startButtonText}>Start Meditation</Text>
        </Pressable>
      </View>

        <Pressable
        onPress={() => router.push("/favorites")}
        style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 24
        }}
        >
        <MaterialCommunityIcons
            name="heart"
            size={23}
            color="#B64F2C"
        />
        <Text
            style={{
            marginLeft: 10,
            color: "#293D34",
            fontSize: 16,
            fontWeight: "700"
            }}
        >
            My Favorite Meditations
        </Text>
        </Pressable>

        <DailyQuotes />

      <Text style={styles.sectionTitle}>Popular Meditations</Text>

      {meditations.map((item) => (
        <Pressable
          key={item.id}
          style={[styles.card, { backgroundColor: item.color }]}
          onPress={() => router.push(`/meditation/${item.id}`)}
        >
          <View style={styles.cardIcon}>
            <MaterialCommunityIcons
              name={item.icon}
              size={30}
              color="#293D34"
            />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardDuration}>
              {item.duration} min
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            color="#293D34"
          />
        </Pressable>
      ))}

      <Text style={styles.footer}>
        Every mindful moment matters.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F0",
  },
  content: {
    padding: 22,
    paddingTop: 65,
    paddingBottom: 45,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "700",
    color: "#293D34",
  },
  subtitle: {
    fontSize: 14,
    color: "#607168",
    marginTop: 8,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#293D34",
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    backgroundColor: "#293D34",
    borderRadius: 22,
    padding: 25,
    marginBottom: 32,
  },
  bannerLabel: {
    color: "#BFD4C5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 12,
  },
  bannerDescription: {
    color: "#E5EEE8",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 12,
  },
  startButton: {
    backgroundColor: "#B64F2C",
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 22,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#293D34",
    marginBottom: 18,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
  },
  cardIcon: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#293D34",
  },
  cardCategory: {
    color: "#607168",
    fontSize: 13,
    marginTop: 4,
  },
  cardDuration: {
    color: "#B64F2C",
    fontWeight: "600",
    marginTop: 6,
  },
  footer: {
    textAlign: "center",
    color: "#607168",
    marginTop: 20,
  },
});
