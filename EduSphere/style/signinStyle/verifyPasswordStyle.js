// style/verifyPasswordStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: "10%",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    color: "#0097FB",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#000",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#0057FF",
    borderRadius: 5,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    position: "absolute",
    top: "3%",
    left: "3%",
    zIndex: 1,
  },
});

export default styles;
