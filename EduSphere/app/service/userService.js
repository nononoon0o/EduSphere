import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 사용자 정보(닉네임, 역할, mongoDB ID) 한 번에 가져오기
 * @returns {Promise<{nickname: string, role: string, mongoId: string}>}
 */
export async function fetchUserInfoAll() {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return { nickname: null, role: null, mongoId: null };
    }

    // 병렬로 요청 보내기 (성능 향상)
    const [nameRes, roleRes, mongoDBIDRes] = await Promise.all([
      axios.get('http://localhost:5000/user/name', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:5000/user/role', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      axios.get('http://localhost:5000/user/mongodbid', {
        headers: { Authorization: `Bearer ${token}` }
      }),
    ]);

    return {
      nickname: nameRes.data?.nickname ?? null,
      role: roleRes.data?.role ?? null,
      mongoId: mongoDBIDRes.data?._id ?? null
    };
  } catch (error) {
    return { nickname: null, role: null, mongoId: null };
  }
}