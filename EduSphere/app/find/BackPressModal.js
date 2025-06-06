import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";

const BackPressModal = ({ visible, onClose, onConfirm, onText }) => {
  const { t } = useTranslation();

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
            <Text style={styles.bold}>{onText}</Text>
            {t("backModal.quitPrefix")}
          </Text>
          <Text style={styles.message}>
            <Text style={styles.highlight}>{t("backModal.quit")}</Text>
            {t("backModal.confirmSuffix")}
          </Text>
          <Text style={styles.subText}>{t("backModal.warningReset")}</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{t("backModal.no")}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{t("backModal.yes")}</Text>
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
    backgroundColor: "#1F2937",
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
    color: "#9CA3AF",
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
    backgroundColor: "#2563EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#4B5563",
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
