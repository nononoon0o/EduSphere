// styles/ChapterStyle/commonChapterStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 100, // extra spacing under the back button/header
  backgroundColor: '#F9FAFB', // ⬅️ more balanced and consistent neutral background
},


  // Removed: backButton, backText (now handled by shared BackButton component)

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 12,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 24,
  },
  sectionsContainer: {
    marginBottom: 30,
  },
  sectionButton: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionEmoji: {
    fontSize: 22,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
  },

  // 🎓 LearnScreen-specific
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
  imageLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },

  // 📚 Navigation buttons
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
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 30,
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
    color: '#3498db',
  },
});
