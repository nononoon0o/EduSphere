// style/VideoLearning/videoLearningStyles.js
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff7f5',
  },
  text: {
    fontSize: 20,
    color: '#c0392b',
    fontWeight: '600',
    marginBottom: 20,
  },
  videoContainer: {
    width: '90%',
    height: Dimensions.get('window').width * 0.5625,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  iframe: {
    borderWidth: 0,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#2c3e50',
  },
  prevNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 30,
    alignSelf: 'center',
  },
  prevNavCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
  },

  // ─── 평가하기 버튼 스타일 추가 ─────────────────────────────
  evalButton: {
    backgroundColor: '#ffa000',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
  },
  evalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
