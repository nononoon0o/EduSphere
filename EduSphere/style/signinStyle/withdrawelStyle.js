import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 15,
    color: '#bbb',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#e74c3c', // 탈퇴는 빨간색 계열 추천
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#ff7675',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  backIcon: {
    position: "absolute",
    top: "3%",
    left: "3%",
    zIndex: 1,
  },
});

export default styles;