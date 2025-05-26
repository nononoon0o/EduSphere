// app/chapters/Chapter1/chp1/chp1_03/EvaluationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { router } from 'expo-router';

export default function EvaluationScreen() {
  const questions = [
    {
      id: 'q1',
      text:
        '1. 화학 반응식을 사용하여 화학 반응을 나타낼 때, 반응물을 쓰는 위치는 어디입니까?\n\n' +
        '(1) 화살표의 오른쪽\n' +
        '(2) 화살표의 위쪽\n' +
        '(3) 화살표의 아래쪽\n' +
        '(4) 화살표의 왼쪽\n' +
        '(5) 화살표의 양쪽',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation:
        '화학 반응식에서 반응하기 전의 물질인 반응물은 화살표 (→)의 왼쪽에 위치합니다.'
    },
    {
      id: 'q2',
      text:
        '2. 화학 반응식에서 물질의 화학식 앞에 쓰이는 숫자를 무엇이라고 합니까?\n\n' +
        '(1) 원자 번호\n' +
        '(2) 질량수\n' +
        '(3) 산화수\n' +
        '(4) 계수\n' +
        '(5) 화학량론',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation:
        '화학 반응식에서 물질의 화학식 앞에 쓰이는 숫자는 계수이며, 반응하거나 생성되는 입자의 수를 나타냅니다.'
    },
    {
      id: 'q3',
      text:
        '3. 화학 반응식의 계수의 역할로 가장 적절한 것은 무엇입니까?\n\n' +
        '(1) 반응물의 종류를 나타낸다.\n' +
        '(2) 생성물의 종류를 나타낸다.\n' +
        '(3) 반응 속도를 조절한다.\n' +
        '(4) 반응 전후의 원자 수를 같게 맞춰준다.\n' +
        '(5) 반응에 필요한 에너지의 양을 나타낸다.',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation:
        '계수는 반응 전과 후의 각 원자의 수를 동일하게 맞춰 질량 보존의 법칙을 만족시키는 역할을 합니다.'
    },
    {
      id: 'q4',
      text:
        '4. 다음 화학 반응식에서 수소 분자(H₂)의 계수는 얼마입니까?\n\n' +
        '? H₂ + O₂ → 2 H₂O\n\n' +
        '(1) 1\n' +
        '(2) 2\n' +
        '(3) 3\n' +
        '(4) 4\n' +
        '(5) 5',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(2)'],
      explanation:
        '물(H₂O) 2개에 수소 원자 4개가 들어 있으므로, 반응 전에도 수소 원자 4개가 필요하여 H₂ 앞에 2가 와야 합니다.'
    },
    {
      id: 'q5',
      text:
        '5. 다음 중 화학 반응식을 올바르게 나타낸 것은 무엇입니까? (단, 계수는 생략하지 않았습니다.)\n\n' +
        '(1) H + O → H₂O\n' +
        '(2) H₂ + O → H₂O\n' +
        '(3) 2H + O₂ → H₂O\n' +
        '(4) 2H₂ + O₂ → 2H₂O\n' +
        '(5) H₂ + 2O₂ → 2H₂O',
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation:
        '2H₂ + O₂ → 2H₂O 는 반응물과 생성물의 원자 수가 같아 질량 보존 법칙을 만족합니다.'
    }
  ];

  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showExp, setShowExp] = useState({});

  const toggleChoice = (qId, choice) => {
    if (showResult) return;
    setSelected(prev => ({ ...prev, [qId]: [choice] }));
  };

  const grade = () => setShowResult(true);
  const reset = () => {
    setSelected({});
    setShowResult(false);
    setShowExp({});
  };
  const exit = () =>
    router.push('/chapters/Chapter1/chp1/chp1_03/VideoLearningScreen');

  const correctCount = questions.reduce((sum, q) => {
    const sel = (selected[q.id] || []).join();
    return sum + (sel === q.correct.join() ? 1 : 0);
  }, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map(q => {
        const isCorrect =
          showResult && (selected[q.id] || []).join() === q.correct.join();
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
});
