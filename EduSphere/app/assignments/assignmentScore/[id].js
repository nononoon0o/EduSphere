import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../../../style/assignments/assignmentsScoreStyle';
import BackButton from '../../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function AssignmentScoreStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [inputScores, setInputScores] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStudentAndAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // 학생 정보
      const stuRes = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(stuRes.data);

      // 전체 과제 목록
      const asnRes = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const assignmentList = asnRes.data.map((a) => ({
        label: a.title,
        value: a._id,
      }));
      setAssignments(assignmentList);
    } catch (err) {
      setAssignments([]);
      console.log(err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      if (!selectedAssignment) {
        setSubmissions([]);
        return;
      }
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/assignments/${selectedAssignment}/submission/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      setSubmissions([]);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentAndAssignments();
    fetchSubmissions();
  }, [selectedAssignment, id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  const handleScoreChange = (idx, value) => {
    setInputScores(prev => ({ ...prev, [idx]: value }));
  };

  const saveScore = async (submission) => {
    setSaving(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const score = Number(inputScores[submission._id]);
      await axios.patch(
        `http://localhost:5000/api/assignments/${selectedAssignment}/grade/${id}`,
        { score },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('점수 저장 완료!');
      // 점수 저장 후 제출물 새로고침
      await fetchSubmissions();
    } catch (e) {
      alert('점수 저장 실패!');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadSubmission = async (stufileId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const url = `http://localhost:5000/api/assignments/files/${stufileId}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert(t('assignment.downloadFail'));
        return;
      }

      const contentDisposition = res.headers.get('Content-Disposition');
      let filename = t('assignment.defaultFilename');;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      alert(t('assignment.downloadError'));
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.back()} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          {student ? t('scoreStudent.title', { name: student.nickname || student.name }) : ''}
        </Text>

        <Dropdown
          style={styles.dropdown}
          data={assignments}
          labelField="label"
          valueField="value"
          placeholder={t('scoreStudent.selectAssignment')}
          value={selectedAssignment}
          onChange={(item) => setSelectedAssignment(item.value)}
          maxHeight={300}
        />

        {selectedAssignment && (
          <View style={styles.card}>
            {submissions.length > 0 ? (
              submissions.map((sub, idx) => (
                <View key={idx} style={styles.submissionRow}>
                  <Text style={styles.assignmentContent}>{t('scoreStudent.submissionTitle')}: {sub.stuTitle}</Text>
                  <Text style={styles.assignmentContent}>{t('scoreStudent.submissionContent')}: {sub.stuContent}</Text>
                  {sub.stufileUrl ? (
                    <TouchableOpacity onPress={() => handleDownloadSubmission(sub.stufileUrl)}>
                      <Text style={styles.downloadLink}>
                        📎 {t('scoreStudent.fileLink')}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.attachmentText}>{t('scoreStudent.noSubmission')}</Text>
                  )}
                  <Text style={styles.assignmentContent}>{t('scoreStudent.score', { score: sub.score ?? t('scoreStudent.notScored') })}</Text>
                  <Text style={styles.assignmentContent}>{t('scoreStudent.submittedAt', { date: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : t('scoreStudent.noSubmission') })}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <TextInput
                      style={[styles.input, { width: 80, marginRight: 8 }]}
                      placeholder="과제 점수"
                      value={inputScores[sub._id] ?? ""}
                      onChangeText={val => handleScoreChange(sub._id, val)}
                      keyboardType="numeric"
                    />
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => saveScore(sub)}
                      disabled={saving}
                    >
                      <Text style={styles.saveButtonText}>
                        {saving ? '저장중...' : '저장'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>{t('scoreStudent.noSubmission')}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
