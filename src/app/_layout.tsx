import { DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="add-expense" options={{ title: "Add Expense" }} />

        <Stack.Screen name="history" options={{ title: "History" }} />

        <Stack.Screen name="explore" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
