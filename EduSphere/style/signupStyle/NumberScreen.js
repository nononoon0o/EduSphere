import { StyleSheet, Platform } from "react-native";

const nextstyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 72,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: '18%',
    marginBottom: '25%',
    textAlign: 'center',
    letterSpacing: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '12%',
    lineHeight: 28,
  },
  HomeButton: {
    width: '60%',
    height: 52,
    backgroundColor: '#0053a6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
    shadowColor: '#0053a6',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: Platform.OS === 'android' ? 4 : 0,
  },
  HomeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default nextstyle;
