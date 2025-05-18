import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Passwordmodal = ({ visible, onConfirm, onCancel }) => (
  <Modal visible={visible} transparent animationType="slide">
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>
          이 비밀번호는 보안에 취약할 수 있습니다.
        </Text>
        <Text style = {styles.modalSmallText}>해당 비밀번호를 사용하시겠습니까?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
            <Text style={styles.buttonText}>예</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>아니요</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

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
    fontSize: 16,
    textAlign: "center",
  },
  modalSmallText:{
    marginBottom: 20,
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#094771",
  },
  cancelButton: {
    backgroundColor: "#7F7F7F",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Passwordmodal;
