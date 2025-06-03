import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

const BackPressModal = ({ visible, onClose, onConfirm, onText }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.message}>
            <Text style={styles.bold}>{onText}</Text>를 중단하고
          </Text>
          <Text style={styles.message}>
            <Text style={styles.highlight}>종료</Text> 하시겠습니까?
          </Text>
          <Text style={styles.subText}>입력된 내용은 초기화됩니다.</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>아니오</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>예</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BackPressModal;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.85,
    backgroundColor: "#1F2937", // dark background
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  message: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 6,
  },
  subText: {
    color: "#9CA3AF", // slate-400
    fontSize: 13,
    marginBottom: 24,
    textAlign: "center",
  },
  highlight: {
    color: "#3B82F6",
    fontWeight: "700",
  },
  bold: {
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 14,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    backgroundColor: "#2563EB", // blue
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#4B5563", // slate gray
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
