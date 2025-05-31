import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import styles from '../../style/signupStyle/DetailStyle';
import BackButton from '../../components/BackButton';

const DetailForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [classId, setClassId] = useState("");
  const [role, setRole] = useState("student");
  const [studentNumber, setStudentNumber] = useState('');
  const [subjects, setSubjects] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!nickname) {
      setError('이름(닉네임)을 입력해주세요');
      return;
    }
    if (!school) {
      setError('학교명을 입력해주세요');
      return;
    }
    if (role === 'teacher' && !classId) {
      setError('담당 반을 입력해주세요');
      return;
    }
    if (role === 'student') {
      if (!studentNumber) {
        setError('학번을 입력해주세요');
        return;
      }
      if (!subjects) {
        setError('수강 과목을 입력해주세요');
        return;
      }
    }

    const subjectsArray = subjects.split(',').map(s => s.trim()).filter(s => s.length > 0);

    try {
      const response = await axios.post('http://localhost:5000/api/signup/details', {
        nickname,
        school,
        classId,
        role,
        studentNumber,
        subjects: subjectsArray,
      }, { withCredentials: true, headers: { 'Content-Type': 'application/json' }});

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
    <View style={styles.container}>
      <BackButton target="/signup/password" color="#fff" />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>추가 정보를 입력해주세요</Text>
      </View>

      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'student' && styles.activeRole]}
          onPress={() => setRole('student')}
        >
          <Text style={styles.buttonText}>학생</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === 'teacher' && styles.activeRole]}
          onPress={() => setRole('teacher')}
        >
          <Text style={styles.buttonText}>교사</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이름(닉네임)"
          placeholderTextColor="#bbb"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="학교명"
          placeholderTextColor="#bbb"
          value={school}
          onChangeText={setSchool}
        />
      </View>

      {role === 'student' && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="반 입력"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={classId}
              onChangeText={setClassId}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="학번"
              placeholderTextColor="#bbb"
              keyboardType="numeric"
              value={studentNumber}
              onChangeText={setStudentNumber}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="수강 과목 (콤마로 구분)"
              placeholderTextColor="#bbb"
              value={subjects}
              onChangeText={setSubjects}
            />
          </View>
        </>
      )}

      {role === 'teacher' && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="담당 반 (예: 2025-111)"
              placeholderTextColor="#bbb"
              value={classId}
              onChangeText={setClassId}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="담당 과목 (예: 수학)"
              placeholderTextColor="#bbb"
              value={subjects}
              onChangeText={setSubjects}
            />
          </View>
        </>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>다음 단계로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailForm;
