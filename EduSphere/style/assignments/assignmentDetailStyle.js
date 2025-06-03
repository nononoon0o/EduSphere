import { StyleSheet } from 'react-native';

const assignmentDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // very light blue-gray background
    justifyContent: 'center',   // ✅ vertically center
    alignItems: 'center',       // ✅ horizontally center
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 700,              // ✅ ensure a good desktop/web layout
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 40,                // ✅ spacious layout
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3B82F6', // vibrant blue
    marginBottom: 16,
    textAlign: 'center',
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6D28D9', // purple label
    marginTop: 20,
    marginBottom: 6,
  },

  text: {
    fontSize: 16,
    color: '#334155', // dark slate
    lineHeight: 24,
  },

  error: {
    color: '#DC2626', // red-600
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },

  downloadLink: {
    marginTop: 24,
    backgroundColor: '#E0F2FE',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: '#0284C7', // sky blue
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },

  dueDateBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  dueDateText: {
    color: '#92400E', // amber-800
    fontSize: 14,
    fontWeight: '600',
  },

  statusTag: {
    marginTop: 16,
    backgroundColor: '#D1FAE5', // light green
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  statusText: {
    color: '#065F46', // green-800
    fontSize: 14,
    fontWeight: '600',
  },

  // ✅ Circular Back Button (as in the image)
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
});

export default assignmentDetailStyle;
