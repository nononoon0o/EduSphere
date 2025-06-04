import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },

  videoContainer: {
    width: width * 0.9,
    height: width * 0.5625, // 16:9 ratio
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
    marginBottom: 20,
  },

  video: {
    width: '100%',
    height: '100%',
  },

  iframe: {
    border: 'none',
    borderRadius: 12,
    marginTop: 10,
    alignSelf: 'center',
  },

  completeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  evaluationButton: {
    backgroundColor: '#f57c00',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginTop: 12,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  evaluationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  prevNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 180,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 20,
    alignSelf: 'center',
  },

  prevNavCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  prevNavText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default styles;
