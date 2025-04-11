import { View, Animated, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useState, useEffect } from "react";
import { useGameStore } from "../../store";

export default function Player() {
  const [positionX, setPositionX] = useState(new Animated.Value(50));
  const [positionY, setPositionY] = useState(new Animated.Value(300));
  const gravity = 3;
  const jumpHeight = -60;

  const { inventory } = useGameStore();

  useEffect(() => {
    let interval = setInterval(() => {
      Animated.timing(positionY, {
        toValue: positionY.__getValue() + gravity,
        duration: 50,
        useNativeDriver: false,
      }).start();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const moveLeft = () => {
    Animated.timing(positionX, {
      toValue: positionX.__getValue() - 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const moveRight = () => {
    Animated.timing(positionX, {
      toValue: positionX.__getValue() + 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const jump = () => {
    Animated.timing(positionY, {
      toValue: positionY.__getValue() + jumpHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👾 Player Screen</Text>
      <Animated.View
        style={[
          styles.player,
          { transform: [{ translateX: positionX }, { translateY: positionY }] },
        ]}
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={moveLeft} style={styles.button}>
          <Text style={styles.buttonText}>⬅</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={jump} style={styles.button}>
          <Text style={styles.buttonText}>⬆</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveRight} style={styles.button}>
          <Text style={styles.buttonText}>➡</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.inventoryText}>Inventory: {inventory.join(", ")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f0" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  player: { width: 50, height: 50, backgroundColor: "blue", borderRadius: 10 },
  controls: { flexDirection: "row", marginTop: 30 },
  button: { backgroundColor: "#3498db", padding: 15, margin: 10, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 20 },
  inventoryText: { marginTop: 20, fontSize: 16, fontWeight: "bold" },
});