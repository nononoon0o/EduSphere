import { StyleSheet, Platform } from 'react-native';

const stylemail = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '10%',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#FFFFFF', // white background
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#2563EB', // blue title color
    textAlign: 'center',
    marginBottom: '20%',
    letterSpacing: 0.5,
  },

  whitetitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#111827', // dark gray for contrast
    textAlign: 'center',
  },

  inputContainer: {
    position: 'relative',
    width: '100%',
    marginTop: 40,
    marginBottom: 24,
  },

  inputWithIcon: {
    backgroundColor: '#F9FAFB', // light gray
    color: '#111827',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 8,
    paddingRight: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
    width: '100%',
  },

  clearIcon: {
    position: 'absolute',
    right: '4%',
    top: '50%',
    transform: [{ translateY: -12 }],
    zIndex: 5,
  },

  validationText: {
    fontSize: 14,
    color: '#EF4444', // red by default (override with dynamic style)
    textAlign: 'left',
    marginTop: 4,
    marginBottom: 8,
    paddingLeft: 2,
  },

  button: {
    backgroundColor: '#3B82F6', // blue button
    paddingVertical: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  backIcon: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 24,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  position: 'absolute',
  top: Platform.OS === 'ios' ? 40 : 24,
  left: 20,
  padding: 10,
  zIndex: 10,
  backgroundColor: '#FFFFFF',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: Platform.OS === 'android' ? 3 : 0,
},

backButtonText: {
  fontSize: 16,
  fontWeight: '500',
  color: '#111827',
},

});

export default stylemail;
