import "../global.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="index"
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="characters"
        />
      </Stack>
    </QueryClientProvider>
  );
}
