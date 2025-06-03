import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import styles from '../../style/signupStyle/DetailStyle';
import BackButton from '../../components/BackButton';

const DetailForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [classId, setClassId] = useState('');
  const [role, setRole] = useState('student');
  const [studentNumber, setStudentNumber] = useState('');
  const [subjects, setSubjects] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!nickname) return setError('이름(닉네임)을 입력해주세요');
    if (!school) return setError('학교명을 입력해주세요');
    if (role === 'teacher' && !classId) return setError('담당 반을 입력해주세요');
    if (role === 'student') {
      if (!studentNumber) return setError('학번을 입력해주세요');
      if (!subjects) return setError('수강 과목을 입력해주세요');
    }

    const subjectsArray = subjects.split(',').map(s => s.trim()).filter(s => s);

    try {
      const response = await axios.post('http://localhost:5000/api/signup/details', {
        nickname,
        school,
        classId,
        role,
        studentNumber,
        subjects: subjectsArray,
      }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        router.push('/signup/nextscreen');
      }
    } catch (error) {
      if (error.response) {
        setError('서버 응답 에러: ' + JSON.stringify(error.response.data));
      } else if (error.request) {
        setError('요청은 갔지만 응답이 없어요.');
      } else {
        setError('에러 발생: ' + error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <BackButton to="/signup/password" />
      <View style={styles.card}>
        <Text style={styles.title}>👋 추가 정보를 입력해주세요</Text>

        {/* Role Switch */}
        <View style={styles.roleSwitch}>
          <TouchableOpacity
            style={[styles.roleTab, role === 'student' && styles.activeTab]}
            onPress={() => setRole('student')}
          >
            <Text style={role === 'student' ? styles.activeTabText : styles.roleText}>학생</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleTab, role === 'teacher' && styles.activeTab]}
            onPress={() => setRole('teacher')}
          >
            <Text style={role === 'teacher' ? styles.activeTabText : styles.roleText}>교사</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="이름(닉네임)"
          placeholderTextColor="#aaa"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder="학교명"
          placeholderTextColor="#aaa"
          value={school}
          onChangeText={setSchool}
        />

        {role === 'student' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="반 입력"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={classId}
              onChangeText={setClassId}
            />
            <TextInput
              style={styles.input}
              placeholder="학번"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={studentNumber}
              onChangeText={setStudentNumber}
            />
            <TextInput
              style={styles.input}
              placeholder="수강 과목 (콤마로 구분)"
              placeholderTextColor="#aaa"
              value={subjects}
              onChangeText={setSubjects}
            />
          </>
        )}

        {role === 'teacher' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="담당 반 (예: 2025-111)"
              placeholderTextColor="#aaa"
              value={classId}
              onChangeText={setClassId}
            />
            <TextInput
              style={styles.input}
              placeholder="담당 과목 (예: 수학)"
              placeholderTextColor="#aaa"
              value={subjects}
              onChangeText={setSubjects}
            />
          </>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>다음 단계로</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailForm;
