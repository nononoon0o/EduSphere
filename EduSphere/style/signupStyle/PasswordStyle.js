import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
  },
  titleContainer: {
    width: "100%",
    marginBottom: "4%",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1e3a8a", // dark indigo
    textAlign: "center",
    letterSpacing: 0.5,
  },
  whitetitle: {
    color: "#1e3a8a",
  },
  validationText: {
    fontSize: 13,
    marginBottom: "2.5%",
    paddingLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 14 : 10,
    marginBottom: "4%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1f2937", // dark gray
  },
  eyeIcon: {
    padding: 8,
    color: "#6b7280", // gray
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "6%",
    marginTop: "2%",
  },
  progressBarSegment: {
    flex: 1,
    height: 8,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#e5e7eb", // light gray as inactive
  },
  progressBarSegmentActive: {
    backgroundColor: "#007AFF", // active segment
  },
  button: {
    backgroundColor: "#1e3a8a",
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "4%",
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
  backIcon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 30,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
});

export default styles;
