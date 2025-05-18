import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
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
  });
  export default styles;