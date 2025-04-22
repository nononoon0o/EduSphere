import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 28,
    color: "#0097FB",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10%",
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
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    zIndex: 1,
  },
});

export default styles;
