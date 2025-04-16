import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      color: '#fff',
      marginBottom: 40,
    },
    inputContainer: {
      flexDirection: 'row',  // 아이콘과 입력창, 눈 아이콘이 한 줄에 나타나도록 설정
      alignItems: 'center',
      width: '80%',
      height: 50,
      backgroundColor: '#333',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    icon: {
      marginRight: 10,  
    },
    input: {
      flex: 1,  
      color: '#fff',
    },
    eyeIcon: {
      marginLeft: 10,  
    },
    loginButton: {
      width: '80%',
      height: 50,
      backgroundColor: '#0053a6',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 18,
    },
    options: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    optionText: {
      color: '#aaa',
      fontSize: 14,
    },
    separator: {
      color: '#aaa',
      fontSize: 14,
    },
    socialButtonGoogle: {
      width: '80%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#333',
    },
    socialButtonNaver: {
      width: '80%',
      height: 50,
      backgroundColor: '#03C75A',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    socialButtonKakao: {
      width: '80%',
      height: 50,
      backgroundColor: '#FEE500',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    socialButtonText: {
      color: '#000',
      fontSize: 16,
    },
  });
  
export default styles;