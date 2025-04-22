import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 30,
  },
  inputContainer: {
    width: "80%",
    flex: 1,
    marginTop: 50,
  },
  modalText: {
    color: "#0097FB",
  },
  numberinput: {
    width: "80%",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#0097FB",
    height: 50,
    paddingRight: 40,
    paddingLeft: 10,
  },
  input: {
    width: "100%",
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#0097FB",
    height: 50,
    paddingRight: 40,
    paddingLeft: 10,
  },
  inputPlaceholder: {
    marginTop: 5,
    color: "white",
    width: "85%",
    fontSize: 11,
  },
  button: {
    backgroundColor: "#094771",
    borderRadius: 5,
    padding: 10,
    borderColor: "#0097FB",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tabButton: {
    width: "45%",
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
  },
  selectedTab: {
    backgroundColor: "#1E1E1E",
    borderColor: "#1E1E1E",
  },
  unselectedTab: {
    backgroundColor: "#292929",
    borderColor: "white",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  modalContainer: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#AEAEAE",
    borderRadius: 10,
    height: 120,
    padding: 15,
    marginTop: 50,
    justifyContent: "space-between",
  },
  timerText: {
    color: "white",
    marginLeft: 10,
  },
  confirmButton: {
    marginLeft: 10,
    borderColor: "#606060",
    backgroundColor: "#606060",
    borderRadius: 10,
    borderWidth: 2,
    width: "20%",
    height: 40,
    alignItems: "center",
  },
  confirmText: {
    color: "white",
    marginTop: "10%",
  },
});

export default styles;
