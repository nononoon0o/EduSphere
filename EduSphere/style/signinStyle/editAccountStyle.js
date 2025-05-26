import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB", // light background
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 80 : 60,
  },

  backIcon: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 28,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1E3A8A", // indigo
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 0.5,
  },

  input: {
    backgroundColor: "#FFFFFF",
    color: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  button: {
    backgroundColor: "#3B82F6", // modern blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: Platform.OS === "android" ? 6 : 4,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  label: {
    color: "#6B7280", // gray-500
    fontSize: 14,
    marginBottom: 6,
    paddingLeft: 4,
  },

  errorText: {
    color: "#DC2626", // red
    fontSize: 13,
    marginTop: -12,
    marginBottom: 16,
    paddingLeft: 4,
  },
  inputWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#D1D5DB',
  marginBottom: 20,
  paddingHorizontal: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
},

inputIcon: {
  marginRight: 10,
},

input: {
  flex: 1,
  paddingVertical: 14,
  fontSize: 16,
  color: '#111827',
},

});

export default styles;
