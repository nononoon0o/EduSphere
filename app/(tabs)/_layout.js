import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TAB_ICONS = {
  MenuScreen: 'grid-outline',
  SearchScreen: 'search-outline',
  ProfileScreen: 'person-outline',
};

const TAB_LABELS = {
  MenuScreen: 'Menu',
  SearchScreen: 'Search',
  ProfileScreen: 'Profile',
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const iconName = TAB_ICONS[route.name] || 'alert-circle-outline';
        const label = TAB_LABELS[route.name] || route.name;

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabel: label,
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
        };
      }}
    >
      <Tabs.Screen name="MenuScreen" />
      <Tabs.Screen name="SearchScreen" />
      <Tabs.Screen name="ProfileScreen" />
    </Tabs>
  );
}
