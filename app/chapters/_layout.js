// app/chapters/_layout.js
import { Stack } from 'expo-router';

export default function ChapterLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'slide_from_right',
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: '#f4f6f8',
          headerBackTitle: 'Back', // optional label
          headerShown: true,
        },
      }}
    >
      {/* Optionally add initialRouteName or screen-specific config here */}
    </Stack>
  );
}
