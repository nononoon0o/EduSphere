// components/ThemedText.js
import React from "react";
import { Text, useColorScheme, StyleSheet } from "react-native";

export const ThemedText = ({ style, children }) => {
  const theme = useColorScheme();

  return (
    <Text style={[styles.text, theme === "dark" ? styles.dark : styles.light, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: "500",
  },
  dark: {
    color: "#ffffff",
  },
  light: {
    color: "#000000",
  },
});
