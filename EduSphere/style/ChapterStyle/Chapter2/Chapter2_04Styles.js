import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: '#B5D6F0',
      padding: 20,
      justifyContent: 'center',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 30,
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    backText: {
      fontSize: 16,
      marginLeft: 6,
      color: '#1e3a8a',
      fontWeight: '600',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    option: {
      backgroundColor: '#98A5A8',
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    optionText: {
      fontSize: 16,
      color: '#000',
    },
  });

  export default styles;