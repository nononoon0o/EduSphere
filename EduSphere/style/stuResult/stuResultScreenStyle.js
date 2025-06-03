import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    alignItems: 'center',
  },

  // // ✅ Circular Icon Back Button (replaces old styles)
  // backButton: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   backgroundColor: '#1F2937',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 16,
  //   alignSelf: 'flex-start',
  // },

  // 🔺 Header Title Card
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },

  // 🔹 Generic Card Style
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    width: '100%',
    maxWidth: 700,
  },

  // 🔹 Section Header
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

  // 📚 과목별 성적
  scoreBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    width: '100%',
  },
  subject: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  score: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },

  // 📅 출결 태그
  tag: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: '#fff',
    overflow: 'hidden',
  },
  tagPresent: {
    backgroundColor: '#10B981',
    marginRight: 8,
    marginBottom: 8,
  },
  tagLate: {
    backgroundColor: '#F59E0B',
    marginRight: 8,
    marginBottom: 8,
  },
  tagAbsent: {
    backgroundColor: '#EF4444',
    marginRight: 8,
    marginBottom: 8,
  },
  attendanceTagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  // 📝 과제 현황
  assignmentCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  assignmentInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  detailButtonWrapper: {
    backgroundColor: '#2563EB',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // ❗ Error Message
  error: {
    marginTop: 16,
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
});
