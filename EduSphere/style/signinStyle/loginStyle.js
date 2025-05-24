import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf0f6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#1e1e1e",
    marginBottom: 36,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 18,
    width: "100%",
    height: 56,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 6 : 4,
  },
  icon: {
    marginRight: 10,
    color: "#7b8ca0",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1e1e1e",
  },
  eyeIcon: {
    padding: 6,
    color: "#7b8ca0",
  },
  loginButton: {
    backgroundColor: "#2b74ff",
    borderRadius: 16,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 28,
    shadowColor: "#2b74ff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 8 : 4,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  optionText: {
    color: "#2b74ff",
    fontSize: 15,
    fontWeight: "500",
    marginHorizontal: 6,
    paddingVertical: 4,
  },
  separator: {
    color: "#a0a0a0",
    fontSize: 15,
    fontWeight: "400",
  },
});
