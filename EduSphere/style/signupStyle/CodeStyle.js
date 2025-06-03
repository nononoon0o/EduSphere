import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: "6%",
    backgroundColor: "#F3F4F6", // light gray background
  },

  titleContainer: {
    marginBottom: "6%",
    marginTop: "4%",
  },

  title: {
    fontSize: 36,
    color: "#0F172A", // dark slate
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  whitetitle: {
    fontSize: 36,
    color: "#1E40AF", // vibrant indigo
    fontWeight: "700",
    textAlign: "center",
  },

  emailText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "500",
  },

  expirationText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 18,
  },

  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 28,
  },

  input: {
    borderBottomWidth: 3,
    borderColor: "#3B82F6",
    backgroundColor: "#E0F2FE", // light blue default background
    color: "#1E293B",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    width: 50,
    height: 58,
    borderRadius: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: Platform.OS === "android" ? 3 : 0,
  },

  resendButton: {
    marginTop: 5,
    alignItems: "center",
  },

  resendButtonText: {
    color: "#2563EB",
    fontSize: 14,
    textDecorationLine: "underline",
    letterSpacing: 0.2,
    fontWeight: "500",
  },

  continueButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginTop: 36,
    backgroundColor: "#2563EB",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 4 : 0,
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
});

export default styles;
