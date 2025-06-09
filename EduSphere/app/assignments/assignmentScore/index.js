import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next'
import styles from '../../../style/assignments/assignmentsScoreStyle';
import { useRouter } from 'expo-router';
import BackButton from '../../../components/BackButton';

export default function AssignmentScoreIndex() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const fetchStudents = async () => {
    const token = await AsyncStorage.getItem('token');
    
    const teacherRes = await axios.get('http://localhost:5000/user/role', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const studentsRes = await axios.get('http://localhost:5000/api/students', {
      params: {
        classId: teacherRes.data.classId,
        subjects: teacherRes.data.subjects,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(studentsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/assignments/assignmentScore/${item._id}`)}
    >
      <Text style={styles.studentName}>{item.nickname}</Text>
      <Text style={styles.detailText}>{t("stuManage.studentNumber")}: {item.studentNumber}</Text>
      <Text style={styles.detailText}>
        {t("stuManage.subjects")}: {item.subjects.map((s) => s.name).join(', ')}
      </Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.push('/ProfileScreen')} />
      <Text style={styles.title}>담당 학생 목록</Text>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{t("stuManage.noStudents")}</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
