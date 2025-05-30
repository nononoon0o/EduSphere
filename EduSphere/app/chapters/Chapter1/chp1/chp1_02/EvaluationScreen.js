// app/chapters/Chapter1/chp1/chp1_02/EvaluationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import axios from 'axios';

export default function EvaluationScreen() {
  const questions = [
    {
      id: 'q1',
      text:
        '1. 다음 중 화학 반응에 해당하지 않는 것은 무엇입니까?\n\n' +
        '(1) 천연가스가 연소하여 이산화탄소와 물이 생성된다.\n' +
        '(2) 물이 끓어 수증기로 변한다.\n' +
        '(3) 달걀을 가열하니 흰자가 하얗게 굳어진다.\n' +
        '(4) 김치가 발효되어 신맛이 난다.\n' +
        '(5) 은반지가 공기 중에서 검게 변색된다.',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(2)'],
      explanation:
        '(2)는 물의 상태 변화만을 나타내는 물리 변화입니다.\n' +
        '(1), (3), (4), (5)는 모두 새로운 물질이 생성되거나 성질이 변화하는 화학 반응입니다.'
    },
    {
      id: 'q2',
      text:
        '2. 다음 현상 중 화학 반응의 증거로 볼 수 없는 것은 무엇입니까?\n\n' +
        '(1) 반응 용기 주변이 뜨거워졌다.\n' +
        '(2) 용액에 다른 용액을 넣으니 뿌옇게 흐려졌다.\n' +
        '(3) 물질의 덩어리가 잘게 부서졌다.\n' +
        '(4) 두 물질을 섞으니 기포가 발생했다.\n' +
        '(5) 시간이 지나면서 물질의 색깔이 변했다.',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(3)'],
      explanation:
        '(3)은 물질의 형태만 변하는 물리 변화입니다.\n' +
        '(1) 열 발생, (2) 침전 생성, (4) 기체 발생, (5) 색 변화는 모두 화학 반응의 증거가 될 수 있습니다.'
    },
    {
      id: 'q3',
      text:
        '3. 다음 화학 반응의 예시와 그 특징을 연결한 것으로 가장 적절하지 않은 것은 무엇입니까?\n\n' +
        '(1) 철이 녹슬어 갈색으로 변함 - 색깔 변화\n' +
        '(2) 식초와 베이킹소다를 섞으니 거품이 일어남 - 기체 발생\n' +
        '(3) 얼음이 녹아 물이 됨 - 상태 변화\n' +
        '(4) 폭죽이 터지면서 밝은 빛이 남 - 빛 발생\n' +
        '(5) 석회수에 이산화탄소를 불어넣으니 흰색 앙금이 생김 - 고체 생성',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(3)'],
      explanation:
        '(3)은 물리 변화(상태 변화) 예시입니다.\n' +
        '(1), (2), (4), (5)는 모두 화학 반응의 특징과 올바르게 연결된 예시입니다.'
    },
    {
      id: 'q4',
      text:
        '4. 화학 반응이 일어날 때, 반응 전과 후에 변하지 않는 것은 무엇입니까?\n\n' +
        '(1) 물질의 성질\n' +
        '(2) 물질의 색깔\n' +
        '(3) 물질의 냄새\n' +
        '(4) 원자의 종류와 수\n' +
        '(5) 입자 배열',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation:
        '질량 보존 법칙에 의해 반응 전후의 원자 종류와 총 수는 변하지 않습니다.\n' +
        '(1),(2),(3),(5)는 화학 반응 중에 변할 수 있습니다.'
    },
    {
      id: 'q5',
      text:
        '5. 다음 중 화학 반응으로 인해 새로운 냄새가 발생하는 예로 가장 적절한 것은 무엇입니까?\n\n' +
        '(1) 향수를 뿌렸을 때 주변에 꽃 향기가 퍼진다.\n' +
        '(2) 냉장고에 있던 우유가 상해서 시큼한 냄새가 난다.\n' +
        '(3) 더운 여름날 땀을 흘린 후 불쾌한 냄새가 난다.\n' +
        '(4) 페인트를 칠한 방에서 독한 냄새가 난다.\n' +
        '(5) 숯불에 고기를 구울 때 맛있는 냄새가 난다.',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(2)'],
      explanation:
        '(2)는 우유가 부패하면서 새로운 물질이 생성되어 냄새가 나는 화학 반응 예시입니다.\n' +
        '나머지는 물리적 확산이나 휘발에 의한 냄새 변화입니다.'
    }
  ];

  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showExp, setShowExp] = useState({});

  const toggleChoice = (qId, choice) => {
    if (showResult) return;
    setSelected(prev => {
      const arr = prev[qId] || [];
      const next = arr.includes(choice)
        ? arr.filter(c => c !== choice)
        : [...arr, choice];
      return { ...prev, [qId]: next };
    });
  };

  const grade = () => setShowResult(true);
  const reset = () => {
    setSelected({});
    setShowResult(false);
    setShowExp({});
  };
  const exit = () => router.push('/chapters/Chapter1/chp1/chp1_02/VideoLearningScreen');

  const correctCount = questions.reduce((sum, q) => {
    const a = (selected[q.id] || []).sort().join();
    const b = q.correct.sort().join();
    return sum + (a === b ? 1 : 0);
  }, 0);

  const fetchDeadlineForChapter = async (chapter) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
        return res.data.deadline?.deadline || null;
      } catch (e) {
        console.error('데드라인 조회 실패:', e);
        return null;
      }
    };
    
  const handleCompleteLearning = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_02';
      const deadline = await fetchDeadlineForChapter(chapter);

      const result = await recordAttendanceOnComplete({
        studentId,
        chapter,
        deadline,
        token
      });

      if (result.success) {
        Alert.alert('완료', `학습 완료! 출결 상태: ${result.status}`);
        router.push('/chapters/Chapter1');
      } else {
        Alert.alert('오류', '출석 기록에 실패했습니다.');
      }
    } catch (err) {
      Alert.alert('오류', '예상치 못한 오류가 발생했습니다.');
      console.log(err)
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map(q => {
        const isCorrect =
          showResult &&
          (selected[q.id] || []).sort().join() === q.correct.sort().join();
        return (
          <View key={q.id} style={styles.questionBox}>
            <Text style={styles.questionText}>{q.text}</Text>
            {q.choices.map(choice => {
              const checked = (selected[q.id] || []).includes(choice);
              return (
                <TouchableOpacity
                  key={choice}
                  style={[
                    styles.choice,
                    checked && styles.choiceSelected,
                    showResult &&
                      (checked
                        ? styles.correct
                        : styles.wrong)
                  ]}
                  onPress={() => toggleChoice(q.id, choice)}
                >
                  <Text style={styles.choiceText}>
                    {checked ? '☑' : '☐'} {choice}
                  </Text>
                </TouchableOpacity>
              );
            })}
            {showResult && (
              <View style={styles.resultRow}>
                <Text style={styles.resultText}>
                  {isCorrect ? '✅ 정답입니다.' : '❌ 오답입니다.'}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setShowExp(prev => ({ ...prev, [q.id]: !prev[q.id] }))
                  }
                >
                  <Text style={styles.expButton}>
                    {showExp[q.id] ? '해설 숨기기' : '해설 보기'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {showResult && showExp[q.id] && (
              <View style={styles.explanationBox}>
                <Text style={styles.explanationText}>{q.explanation}</Text>
              </View>
            )}
          </View>
        );
      })}
      {!showResult ? (
        <TouchableOpacity style={styles.submitButton} onPress={grade}>
          <Text style={styles.submitButtonText}>체점하기</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.footer}>
          <Text style={styles.finalText}>
            총 {questions.length}문제 중 {correctCount}문제 정답
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>다시 풀기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={exit}>
            <Text style={styles.exitButtonText}>나가기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 학습 완료 버튼 */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteLearning}
      >
        <Text style={styles.completeButtonText}>학습 완료</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff7f5',
  },
  questionBox: {
    width: '90%',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 12,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
    color: '#333',
  },
  choice: {
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    backgroundColor: '#fafafa',
  },
  choiceSelected: {
    backgroundColor: '#e3f2fd',
  },
  correct: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  wrong: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  choiceText: {
    fontSize: 14,
    color: '#222',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  resultText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  expButton: {
    fontSize: 14,
    color: '#2196f3',
  },
  explanationBox: {
    marginTop: 6,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '90%',
    alignItems: 'center',
    marginVertical: 16,
  },
  finalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#f44336',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 학습 완료 버튼
  completeButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
