import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  profileCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },

  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e272e',
    marginBottom: 16,
    textAlign: 'center',
  },

  authButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },

  loginButton: {
    backgroundColor: '#007bff',
  },

  logoutButton: {
    backgroundColor: '#34495e',
  },

  authButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  actionsContainer: {
    width: '100%',
    marginTop: 10,
  },

  actionButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },

  actionButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  dangerButton: {
    backgroundColor: '#e74c3c',
  },
});

export default styles;
