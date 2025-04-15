// src/components/ui/HapticTab.js

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export default function HapticTab({ title, onPress, style = {} }) {
  const handlePress = () => {
    Haptics.selectionAsync(); // Trigger haptic feedback
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity style={[styles.tab, style]} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#292929",
    borderRadius: 8,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
