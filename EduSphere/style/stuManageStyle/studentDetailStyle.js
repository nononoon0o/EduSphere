import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 100,
  },

  backWrapper: {
    marginBottom: 24, // ✅ espace ajouté
    alignSelf: 'flex-start',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  name: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },

  infoText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 4,
  },

  sectionTitle: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  subjectText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },

  attendanceText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },

  assignmentText: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },

  feedbackText: {
    fontSize: 16,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 4,
  },

  tagGreen: {
    color: '#10B981',
    fontWeight: 'bold',
  },

  tagRed: {
    color: '#EF4444',
    fontWeight: 'bold',
  },

  tagYellow: {
    color: '#F59E0B',
    fontWeight: 'bold',
  },

  scoreTag: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  sectionIcon: {
    fontSize: 22,
    marginRight: 4,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
});
