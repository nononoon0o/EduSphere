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
      backgroundColor: 'rgba(255,255,255,0.85)',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1e3a8a',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 30,
      alignSelf: 'flex-start',
      marginBottom: 20,
    },
    backText: {
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
      backgroundColor: '#aed6f1',
      marginBottom: 20,
      marginHorizontal: 40,
      borderRadius: 20,
    },
    item: {
      backgroundColor: '#f2f6fc',
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#d6eaf8',
    },
    itemPressed: {
      backgroundColor: '#d4e6f1',
    },
    bullet: {
      width: 36,
      height: 36,
      backgroundColor: '#5dade2',
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
      color: '#2c3e50',
      fontWeight: '600',
      flexShrink: 1,
    },
  });

  export default styles;