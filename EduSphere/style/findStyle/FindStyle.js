import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  // ✅ Back Button (top left)
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2563EB", // blue
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginTop: 60,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
  },

  selectedTab: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  unselectedTab: {
    backgroundColor: "#E5E7EB",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },

  tabTextSelected: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  inputContainer: {
    width: "100%",
    marginTop: 20,
    marginBottom: 50,
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563EB",
    height: 48,
    fontSize: 16,
    paddingLeft: 10,
    color: "#111827",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },

  numberinput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#2563EB",
    borderWidth: 1.5,
    borderRadius: 10,
    marginRight: 8,
  },

  confirmButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 8,
  },

  confirmText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  inputPlaceholder: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
