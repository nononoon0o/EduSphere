import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: width > 600 ? 100 : 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    gap: 14,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },

  roleSwitch: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
    marginBottom: 12,
    overflow: 'hidden',
    height: 44,
  },

  roleTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  roleText: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '500',
  },

  activeTab: {
    backgroundColor: '#2563EB',
  },

  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },

  inputFocus: {
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    textAlign: 'center',
  },

  submitButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  submitText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
