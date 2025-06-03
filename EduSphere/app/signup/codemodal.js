import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

const CodeModal = ({ visible, onClose, onConfirm, onText }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.titleText}>인증 완료</Text>
          <Text style={styles.modalText}>
            <Text style={styles.highlight}>{onText}</Text> 확인되었습니다.
          </Text>

          <Pressable onPress={onConfirm} style={styles.button}>
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#1F2937", // Dark Gray
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 15,
    color: "#D1D5DB",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  highlight: {
    color: "#60A5FA", // light blue
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#2563EB", // vibrant blue
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 8,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CodeModal;
