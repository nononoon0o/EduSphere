import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "#000",
    justifyContent: "flex-start",
  },
  titleContainer: {
    width: "100%",
    marginBottom: "3%",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    marginTop: "3%",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    paddingVertical: "1%",
    fontSize: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15, 
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: "3%",
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
