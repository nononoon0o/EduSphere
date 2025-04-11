// src/components/ui/Inventory.js

import React from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGameStore } from "../../store/useGameStore";

export default function Inventory() {
  const { inventory, animations } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Inventory</Text>
      {inventory.length === 0 ? (
        <Text style={styles.emptyText}>No items in inventory.</Text>
      ) : (
        <ScrollView>
          {inventory.map((item, index) => {
            const animation = animations[item] || new Animated.Value(1);
            return (
              <Animated.View
                key={`${item}-${index}`}
                style={[styles.item, { transform: [{ scale: animation }] }]}
              >
                <Ionicons name="cube" size={20} color="#00BCD4" />
                <Text style={styles.itemText}>{item}</Text>
              </Animated.View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 12,
    color: "#FFF",
  },
});
