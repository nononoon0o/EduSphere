import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveQuizScore({ studentId, chapter, quizScore }) {
  const token = await AsyncStorage.getItem('token');
  try {
    await axios.post(
      'http://localhost:5000/api/scores/',
      { studentId, chapter, quizScore },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { success: true };
  } catch (e) {
    console.error('Quiz score 저장 실패:', e);
    return { success: false, error: e };
  }
}
