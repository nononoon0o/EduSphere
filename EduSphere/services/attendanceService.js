import axios from 'axios';

/**
 * 학습 완료 시 출석/지각 기록 함수
 * @param {Object} params
 * @param {string} params.studentId - 학생의 ObjectId
 * @param {string} params.chapter - 챕터명 또는 챕터 ID
 * @param {Date|string} params.deadline - 출석 인정 마감 시간 (Date 객체 또는 ISO 문자열)
 * @param {string} params.token - JWT 인증 토큰
 */
export async function recordAttendanceOnComplete({ studentId, chapter, deadline, token }) {
  try {
    const now = new Date();
    const deadlineDate = new Date(deadline);

    let status = '출석';
    if (now > deadlineDate) status = '지각';

    await axios.post(
      'http://localhost:5000/api/attendance',
      {
        studentId,
        chapter,
        date: now,
        status
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return { success: true, status };
  } catch (error) {
    console.error('출석 기록 실패:', error);
    return { success: false, error };
  }
}
