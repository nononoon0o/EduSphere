import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
    color: '#1F2937',
  },

  text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },

  conceptSection: {
    marginTop: 10,
  },
  conceptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 20,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    marginLeft: 10,
    marginTop: 5,
  },

  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#2563EB',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 40,
    alignSelf: 'center',
  },
  nextButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },

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

  // Video styles
  videoContainer: {
    height: width * 0.5625,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
  },
  video: {
    flex: 1,
    borderRadius: 12,
  },
  iframe: {
    border: 'none',
    borderRadius: 12,
    marginTop: 16,
  },

  // New styles for LearnScreen interactive drag & drop
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dropZone: {
    width: width * 0.4,
    height: 250,
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  dropZoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  innerDropZone: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cc0000',
    marginBottom: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
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
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  imageLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
  },
  prevButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
  },
});
