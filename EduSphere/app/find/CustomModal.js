import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

const CustomModal = ({ visible, onClose, onConfirm, idText }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide" // fade
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            <Text style={styles.idText}>{idText}</Text>으로
          </Text>
          <Text style={styles.modalText}>인증번호가 전송되었습니다.</Text>
          <Pressable
            onPress={() => {
              onConfirm();
            }}
            style={[styles.button, { marginBottom: 10 }]}
          >
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 20,
  },
  modalText: {
    marginBottom: 20,
    color: "white",
  },
  idText: {
    color: "#0097FB",
  },
  button: {
    backgroundColor: "#094771",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default CustomModal;
