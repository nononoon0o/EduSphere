import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    backButton: {
      backgroundColor: '#2E1A83',
      borderRadius: 25,
      padding: 10,
      marginBottom: 20,
      alignSelf: 'flex-start',
    },
    backText: {
      color: '#fff',
    },
    card: {
      backgroundColor: '#eee',
      padding: 16,
      borderRadius: 8,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: 10,
    },
    content: {
      fontSize: 14,
      lineHeight: 22,
    },
    bold: {
      fontWeight: 'bold',
    },
  });

export default styles;