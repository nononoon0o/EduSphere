import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: {
      padding: 24,
      flexGrow: 1,
      backgroundColor: 'rgba(255,255,255,0.88)',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    backTextStyled: {
      fontSize: 15,
      color: '#ffffff',
      fontWeight: '600',
      marginLeft: 6,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    chapterTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#2980b9',
    },
    divider: {
      height: 2,
      backgroundColor: '#d7bde2',
      marginBottom: 20,
      marginHorizontal: 40,
      borderRadius: 10,
    },
    item: {
      backgroundColor: '#f5eef8',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#d2b4de',
    },
    itemPressed: {
      backgroundColor: '#ebdef0',
    },
    bullet: {
      width: 36,
      height: 36,
      backgroundColor: '#af7ac5',
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    bulletText: {
      color: 'white',
      fontWeight: 'bold',
    },
    itemText: {
      fontSize: 16,
      color: '#4a235a',
      fontWeight: '600',
      flexShrink: 1,
    },
  });

  export default styles;