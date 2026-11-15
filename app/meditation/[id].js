import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { meditations } from "../../constants/meditations";

export default function MeditationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();


const [isFavorite, setIsFavorite] = useState(false);

useEffect(() => {
  let active = true;

  async function loadFavorite() {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      const ids = stored ? JSON.parse(stored) : [];
      if (active) setIsFavorite(ids.includes(id));
    } catch (error) {
      console.log("Favorite loading error:", error);
    }
  }

  loadFavorite();
  return () => { active = false; };
}, [id]);

const toggleFavorite = async () => {
  try {
    const stored = await AsyncStorage.getItem("favorites");
    const ids = stored ? JSON.parse(stored) : [];

    const updated = ids.includes(id)
      ? ids.filter((item) => item !== id)
      : [...ids, id];

    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(updated.includes(id));
  } catch (error) {
    console.log("Favorite saving error:", error);
  }
};


  const meditation = meditations.find((item) => item.id === id);

  if (!meditation) {
    return (
      <View style={styles.container}>
        <Text>Meditation not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    );
  }

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

      <View style={styles.hero}>
        <MaterialCommunityIcons
          name={meditation.icon}
          size={85}
          color="#293D34"
        />
      </View>

        <Pressable
        onPress={toggleFavorite}
        style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "flex-start",
            marginBottom: 20
        }}
        >
        <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color="#B64F2C"
        />
        <Text style={{ marginLeft: 10, color: "#293D34" }}>
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Text>
        </Pressable>

      <Text style={styles.category}>{meditation.category}</Text>
      <Text style={styles.title}>{meditation.title}</Text>

      <Text style={styles.duration}>
        <MaterialCommunityIcons
          name="clock-outline"
          size={17}
          color="#607168"
        />{" "}
        {meditation.duration} minutes
      </Text>

      <Text style={styles.heading}>About this meditation</Text>
      <Text style={styles.description}>
        {meditation.description}
      </Text>

      <Text style={styles.note}>
        Find a comfortable position, relax your shoulders,
        and bring your attention to the present moment.
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
    padding: 24,
    paddingTop: 65,
  },
  hero: {
    height: 220,
    backgroundColor: "#E5EEE8",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 28,
  },
  category: {
    color: "#B64F2C",
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#293D34",
    marginTop: 10,
  },
  duration: {
    color: "#607168",
    marginTop: 15,
    fontSize: 15,
  },
  heading: {
    fontSize: 21,
    fontWeight: "700",
    color: "#293D34",
    marginTop: 35,
  },
  description: {
    color: "#607168",
    fontSize: 16,
    lineHeight: 25,
    marginTop: 15,
  },
  note: {
    backgroundColor: "#E5EEE8",
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    color: "#293D34",
    lineHeight: 24,
  },
});
