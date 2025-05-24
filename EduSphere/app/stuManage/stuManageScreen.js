import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentManagementScreen() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      // 1. 교사 정보 조회
      const teacherRes = await axios.get('http://localhost:5000/user/role', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("교사 정보:", teacherRes.data);

      // 2. 학생 목록 조회
      const studentsRes = await axios.get('http://localhost:5000/api/students', {
        params: {
          classId: teacherRes.data.classId,
          subjects: teacherRes.data.subjects
        },
        headers: { Authorization: `Bearer ${token}` }
      });

      setStudents(studentsRes.data);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => router.push(`/stuManage/${item._id}`)}
    >
      <Text style={styles.name}>{item.nickname}</Text>
      <Text>학번: {item.studentNumber}</Text>
      <Text>수강과목: {item.subjects.map(s => s.name).join(', ')}</Text>
    </TouchableOpacity>
  );

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        renderItem={renderStudentItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={<Text>학생이 없습니다</Text>}
      />
      <TouchableOpacity
        style={styles.item}
        onPress={() => router.push('/stuManage/teacherDashboard')}
      >
        <Text style={styles.name}>대시보드로 이동</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ddd' },
  name: { fontSize: 16, fontWeight: 'bold' }
};
