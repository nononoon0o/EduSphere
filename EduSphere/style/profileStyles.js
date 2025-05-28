import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },

  // ⬆️ Shared Header
  customHeader: {
    backgroundColor: '#d0efff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  customHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0a3d62',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 8,
  },

  // Profile card
  profileCard: {
    marginTop: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 20,
  },

  // 로그인/로그아웃 버튼
  authButton: {
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },

  // 메뉴 액션 영역
  actionsContainer: {
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#1abc9c',
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 6,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
