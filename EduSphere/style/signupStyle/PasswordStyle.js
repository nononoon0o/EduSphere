import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e3a8a",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  whitetitle: {
    color: "#1e3a8a",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937",
  },
  eyeIcon: {
    padding: 8,
    color: "#6b7280",
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 8,
  },
  progressBarSegment: {
    flex: 1,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
  },
  validationText: {
    fontSize: 13,
    marginBottom: 12,
    paddingLeft: 2,
  },
  button: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    shadowColor: "#1e3a8a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default styles;
