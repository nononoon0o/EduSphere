import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: "6%",
    backgroundColor: "#F9FAFB", // White background
  },

  titleContainer: {
    marginBottom: "8%",
  },

  title: {
    fontSize: 38,
    color: "#1E3A8A", // Indigo-900
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  whitetitle: {
    fontSize: 38,
    color: "#334155", // Slate-800
    fontWeight: "700",
    textAlign: "center",
  },

  emailText: {
    fontSize: 16,
    color: "#334155",
    textAlign: "center",
    marginBottom: 12,
  },

  expirationText: {
    fontSize: 14,
    color: "#64748B", // Slate-500
    textAlign: "center",
    marginBottom: 24,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    paddingHorizontal: 12,
  },

  input: {
    borderBottomWidth: 2,
    borderColor: "#3B82F6", // Blue-500
    color: "#111827",
    fontSize: 24,
    textAlign: "center",
    width: 48,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  resendButton: {
    marginTop: 10,
    alignItems: "center",
  },

  resendButtonText: {
    color: "#3B82F6",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#3B82F6",
    letterSpacing: 0.3,
  },

  continueButton: {
    height: 52,
    backgroundColor: "#2563EB", // Blue-600
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 4 : 0,
  },

  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default styles;
