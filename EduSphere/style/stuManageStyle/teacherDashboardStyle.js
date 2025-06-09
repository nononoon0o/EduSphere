import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 100,
  },

  // ✅ Floating circular back button (top-left corner)
  floatingBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 48 : 28,
    left: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },

  input: {
    height: 44,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#F9FAFB',
  },

  appButtonContainer: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  appButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  assignmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
  },

  assignmentInfo: {
    flex: 1,
    marginRight: 10,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },

  deleteButtonWrapper: {
    backgroundColor: '#EF4444',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },

  attendanceButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  attendanceBtn: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 64,
  },

  dropdown: {
    height: 44,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  error: {
    color: '#EF4444',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 12,
  },

  weightButtonContainer: {
    backgroundColor: '#F59E42',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
});

export default styles;
