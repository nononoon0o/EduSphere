import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

const BackPressModal = ({ visible, onClose, onConfirm, onText }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide" // fade
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{onText}를 중단하고</Text>
          <Text style={styles.modalText}>
            <Text style={styles.highlight}>종료</Text> 하시겠습니까?
          </Text>
          <Text style={styles.modalsubText}>
            {" "}
            입력된 내용들은 초기화됩니다.
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={onClose}
              style={[styles.button, { backgroundColor: "#7F7F7F" }]}
            >
              <Text style={styles.buttonText}>아니오</Text>
            </Pressable>
            <Pressable onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>예</Text>
            </Pressable>
          </View>
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
  modalsubText: {
    marginBottom: 10,
    color: "white",
    fontSize: 10,
    paddingBottom: 15,
  },
  highlight: {
    color: "#2196F3",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 10,
    color: "white",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: 10,
    backgroundColor: "#094771",
    borderRadius: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
});

export default BackPressModal;
