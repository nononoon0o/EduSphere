import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#D9FFD9',
    },
    backButton: {
      backgroundColor: '#2E1A83',
      borderRadius: 25,
      paddingVertical: 10,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    backButtonText: {
      color: 'white',
      fontSize: 16,
      marginLeft: 8,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      marginBottom: 20,
      fontSize: 14,
    },
    card: {
      backgroundColor: '#A0B5B9',
      borderRadius: 10,
      padding: 16,
      marginBottom: 15,
    },
    cardText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });

  export default styles;