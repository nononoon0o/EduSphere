import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // light gray background
    paddingHorizontal: '6%',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  backIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 16,
    padding: 10,
    zIndex: 10,
    backgroundColor: '#DBEAFE', // soft blue
    borderRadius: 8,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1D4ED8', // deep blue
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  roleButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: '#E5E7EB', // neutral gray
    marginHorizontal: 10,
  },
  activeRole: {
    backgroundColor: '#3B82F6', // active blue
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937', // neutral dark
  },
  iconRight: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#1D4ED8', // strong indigo
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    shadowColor: '#1D4ED8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    gap: 10,
  },
  buttonTextLoading: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
    marginLeft: 8,
  },
  errorText: {
    color: '#EF4444', // red-500
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
});

export default styles;
