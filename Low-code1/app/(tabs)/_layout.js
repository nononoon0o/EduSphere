// app/(tabs)/_layout.js
import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarStyle: { display: 'none' }, // 👈 Hide tab bar on HomeScreen
        }}
      />

      <Tabs.Screen
        name="MenuScreen"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Feather name="grid" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="SearchScreen"
        options={{
          title: 'Search',
          tabBarStyle: { display: 'none' }, // 👈 Hide tab bar on SearchScreen
        }}
      />

      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
