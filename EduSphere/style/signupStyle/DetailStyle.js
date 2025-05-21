import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    backgroundColor: '#000000',
    justifyContent: 'flex-start',
  },
  titleContainer: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    marginTop: '4%',
    color: '#ffffff',
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginBottom: 24,
  },
  roleButton: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#888888',
    marginHorizontal: 10,
  },
  activeRole: {
    borderBottomColor: '#007AFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#888888',
    marginBottom: 18,
    width: '100%',
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    fontSize: 16,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 32,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  backIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    fontSize: 13,
    marginTop: 8,
  },
});

export default styles;
