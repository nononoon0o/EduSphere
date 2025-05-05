import { StyleSheet } from "react-native";

const nextstyle = StyleSheet.create({
  container: {
    flex: 1,
    padding:'5%',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 80,
    color: '#fff',
    marginTop:'20%',
    marginBottom: '30%',  // 환영합니다 밑에 약간의 여백 추가
  },
  text: {
    color: '#fff',
    fontSize: 20,
    marginBottom: '10%',  
  },
  HomeButton: {
    width: '40%',
    height: 50,
    backgroundColor: '#0053a6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  HomeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default nextstyle;
