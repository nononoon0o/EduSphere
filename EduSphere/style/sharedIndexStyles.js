
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
    borderRadius: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980b9',
    textAlign: 'center',
    marginLeft: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  divider: {
    height: 3,
    backgroundColor: '#aed6f1',
    marginVertical: 20,
    marginHorizontal: 50,
    borderRadius: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderColor: '#d0eafc',
    borderWidth: 1,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  cardPressed: {
    backgroundColor: '#eaf2f8',
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
    backgroundColor: '#2980b9',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bulletText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardText: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    flexShrink: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    flexShrink: 1,
  },
});

export default styles;