import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const spacing = {
  padding: 20,
  margin: 12,
  cardRadius: 20,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.padding,
    paddingTop: Platform.OS === 'ios' ? 100 : 80,
    backgroundColor: '#F3F4F6',
  },

  scrollContent: {
    paddingBottom: 80,
    paddingTop: 10,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: spacing.margin * 2,
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

  text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: spacing.margin * 1.5,
    lineHeight: 28,
  },

  conceptTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B82F6',
    marginTop: spacing.margin * 2,
    marginBottom: spacing.margin,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: spacing.margin,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
    marginTop: spacing.margin,
  },
  description: {
    fontSize: 15.5,
    color: '#4B5563',
    marginLeft: 12,
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: spacing.cardRadius,
    padding: spacing.padding,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)',
      },
    }),
  },

  conceptSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: spacing.cardRadius,
    padding: spacing.padding,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  objectiveCard: {
    backgroundColor: '#F9FAFB',
  },
  physicalCard: {
    backgroundColor: '#DBEAFE',
  },
  chemicalCard: {
    backgroundColor: '#FEF3C7',
  },
  buttonCard: {
    backgroundColor: '#E0E7FF',
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 220,
    height: 52,
    backgroundColor: '#3B82F6',
    borderRadius: 30,
    paddingHorizontal: 20,
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

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    padding: spacing.padding,
    backgroundColor: '#ffffff',
    borderRadius: spacing.cardRadius,
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.padding,
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

  videoContainer: {
    height: width * 0.5625,
    width: '100%',
    borderRadius: spacing.cardRadius,
    overflow: 'hidden',
    marginVertical: 24,
    backgroundColor: '#E0E7FF',
  },
  video: {
    flex: 1,
    borderRadius: spacing.cardRadius,
  },
  iframe: {
    border: 'none',
    borderRadius: spacing.cardRadius,
    marginTop: 16,
  },

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
});
