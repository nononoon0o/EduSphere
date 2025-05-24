import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#000000",
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
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  whitetitle: {
    color: "#ffffff",
  },
  validationText: {
    fontSize: 13,
    color: "#cccccc",
    marginBottom: "2.5%",
    paddingLeft: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#888888",
    marginBottom: "4%",
    width: "100%",
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    fontSize: 16,
    color: "#ffffff",
  },
  eyeIcon: {
    padding: 8,
    color: "#cccccc",
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
    backgroundColor: "#555555", // default inactive
  },
  progressBarSegmentActive: {
    backgroundColor: "#007AFF", // active segment
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: "4%",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
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
