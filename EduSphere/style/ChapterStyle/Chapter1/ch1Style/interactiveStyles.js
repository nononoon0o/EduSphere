import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100,
    backgroundColor: '#F3F4F6', // light neutral gray
  },

  // 🔙 Back Button
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 24,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: '#3730A3',
  },

  // 🧠 Learning Objective
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
    lineHeight: 30,
  },

  // 📚 Concept Section
  conceptSection: {
    marginTop: 10,
  },
  conceptTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B82F6',
    marginTop: 24,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
  },
  description: {
    fontSize: 15.5,
    color: '#4B5563',
    marginLeft: 12,
    marginTop: 4,
  },

  // 👉 Next Button
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 220,
    height: 52,
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginTop: 40,
    alignSelf: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  nextButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1D4ED8',
  },

  // ⬅️ Previous Nav Button
  prevNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  prevNavCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 10,
  },

  // 🎬 Video Styles
  videoContainer: {
    height: width * 0.5625,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 24,
    backgroundColor: '#E0E7FF',
  },
  video: {
    flex: 1,
    borderRadius: 16,
  },
  iframe: {
    border: 'none',
    borderRadius: 16,
    marginTop: 16,
  },

  // 🧪 Drop Zones
  dropZone: {
    width: width * 0.42,
    height: 260,
    backgroundColor: '#DBEAFE',
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 18,
    alignItems: 'center',
    padding: 12,
  },
  dropZoneTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  innerDropZone: {
    flex: 1,
    width: '100%',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Result messages
  resultMessage: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: '#DC2626',
    marginBottom: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
  },

  // 🖼️ Images
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    margin: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 10,
  },
  imageLabel: {
    fontSize: 13,
    color: '#374151',
    textAlign: 'center',
    marginTop: 6,
  },

  // 🧊 Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },

  // 📍 Prev / Next Navigation Row
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 32,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    shadowColor: '#9CA3AF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  prevButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#60A5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },

  // 🧾 Beautiful Card Wrapper
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 20,
    padding: 24,
    marginTop: 10,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    backdropFilter: Platform.OS === 'web' ? 'blur(10px)' : undefined,
  },
  // 🎯 학습목표 카드
objectiveCard: {
  backgroundColor: '#F9FAFB',
  borderRadius: 20,
  padding: 24,
  marginVertical: 12,
  marginHorizontal: 4,
  shadowColor: '#D1D5DB',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 6,
  elevation: 4,
},

// 💙 물리변화 카드
physicalCard: {
  backgroundColor: '#DBEAFE', // soft blue
  borderRadius: 20,
  padding: 24,
  marginVertical: 12,
  marginHorizontal: 4,
  shadowColor: '#60A5FA',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
},

// 🧡 화학변화 카드
chemicalCard: {
  backgroundColor: '#FEF3C7', // soft amber
  borderRadius: 20,
  padding: 24,
  marginVertical: 12,
  marginHorizontal: 4,
  shadowColor: '#F59E0B',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 5,
},

// 📘 다음 버튼 카드
buttonCard: {
  backgroundColor: '#E0E7FF',
  borderRadius: 20,
  padding: 24,
  marginVertical: 20,
  marginHorizontal: 4,
  shadowColor: '#6366F1',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  elevation: 6,
},

});
