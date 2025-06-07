import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f6f8',
      padding: 20,
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    backText: {
      fontSize: 15,
      marginLeft: 6,
      color: '#1e3a8a',
      fontWeight: '600',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: 10,
    },
    content: {
      fontSize: 16,
      color: '#34495e',
    },
  });

  export default styles;