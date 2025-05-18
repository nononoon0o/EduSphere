import { StyleSheet } from 'react-native';

const stylemail = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: '10%',
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 50,
    marginBottom: 20,
  },
  validationText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'left',
    marginTop: 0,
  },
  clearIcon: {
    position: 'absolute',
    right: '4%',
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  inputWithIcon: {
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 5,
    paddingRight: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#0057FF',
    width: '100%',
  },
  title: {
    fontSize: 45,
    color: '#0097FB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '25%',
  },
  whitetitle: {
    fontSize: 45,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#094771',
    paddingVertical: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  backIcon: {
    position: 'absolute',
    top: '3%',
    left: '3%',
    zIndex: 1,
  },
});

export default stylemail;
