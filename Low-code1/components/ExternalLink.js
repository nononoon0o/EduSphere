// components/ExternalLink.js

import React from "react";
import { Linking, Text, StyleSheet, TouchableOpacity } from "react-native";

export function ExternalLink({ url, children }) {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Text style={styles.link}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "#3498db",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
});
