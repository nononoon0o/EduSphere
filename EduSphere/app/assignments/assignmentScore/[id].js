import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../../../style/assignments/assignmentsScoreStyle';
import { useTranslation } from 'react-i18next';

export default function AssignmentScoreStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentAndAssignments = async () => {
    const token = await AsyncStorage.getItem('token');
    const stuRes = await axios.get(`http://localhost:5000/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStudent(stuRes.data);

    const asnRes = await axios.get('http://localhost:5000/api/assignments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const assignmentList = asnRes.data.map((a) => ({
      label: a.title,
      value: a._id,
    }));
    setAssignments(assignmentList);
    setLoading(false);
  };

  const fetchSubmissions = async () => {
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
  };

  useEffect(() => {
    fetchStudentAndAssignments();
    fetchSubmissions();
  }, [selectedAssignment, id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
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
                {sub.stufileUrl && (
                  <Text
                    style={[styles.assignmentContent, { color: '#2563EB', textDecorationLine: 'underline' }]}
                    onPress={() => {
                      window.open(sub.stufileUrl, '_blank');
                    }}
                  >
                    {t('scoreStudent.fileLink')}
                  </Text>
                )}
                <Text style={styles.assignmentContent}>{t('scoreStudent.score', { score: sub.score ?? t('scoreStudent.notScored') })}</Text>
                <Text style={styles.assignmentContent}>{t('scoreStudent.submittedAt', { date: sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : t('scoreStudent.noSubmission') })}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>{t('scoreStudent.noSubmission')}</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
