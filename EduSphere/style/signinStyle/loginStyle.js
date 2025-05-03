import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A", // Darker black for depth
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    height: 52,
    backgroundColor: "#1C1C1E",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#333",
  },
  icon: {
    marginRight: 10,
    color: "#aaa",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  loginButton: {
    width: "100%",
    maxWidth: 400,
    height: 52,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 25,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  options: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  optionText: {
    color: "#aaa",
    fontSize: 14,
  },
  separator: {
    marginHorizontal: 8,
    color: "#666",
    fontSize: 14,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default styles;
