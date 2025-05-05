import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      zIndex: 10,
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
    },
    backText: {
      fontSize: 16,
      marginLeft: 6,
      color: '#2c3e50',
      fontWeight: '500',
    },
  });

  export default styles;