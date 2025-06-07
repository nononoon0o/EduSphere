import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 80,
      paddingHorizontal: 20,
      backgroundColor: '#a9f0fc', // Fond bleu marine
      borderBottomWidth: 2,
      borderBottomColor: '#34495E', // Gris foncé
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 5,
    },
    logo: {
      width: 180,
      height: 180,
    },
    iconGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 20,
      padding: 12,
      borderRadius: 50,
      backgroundColor: '#16A085', // Turquoise doux
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Texte en blanc pour un fond sombre
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF', // Blanc sur fond sombre
    },
    iconText: {
      color: '#FFFFFF', // Icônes en blanc sur fond sombre
    }
  });
export default styles;  