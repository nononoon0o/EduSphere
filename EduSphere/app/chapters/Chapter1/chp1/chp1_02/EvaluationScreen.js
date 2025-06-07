import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import axios from 'axios';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/EvaluationScreenStyle';
import BackButton from '../../../../../components/BackButton'; // ✅ 1. Import it

export default function EvaluationScreen() {
  const { t } = useTranslation();

  const questions = ['q1', 'q2', 'q3', 'q4', 'q5'].map(id => ({
    id,
    text: t(`evaluation2.${id}.text`),
    explanation: t(`evaluation2.${id}.explanation`),
    choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
    correct: {
      q1: ['(2)'],
      q2: ['(3)'],
      q3: ['(3)'],
      q4: ['(4)'],
      q5: ['(2)']
    }[id]
  }));

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

const exit = () => router.push('/chapters/Chapter1/Chapter1_01');


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
        Alert.alert(t('evaluation.complete'), t('evaluation.attendanceSuccess', { status: result.status }));
        router.push('/chapters/Chapter1');
      } else {
        Alert.alert(t('evaluation.error'), t('evaluation.attendanceFail'));
      }
    } catch (err) {
      Alert.alert(t('evaluation.error'), t('evaluation.unexpectedError'));
    }
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      {/* ✅ 2. Render the back button floating */}
      <BackButton onPress={() => router.back()} />

      {/* ✅ 3. Padding added to avoid overlap */}
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
                    style={[styles.choice, checked && styles.choiceSelected, showResult && (checked ? styles.correct : styles.wrong)]}
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
                  <TouchableOpacity onPress={() => setShowExp(prev => ({ ...prev, [q.id]: !prev[q.id] }))}>
                    <Text style={styles.expButton}>
                      {showExp[q.id] ? t('evaluation.hideExplanation') : t('evaluation.showExplanation')}
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
              {t('evaluation.finalResult', { correct: correctCount, total: questions.length })}
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={reset}>
              <Text style={styles.resetButtonText}>{t('evaluation.retry')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exitButton} onPress={exit}>
              <Text style={styles.exitButtonText}>{t('evaluation.exit')}</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteLearning}>
          <Text style={styles.completeButtonText}>{t('evaluation.completeLearning')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
