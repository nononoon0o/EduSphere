import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

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
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>아니오</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onConfirm}>
              <Text style={styles.buttonText}>예</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BackPressModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 320,
    backgroundColor: "#1F2937", // dark gray
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  message: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  subText: {
    color: "#D1D5DB",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
  },
  highlight: {
    color: "#3B82F6", // blue
    fontWeight: "600",
  },
  bold: {
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#2563EB",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6B7280", // gray
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
