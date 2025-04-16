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
    marginBottom: "25%",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    padding: "7%",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  whitetitle: {
    color: "#fff",
  },
  validationText: {
    fontSize: 13,
    marginBottom: "2.5%",
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
  eyeIcon: {
    padding: "3%",
  },
  progressBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "2%",
  },
  progressBarSegment: {
    flex: 1,
    height: 8, // 고정 높이
    marginHorizontal: 2, // 간격 추가
    borderRadius: 4, // 둥근 모서리
    backgroundColor: "#ccc", // 기본 색상
  },
  button: {
    backgroundColor: "#007AFF",
    padding: "4%",
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: "5%", // 버튼과 다른 요소 간격 추가
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
});

export default styles;
