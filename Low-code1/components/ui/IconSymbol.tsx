// src/components/ui/IconSymbol.tsx

import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";

type IconSymbolProps = {
  symbol: string;
  number?: number;
  color?: string;
  size?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const IconSymbol: React.FC<IconSymbolProps> = ({
  symbol,
  number,
  color = "#4CAF50",
  size = 60,
  style,
  textStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    >
      {number !== undefined && (
        <Text style={[styles.atomicNumber, { fontSize: size * 0.25 }]}>{number}</Text>
      )}
      <Text style={[styles.symbol, { fontSize: size * 0.5 }, textStyle]}>{symbol}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  symbol: {
    color: "#fff",
    fontWeight: "bold",
  },
  atomicNumber: {
    position: "absolute",
    top: 4,
    left: 6,
    color: "#fff",
    fontWeight: "600",
  },
});

export default IconSymbol;
