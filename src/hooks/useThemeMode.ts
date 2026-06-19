// hooks/useThemeMode.ts
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ThemeMode = "light" | "dark" | "system";

const STORAGE_KEY = "theme-mode";

export function useThemeMode() {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === "light" || value === "dark" || value === "system") {
        setModeState(value);
      }
    });
  }, []);

  const setMode = async (nextMode: ThemeMode) => {
    setModeState(nextMode);
    await AsyncStorage.setItem(STORAGE_KEY, nextMode);
  };

  const colorScheme = mode === "system" ? (systemScheme ?? "light") : mode;
  const isDark = colorScheme === "dark";

  return {
    mode,
    setMode,
    colorScheme,
    isDark,
  };
}
