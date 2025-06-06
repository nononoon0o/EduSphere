import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTranslation } from 'react-i18next';

const EditAccountModal = ({ visible, onClose, onConfirm, onText }) => {
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Icon name="check-circle" size={48} color="#10B981" style={styles.icon} />
          <Text style={styles.title}>{t('editModal.completed')}</Text>
          <Text style={styles.message}>{t('editModal.message', { onText })}</Text>

          <Pressable style={styles.button} onPress={onConfirm}>
            <Text style={styles.buttonText}>{t('editModal.confirm')}</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#10B981",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditAccountModal;
