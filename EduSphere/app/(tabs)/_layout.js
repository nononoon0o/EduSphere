// app/(tabs)/_layout.js
import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import CustomHeader from '../../components/header/Header';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // par défaut, pas de header
      }}
    >
      {/* HomeScreen */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          tabBarStyle: { display: 'none' }, // 👈 ici c'est correct, on cache tab bar
        }}
      />

      {/* SearchScreen */}
      <Tabs.Screen
        name="SearchScreen"
        options={{
          headerShown: true, // pas de header
          header: () => <CustomHeader />,
          tabBarStyle: { display: 'none' }, // cache aussi la tab bar
        }}
      />

      {/* ProfileScreen */}
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}
