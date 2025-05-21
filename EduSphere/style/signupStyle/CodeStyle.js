import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: "6%",
    backgroundColor: "#000000",
  },
  titleContainer: {
    marginBottom: "8%",
  },
  title: {
    fontSize: 42,
    color: "#0097FB",
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  whitetitle: {
    fontSize: 42,
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
  },
  expirationText: {
    fontSize: 14,
    color: "#bbbbbb",
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
    borderColor: "#ffffff",
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
    width: 44,
    height: 56,
    borderRadius: 6,
    backgroundColor: "#111111",
    marginHorizontal: 4,
  },
  resendButton: {
    marginTop: 10,
    alignItems: "center",
  },
  resendButtonText: {
    color: "#AEAEAE",
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#AEAEAE",
    letterSpacing: 0.3,
  },
  continueButton: {
    height: 52,
    backgroundColor: "#094771",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 40,
    shadowColor: "#094771",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 5 : 0,
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default styles;
