import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "10%",
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
  titleContainer: {
    width: "100%",
    marginBottom: "1%",
  },
  title: {
    fontSize: 25,
    padding: "5%",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5%",
    gap: 40,
  },
  roleButton: {
    paddingVertical: "4%",
    borderBottomWidth: 2,
    borderBottomColor: "#888",
    marginHorizontal: "2%",
  },
  activeRole: {
    borderBottomColor: "#007AFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#888",
    marginBottom: "2%",
    width: "100%",
  },
  input: {
    flex: 1,
    paddingVertical: "4%",
    fontSize: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: "4%",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  backIcon: {
    position: "absolute",
    top: "3%",
    left: "3%",
    zIndex: 1,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 13,
  },
});

export default styles;
