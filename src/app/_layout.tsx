import { Stack } from "expo-router";

import { AppThemeProvider } from "@/providers/theme-provider";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <Stack />
    </AppThemeProvider>
  );
}
