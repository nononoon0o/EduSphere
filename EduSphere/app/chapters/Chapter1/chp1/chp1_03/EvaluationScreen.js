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
import axios from 'axios';
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/EvaluationScreenStyle';
import { useTranslation } from 'react-i18next';

export default function EvaluationScreen() {
  const { t } = useTranslation();

  const questions = [
    {
      id: 'q1',
      text: t('chapter1_03.evaluation.q1.text'),
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation: t('chapter1_03.evaluation.q1.explanation')
    },
    {
      id: 'q2',
      text: t('chapter1_03.evaluation.q2.text'),
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation: t('chapter1_03.evaluation.q2.explanation')
    },
    {
      id: 'q3',
      text: t('chapter1_03.evaluation.q3.text'),
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation: t('chapter1_03.evaluation.q3.explanation')
    },
    {
      id: 'q4',
      text: t('chapter1_03.evaluation.q4.text'),
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(2)'],
      explanation: t('chapter1_03.evaluation.q4.explanation')
    },
    {
      id: 'q5',
      text: t('chapter1_03.evaluation.q5.text'),
      choices: ['(1)', '(2)', '(3)', '(4)', '(5)'],
      correct: ['(4)'],
      explanation: t('chapter1_03.evaluation.q5.explanation')
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
  const exit = () => router.push('/chapters/Chapter1/chp1/chp1_03/VideoLearningScreen');

  const correctCount = questions.reduce((sum, q) => {
    const sel = (selected[q.id] || []).join();
    return sum + (sel === q.correct.join() ? 1 : 0);
  }, 0);

  const fetchDeadlineForChapter = async (chapter) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      return res.data.deadline?.deadline || null;
    } catch (e) {
      console.error('Failed to fetch deadline:', e);
      return null;
    }
  };

  const handleCompleteLearning = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_03';
      const deadline = await fetchDeadlineForChapter(chapter);

      const result = await recordAttendanceOnComplete({
        studentId,
        chapter,
        deadline,
        token
      });

      if (result.success) {
        Alert.alert(
          t('chapter1_03.evaluation.completeTitle'),
          t('chapter1_03.evaluation.completeMessage', { status: result.status })
        );
        router.push('/chapters/Chapter1');
      } else {
        Alert.alert(
          t('chapter1_03.evaluation.errorTitle'),
          t('chapter1_03.evaluation.recordFail')
        );
      }
    } catch (err) {
      Alert.alert(
        t('chapter1_03.evaluation.errorTitle'),
        t('chapter1_03.evaluation.unexpected')
      );
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map(q => {
        const isCorrect = showResult && (selected[q.id] || []).join() === q.correct.join();
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
                    showResult && (checked ? styles.correct : styles.wrong)
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
                  {isCorrect
                    ? t('chapter1_03.evaluation.correct')
                    : t('chapter1_03.evaluation.incorrect')}
                </Text>
                <TouchableOpacity onPress={() =>
                  setShowExp(prev => ({ ...prev, [q.id]: !prev[q.id] }))
                }>
                  <Text style={styles.expButton}>
                    {showExp[q.id]
                      ? t('chapter1_03.evaluation.hideExplanation')
                      : t('chapter1_03.evaluation.showExplanation')}
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
          <Text style={styles.submitButtonText}>{t('chapter1_03.evaluation.submit')}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.footer}>
          <Text style={styles.finalText}>
            {t('chapter1_03.evaluation.totalResult', {
              correct: correctCount,
              total: questions.length
            })}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={reset}>
            <Text style={styles.resetButtonText}>{t('chapter1_03.evaluation.retry')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={exit}>
            <Text style={styles.exitButtonText}>{t('chapter1_03.evaluation.exit')}</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteLearning}>
        <Text style={styles.completeButtonText}>{t('chapter1_03.evaluation.complete')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
