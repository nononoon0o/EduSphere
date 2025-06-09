import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import styles from '../../style/stuManageStyle/stuManageScreenStyle';
import BackButton from '../../components/BackButton';

export default function StudentManagementScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const fetchData = async () => {
    try {
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
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/stuManage/${item._id}`)}
    >
      <Text style={styles.studentName}>{item.nickname}</Text>
      <Text style={styles.detailText}>{t("stuManage.studentNumber")}: {item.studentNumber}</Text>
      <Text style={styles.detailText}>
        {t("stuManage.subjects")}: {item.subjects.map((s) => s.name).join(', ')}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>{t("stuManage.loading")}</Text>
      </View>
    );
  }

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

      <TouchableOpacity
        style={styles.dashboardButton}
        onPress={() => router.push('/stuManage/teacherDashboard')}
      >
        <Text style={styles.dashboardButtonText}>📊 {t("stuManage.goToDashboard")}</Text>
      </TouchableOpacity>
    </View>
  );
}
