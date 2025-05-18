// app/chapters/_layout.js
import { Stack } from 'expo-router';

export default function ChapterLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
        contentStyle: {
          backgroundColor: '#f4f6f8',
        },
      }}
    >
      {/* Child screens will be automatically injected here by expo-router */}
    </Stack>
  );
}
