
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext(null);

export const colors = {
  light: {
    background: "#F2F5F0",
    surface: "#FFFFFF",
    text: "#293D34",
    secondary: "#607168",
    accent: "#B64F2C",
    soft: "#E5EEE8",
  },
  dark: {
    background: "#17241E",
    surface: "#293D34",
    text: "#FFFFFF",
    secondary: "#C1D0C6",
    accent: "#E28A68",
    soft: "#34483D",
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      try {
        const stored = await AsyncStorage.getItem("appTheme");
        if (stored === "dark" || stored === "light") {
          setTheme(stored);
        }
      } catch (error) {
        console.log("Theme loading error:", error);
      } finally {
        setReady(true);
      }
    }

    loadTheme();
  }, []);

  const changeTheme = async (nextTheme) => {
    if (nextTheme !== "light" && nextTheme !== "dark") return;

    try {
      await AsyncStorage.setItem("appTheme", nextTheme);
      setTheme(nextTheme);
    } catch (error) {
      console.log("Theme saving error:", error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: colors[theme],
        changeTheme,
        ready,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
