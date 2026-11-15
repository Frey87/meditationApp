
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

export default function DailyQuotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://dummyjson.com/quotes/random"
      );

      if (!response.ok) {
        throw new Error("Unable to load quote");
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError("Could not load today's quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Inspiration</Text>

      {loading ? (
        <ActivityIndicator color="#B64F2C" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <>
          <Text style={styles.quote}>
            "{quote?.quote}"
          </Text>
          <Text style={styles.author}>
            — {quote?.author}
          </Text>
        </>
      )}

      <Pressable
        style={styles.button}
        onPress={fetchQuote}
        disabled={loading}
      >
        <Text style={styles.buttonText}>New Quote</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5EEE8",
    padding: 22,
    borderRadius: 18,
    marginBottom: 28,
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#293D34",
    marginBottom: 15,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#293D34",
    lineHeight: 25,
  },
  author: {
    fontSize: 14,
    color: "#607168",
    marginTop: 12,
    textAlign: "right",
  },
  error: {
    color: "#B64F2C",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#293D34",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 18,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
