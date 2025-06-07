import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 20,
  },
  conceptSection: {
    marginTop: 20,
  },
  conceptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2980b9',
    marginBottom: 10,
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#34495e',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    marginTop: 5,
  },
});

export default styles;
