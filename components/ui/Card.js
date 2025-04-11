// src/components/ui/Card.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 📦 Reusable Card component for UI blocks
export default function Card({ title, icon = "cube", color = "#2196F3", children }) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <View style={styles.header}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[styles.title, { color }]}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#1E1E1E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  content: {
    marginTop: 5,
  },
});
