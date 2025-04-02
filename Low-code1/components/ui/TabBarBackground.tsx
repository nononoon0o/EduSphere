// src/components/ui/TabBarBackground.tsx

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const TabBarBackground = () => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#1f1c2c", "#928dab"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
    </View>
  );
};

export default TabBarBackground;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: width,
    height: 85,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    zIndex: -1,
  },
  gradient: {
    flex: 1,
    opacity: 0.95,
  },
});
