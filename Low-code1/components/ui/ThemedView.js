// components/ui/ThemedView.js

import React from "react";
import { View, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";

export function ThemedView({ style, ...props }) {
  const theme = useColorScheme();
  const themedStyle = [style, theme === "dark" ? styles.dark : styles.light];

  return <View style={themedStyle} {...props} />;
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: "#000",
  },
  light: {
    backgroundColor: "#fff",
  },
});
