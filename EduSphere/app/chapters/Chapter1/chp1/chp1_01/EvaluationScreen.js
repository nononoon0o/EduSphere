// app/chapters/Chapter1/chp1/chp1_01/EvaluationScreen.js
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
import { recordAttendanceOnComplete } from '../../../../service/attendanceService';
import axios from 'axios';

export default function EvaluationScreen() {
  const questions = [
    {
      id: 'q1',
      text:
        '1. 다음 중 물리 변화에 해당하는 현상을 모두 고르시오.\n\n' +
        '가. 나무가 타서 숯이 되었다.\n' +
        '나. 물이 증발하여 수증기가 되었다.\n' +
        '다. 철 못이 시간이 지나 녹슬었다.\n' +
        '라. 유리컵이 바닥에 떨어져 깨졌다.\n' +
        '마. 설탕이 물에 녹아 설탕물이 되었다.',
      choices: ['가', '나', '다', '라', '마'],
      correct: ['나', '라', '마'],
      explanation:
        '나) 물 분자 자체는 그대로 → 상태 변화만 (물리)\n' +
        '라) 형태만 부서짐 → 성질 변화 없음 (물리)\n' +
        '마) 분자 확산만 → 원래 설탕 성질 유지 (물리)'
    },
    {
      id: 'q2',
      text:
        '2. 다음 현상을 물리 변화와 화학 변화로 바르게 짝지은 것은 무엇입니까?\n\n' +
        'A. 종이를 찢었다.\n' +
        'B. 우유가 상해서 신맛이 난다.\n' +
        'C. 드라이아이스가 승화했다.\n' +
        'D. 달걀을 삶았다.',
      choices: ['A', 'B', 'C', 'D'],
      correct: ['A', 'B', 'C', 'D'],
      explanation:
        'A) 물리 변화\n' +
        'B) 화학 변화 (젖산 생성)\n' +
        'C) 물리 변화 (상태 변화)\n' +
        'D) 화학 변화 (단백질 변성)'
    },
    {
      id: 'q3',
      text:
        '3. 다음 중 화학 변화의 특징이 아닌 것은 무엇입니까?\n\n' +
        '(1) 새로운 물질이 생성된다.\n' +
        '(2) 물질의 고유한 성질이 변하지 않는다.\n' +
        '(3) 변화 과정에서 열이나 빛이 발생할 수 있다.\n' +
        '(4) 원래의 상태로 되돌리기가 어렵다.\n' +
        '(5) 원자의 배열 방식이 변한다.',
      choices: ['1', '2', '3', '4', '5'],
      correct: ['2'],
      explanation:
        '화학 변화는 고유 성질이 변하며(답 2번은 틀린 설명) → 새로운 물질 생성'
    },
    {
      id: 'q4',
      text:
        '4. 다음 중 화학 변화에 해당하는 현상은 무엇입니까?\n\n' +
        '(가) 촛불이 타는 현상\n' +
        '(나) 옷에 묻은 잉크가 물에 번지는 현상\n' +
        '(다) 사과를 깎아 놓으니 갈색으로 변하는 현상\n' +
        '(라) 쇠젓가락이 구부러지는 현상',
      choices: ['가', '나', '다', '라'],
      correct: ['가', '다'],
      explanation:
        '가) 연소 반응 → CO₂·H₂O 생성\n' +
        '다) 산화 반응 → 갈색 물질 생성'
    },
    {
      id: 'q5',
      text:
        '5. 다음 중 물리 변화와 화학 변화를 가장 잘 구분하는 기준은 무엇입니까?\n\n' +
        '(1) 물질의 색깔 변화 여부\n' +
        '(2) 물질의 상태 변화 여부\n' +
        '(3) 새로운 물질 생성 여부\n' +
        '(4) 변화의 속도 차이\n' +
        '(5) 에너지 흡수 또는 방출 여부',
      choices: ['1', '2', '3', '4', '5'],
      correct: ['3'],
      explanation:
        '새로운 물질 생성 여부 → 화학 변화의 핵심 기준'
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
  const retry = () => {
    setSelected({});
    setShowResult(false);
    setShowExp({});
  };
  const exit = () => router.push('/chapters/Chapter1/chp1/chp1_01/VideoLearningScreen');

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
      const chapter = 'Chapter1_01';
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
                        : q.correct.includes(choice)
                        ? {}
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
          <TouchableOpacity style={styles.resetButton} onPress={retry}>
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
