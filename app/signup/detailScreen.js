import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';
import styles from '../../style/signupStyle/DetailStyle';

const DetailForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [classId, setClassId] = useState("");
  const [role, setRole] = useState("student");
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
    console.log(nickname, school, classId, role)

    try {
      const response = await axios.post('http://localhost:5000/api/signup/details', {
        nickname,
        school,
        classId,
        role,
      }, { withCredentials: true,           
           headers: {
            'Content-Type': 'application/json'
           }
       });
      if (response.data.success) {
        router.push('/signup/nextscreen');
      }
    } catch (error) {
      console.log(error); // 이걸로 콘솔에 전체 로그 찍기
      if (error.response) {
        console.log("서버 응답 에러:", error.response.data);
        setError('서버 응답 에러: ' + JSON.stringify(error.response.data));
      } else if (error.request) {
        console.log("요청은 갔지만 응답이 없음:", error.request);
        setError('요청은 갔지만 응답이 없어요.');
      } else {
        console.log("기타 에러:", error.message);
        setError('에러 발생: ' + error.message);
      }
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={handleBack} style={styles.backIcon}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>추가 정보를 입력해주세요</Text>
      </View>

      {/* 역할 선택 */}
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'student' && styles.activeRole
          ]}
          onPress={() => setRole('student')}
        >
          <Text style={styles.buttonText}>학생</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'teacher' && styles.activeRole
          ]}
          onPress={() => setRole('teacher')}
        >
          <Text style={styles.buttonText}>교사</Text>
        </TouchableOpacity>
      </View>

    {/* 이름(닉네임) 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="이름(닉네임)"
            placeholderTextColor="#bbb"
            value={nickname}
            onChangeText={(text) => setNickname(text)}
        />
      </View>

      {/* 학교명 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="학교명"
          placeholderTextColor="#bbb"
          value={school}
          onChangeText={(text) => setSchool(text)}
        />
      </View>

      {/* 반 입력 (학생 전용) */}
      {role === 'student' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="반 입력"
            placeholderTextColor="#bbb"
            keyboardType="numeric"
            value={classId}
            onChangeText={(text) => setClassId(text)}
          />
        </View>
      )}

      {/* 담당 반 입력 (교사 전용) */}
      {role === 'teacher' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="담당 반 (예: 2025-111)"
            placeholderTextColor="#bbb"
            value={classId}
            onChangeText={(text) => setClassId(text)}
          />
        </View>
      )}

      {/* 에러 메시지 */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* 완료 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>다음 단계로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailForm;
