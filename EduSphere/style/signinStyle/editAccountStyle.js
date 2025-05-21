import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 80 : 60,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0097FB",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#1C1C1E",
    color: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 6 : 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  backIcon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 28,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    color: "#8E8E93",
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 4,
  },
  errorText: {
    color: "#FF453A",
    fontSize: 13,
    marginTop: -12,
    marginBottom: 16,
    paddingLeft: 4,
  },
});

export default styles;
