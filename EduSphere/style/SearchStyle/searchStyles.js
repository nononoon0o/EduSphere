// ✅ Nouveau fichier de styles modernisés pour SearchScreen
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff', // dégradé simulé par fond doux
  },

  // Layout
  mainWrapper: {
    flex: 1,
  },

  sidebar: {
    backgroundColor: '#dceeff',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },

  sidebarMobile: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#c2d1e0',
  },

  sidebarDesktop: {
    width: 220,
    borderRightWidth: 1,
    borderColor: '#c2d1e0',
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  // Header
  customHeader: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#cce4ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#b0d9ef',
  },

  customHeaderText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#002b45',
    fontFamily: 'Poppins',
  },

  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSpacing: {
    marginRight: 20,
  },

  // Titles
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2d3d',
    marginBottom: 6,
  },

  subheader: {
    fontSize: 14,
    color: '#6b7c93',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 24,
    color: '#364f6b',
  },

  // Search box
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#b3cde0',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },

  textInput: {
    flex: 1,
    fontSize: 15,
    paddingLeft: 8,
    color: '#1e272e',
  },

  icon: {
    marginRight: 8,
    color: '#7f8c8d',
  },

  // Chapter + Section
  filterItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },

  itemText: {
    fontSize: 14,
    color: '#2c3e50',
  },

  activeItem: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: 'bold',
  },

  // Recent list
  listContainer: {
    paddingBottom: 120,
  },

  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  recentText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#34495e',
  },

  noResult: {
    textAlign: 'center',
    color: '#999',
    fontSize: 15,
    marginTop: 40,
    fontStyle: 'italic',
  },

  searchButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  returnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#cdddf5',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },

  returnText: {
    color: '#2d6cdf',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },

  titleWrapper: {
    marginBottom: 16,
  },

  inputFocused: {
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
});

export default styles;
