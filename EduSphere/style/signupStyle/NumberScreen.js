import { StyleSheet, Platform } from "react-native";

const nextstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '6%',
  },

  card: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  title: {
    fontSize: 42,
    color: '#1E3A8A',
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },

  text: {
    color: '#334155',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default nextstyle;
