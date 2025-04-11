import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const TAB_ICONS = {
  MenuScreen: 'grid-outline',
  SearchScreen: 'search-outline',
  ProfileScreen: 'person-outline',
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="MenuScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          const iconName = TAB_ICONS[route.name] || 'alert-circle-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 8,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 6,
          elevation: 5,
        },
      })}
    >
      <Tabs.Screen name="MenuScreen" />
      <Tabs.Screen name="SearchScreen" />
      <Tabs.Screen name="ProfileScreen" />
    </Tabs>
  );
}
