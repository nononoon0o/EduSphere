import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/stuManageStyle/studentDetailStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const fetchStudent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
    } catch (err) {
      console.error(t('studentDetail.noStudentInfo'), err.response?.data || err.message);
    }
  };

  const fetchAttendance = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data.attendance || []);
    } catch (err) {
      console.error(t('studentDetail.attendanceStatus'), err.response?.data || err.message);
    }
  };

  const fetchAssignments = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error(t('studentDetail.assignmentStatus'), err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudent();
      await fetchAttendance(id);
      await fetchAssignments(id);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>{t('studentDetail.noStudentInfo')}</Text>
      </View>
    );
  }

  return (
    <View>
      <BackButton onPress={() => router.back()} />
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{student.nickname}</Text>
          <Text style={styles.infoText}>{t('studentDetail.studentNumber')}: {student.studentNumber}</Text>
          <Text style={styles.infoText}>{t('studentDetail.class')}: {student.classId}</Text>
          <Text style={styles.infoText}>{t('studentDetail.school')}: {student.school}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📚 {t('studentDetail.subjectScores')}</Text>
          {student.subjects?.length > 0 ? (
            student.subjects.map((s, idx) => (
              <Text key={idx} style={styles.subjectText}>
                {s.name}: <Text style={styles.scoreTag}>{s.score}{t('studentDetail.scoreUnit')}</Text>
              </Text>
            ))
          ) : (
            <Text style={styles.subjectText}>{t('studentDetail.noSubjectInfo')}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🕘 {t('studentDetail.attendanceStatus')}</Text>
          {attendance && Object.entries(attendance).map(([status, count]) => {
            const label = status === 'present' ? t('studentDetail.present')
                        : status === 'late' ? t('studentDetail.late')
                        : t('studentDetail.absent');
            const tagStyle = status === 'present' ? styles.tagGreen :
                            status === 'late' ? styles.tagYellow : styles.tagRed;

            return (
              <Text key={status} style={styles.attendanceText}>
                {label}: <Text style={tagStyle}>{count}{t('studentDetail.times')}</Text>
              </Text>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 {t('studentDetail.assignmentStatus')}</Text>
          {assignments.length > 0 ? (
            assignments.map((item, idx) => (
              <Text key={idx} style={styles.assignmentText}>
                {item.title}: 
                <Text style={item.submitted ? styles.tagGreen : styles.tagRed}>
                  {item.submitted ? t('studentDetail.submitted') : t('studentDetail.notSubmitted')}
                </Text>
                {item.score && <Text style={styles.scoreTag}> ({item.score}{t('studentDetail.scoreUnit')})</Text>}
              </Text>
            ))
          ) : (
            <Text style={styles.assignmentText}>{t('studentDetail.noAssignmentInfo')}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💬 {t('studentDetail.feedback')}</Text>
          <Text style={styles.feedbackText}>{t('studentDetail.teacherComment')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
