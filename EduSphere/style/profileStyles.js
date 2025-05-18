import { StyleSheet, Platform } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff', // Softer light background
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginBottom: 24,
    borderRadius: 14,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },

  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flexShrink: 1,
  },

  loginLogoutButton: {
    backgroundColor: '#0053a6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginLeft: 12,
    shadowColor: '#0053a6',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },

  loginLogoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  sectionContainer: {
    width: '90%',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  sectionTitle: {
    alignSelf: 'flex-start',
    marginBottom: 6,
    fontSize: 15,
    fontWeight: '700',
    color: '#3a4a5c',
  },

  actionButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 25,
    marginVertical: 6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e0e6ed',
  },

  actionButtonText: {
    color: '#0053a6',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default profileStyles;
