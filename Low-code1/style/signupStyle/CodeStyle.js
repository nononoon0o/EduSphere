import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: "5%",
    backgroundColor: "#000",
  },
  titleContainer: {
    marginBottom: "10%",
  },
  title: {
    fontSize: 45,
    color: "#0097FB",
    fontWeight: "bold",
    textAlign: "center",
  },
  whitetitle: {
    fontSize: 45,
    color: "#fff",
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: "5%",
  },
  expirationText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: "5%",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "#ffffff",
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
    width: 40,
    height: 50,
  },
  resendButton: {
    marginTop: 30,
  },
  resendButtonText: {
    color: "#AEAEAE",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
    textDecorationColor: "#AEAEAE",
  },
  continueButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: "5%",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});
export default styles;
