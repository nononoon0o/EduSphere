import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InventoryScreen } from '../(tabs)/tabs/InventoryScreen';
import { GameScreen } from '../(tabs)/tabs/GameScreen';
import { Chapter1_01 } from '../../app/chapters/Chapter1/Chapter1_01';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Chapter1_01">
      <Stack.Screen name="Chapter1_01" component={Chapter1_01} options={{ title: '물질 변화와 화학 반응식' }} />
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Game' }} />
      <Stack.Screen name="InventoryScreen" component={InventoryScreen} options={{ title: 'Inventory' }} />
    </Stack.Navigator>
  );
}
