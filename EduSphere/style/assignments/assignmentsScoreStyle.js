import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 100,
  },

  // 뒤로가기 버튼
  backWrapper: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },

  // 카드 목록 래퍼
  cardListWrapper: {
    flex: 1,
  },

  // 공통 카드 스타일 (학생, 제출물 등)
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // blue-500
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },

  // 학생 이름(목록, 제출학생)
  studentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 4,
  },

  // 디테일 텍스트(목록, 제출 상세)
  detailText: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 2,
  },

  // 안내, 빈 목록
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 40,
  },

  // 과제 제출 목록 row (제출물 카드 내부)
  submissionRow: {
    paddingVertical: 8,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },

  // 과제 제목
  assignmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
  },

  // 제출 내용
  assignmentContent: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },

  // 점수 입력란
  input: {
    height: 40,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },

  // 점수 저장 버튼
  saveButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // 대시보드(메인화면) 버튼
  dashboardButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  dashboardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // 로딩
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
});
