import { StyleSheet } from "react-native";

const styleid = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'flex-start',
    paddingHorizontal: '10%', 
    paddingVertical: 30, 
  },
  validationText: {
    height: 20,
    marginTop: 0,
    textAlign: 'left',
    fontSize: 15,
    color: 'white',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 50, 
    marginBottom: 20,
    height: 50,
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
    paddingRight: 40, // Space for the icon
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

export default styleid;


  
