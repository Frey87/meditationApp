
import React, { useCallback, useState } from "react";
import {
  View, Text, FlatList, Pressable, StyleSheet
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { meditations } from "../constants/meditations";

export default function FavoritesScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadFavorites() {
        try {
          const stored = await AsyncStorage.getItem("favorites");
          if (active) setFavorites(stored ? JSON.parse(stored) : []);
        } catch (error) {
          console.log("Favorites loading error:", error);
        }
      }

      loadFavorites();
      return () => { active = false; };
    }, [])
  );

  const removeFavorite = async (id) => {
    try {
      const updated = favorites.filter((item) => item !== id);
      await AsyncStorage.setItem("favorites", JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.log("Favorites saving error:", error);
    }
  };

  const selected = meditations.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color="#293D34"
        />
      </Pressable>

      <Text style={styles.title}>My Favorites</Text>

      <FlatList
        data={selected}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No favorite meditations yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              style={{ flex: 1 }}
              onPress={() => router.push(`/meditation/${item.id}`)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.subtitle}>
                {item.category} · {item.duration} min
              </Text>
            </Pressable>

            <Pressable onPress={() => removeFavorite(item.id)}>
              <MaterialCommunityIcons
                name="heart"
                size={28}
                color="#B64F2C"
              />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 65,
    backgroundColor: "#F2F5F0"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#293D34",
    marginVertical: 25
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5EEE8",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#293D34"
  },
  subtitle: {
    color: "#607168",
    marginTop: 6
  },
  empty: {
    textAlign: "center",
    marginTop: 60,
    color: "#607168",
    fontSize: 16
  }
});
