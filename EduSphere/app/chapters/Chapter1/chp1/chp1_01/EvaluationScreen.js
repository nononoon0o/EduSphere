import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import axios from 'axios';
import { saveQuizScore } from '../../../../../utils/saveQuizScore';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/EvaluationScreenStyle';
import { useTranslation } from 'react-i18next';
import BackButton from '../../../../../components/BackButton';

export default function EvaluationScreen() {
  const { t } = useTranslation();

  const questions = [
    {
      id: 'q1',
      text: t('evaluation.q1.text'),
      choices: ['가', '나', '다', '라', '마'],
      correct: ['나', '라', '마'],
      explanation: t('evaluation.q1.explanation')
    },
    {
      id: 'q2',
      text: t('evaluation.q2.text'),
      choices: ['A', 'B', 'C', 'D'],
      correct: ['A', 'B', 'C', 'D'],
      explanation: t('evaluation.q2.explanation')
    },
    {
      id: 'q3',
      text: t('evaluation.q3.text'),
      choices: ['1', '2', '3', '4', '5'],
      correct: ['2'],
      explanation: t('evaluation.q3.explanation')
    },
    {
      id: 'q4',
      text: t('evaluation.q4.text'),
      choices: ['가', '나', '다', '라'],
      correct: ['가', '다'],
      explanation: t('evaluation.q4.explanation')
    },
    {
      id: 'q5',
      text: t('evaluation.q5.text'),
      choices: ['1', '2', '3', '4', '5'],
      correct: ['3'],
      explanation: t('evaluation.q5.explanation')
    }
  ];

  const [selected, setSelected] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [showExp, setShowExp] = useState({});
  const [isSaved, setIsSaved] = useState(false); 

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

  const grade = async () => {
    handleCompleteLearning();
    setShowResult(true);
    if (!isSaved) {
      await handleSaveQuizScore();
    }
  }

  const retry = () => {
    setSelected({});
    setShowResult(false);
    setShowExp({});
  };

  const exit = async () => {
    if (!isSaved) await handleSaveQuizScore();
    router.push('/chapters/Chapter1');
  };

  const correctCount = questions.reduce((sum, q) => {
    const a = (selected[q.id] || []).sort().join();
    const b = q.correct.sort().join();
    return sum + (a === b ? 1 : 0);
  }, 0);

  const handleSaveQuizScore = async () => {
    try {
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_01';
      const quizScore = Math.round((correctCount / questions.length) * 100);
      const result = await saveQuizScore({ studentId, chapter, quizScore });
      if (result.success) {
        setIsSaved(true);
        Alert.alert('평가 점수가 저장되었습니다!');
      } else if (result.error?.response?.status === 409) {
        setIsSaved(true);
        Alert.alert('이미 평가 점수가 저장되어 있습니다.');
      } else {
        Alert.alert('점수 저장 실패', '다시 시도해 주세요.');
      }
    } catch (e) {
      Alert.alert('점수 저장 실패', '다시 시도해 주세요.');
      console.log(e);
    }
  };

  const fetchDeadlineForChapter = async (chapter) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      return res.data.deadline?.deadline || null;
    } catch (e) {
      console.error('Deadline fetch failed:', e);
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
        Alert.alert(t('evaluation.complete'), t('evaluation.attendanceSuccess', { status: result.status }));
      } else {
        Alert.alert(t('evaluation.error'), t('evaluation.attendanceFail'));
      }
    } catch (err) {
      Alert.alert(t('evaluation.error'), t('evaluation.unexpectedError'));
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <BackButton onPress={() => router.back()} />
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 100 }]}>
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
                    {isCorrect ? t('evaluation.correct') : t('evaluation.incorrect')}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setShowExp(prev => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                  >
                    <Text style={styles.expButton}>
                      {showExp[q.id]
                        ? t('evaluation.hideExplanation')
                        : t('evaluation.showExplanation')}
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
            <Text style={styles.submitButtonText}>{t('evaluation.grade')}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.footer}>
            <Text style={styles.finalText}>
              {t('evaluation.finalResult', { total: questions.length, correct: correctCount })}
            </Text>

            <Text style={{ color: 'green', marginTop: 8 }}>저장 완료! 이제 자유롭게 다시 풀 수 있습니다.(저장은 최초 한번만 저장됩니다)</Text>

            <TouchableOpacity style={styles.resetButton} onPress={retry}>
              <Text style={styles.resetButtonText}>{t('evaluation.retry')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitButton} onPress={exit}>
              <Text style={styles.exitButtonText}>{t('evaluation.exit')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
