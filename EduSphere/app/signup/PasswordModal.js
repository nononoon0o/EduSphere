import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";

const Passwordmodal = ({ visible, onConfirm, onCancel }) => (
  <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.modalCard}>
        <Text style={styles.modalTitle}>⚠️ 보안 경고</Text>
        <Text style={styles.modalText}>
          이 비밀번호는 보안에 취약할 수 있습니다.
        </Text>
        <Text style={styles.modalSmallText}>해당 비밀번호를 사용하시겠습니까?</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>아니요</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
            <Text style={styles.buttonText}>예</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: Platform.OS === "android" ? 8 : 0,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSmallText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#2563EB", // Blue
  },
  cancelButton: {
    backgroundColor: "#E5E7EB", // Gray
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});

export default Passwordmodal;
