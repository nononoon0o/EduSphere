import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 5,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },

  selectedTab: {
    backgroundColor: "#3B82F6", // blue
    borderColor: "#3B82F6",
  },

  unselectedTab: {
    backgroundColor: "#E5E7EB",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  tabTextSelected: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  inputContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 50,
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
    height: 48,
    fontSize: 16,
    paddingLeft: 8,
    color: "#111827",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
