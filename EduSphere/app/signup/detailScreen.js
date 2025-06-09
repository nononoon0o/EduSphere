import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import styles from '../../style/signupStyle/DetailStyle';
import BackButton from '../../components/BackButton';

const DetailForm = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [classId, setClassId] = useState('');
  const [role, setRole] = useState('student');
  const [studentNumber, setStudentNumber] = useState('');
  const [subjects, setSubjects] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!nickname) return setError(t('detailForm.errors.nickname'));
    if (!school) return setError(t('detailForm.errors.school'));
    if (role === 'teacher' && !classId) return setError(t('detailForm.errors.classIdTeacher'));
    if (role === 'student') {
      if (!studentNumber) return setError(t('detailForm.errors.studentNumber'));
      if (!subjects) return setError(t('detailForm.errors.subjects'));
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
        setError(t('detailForm.errors.server') + JSON.stringify(error.response.data));
      } else if (error.request) {
        setError(t('detailForm.errors.noResponse'));
      } else {
        setError(t('detailForm.errors.unknown') + error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.card}>
        <Text style={styles.title}>{t('detailForm.title')}</Text>

        <View style={styles.roleSwitch}>
          <TouchableOpacity
            style={[styles.roleTab, role === 'student' && styles.activeTab]}
            onPress={() => setRole('student')}
          >
            <Text style={role === 'student' ? styles.activeTabText : styles.roleText}>
              {t('detailForm.student')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.roleTab, role === 'teacher' && styles.activeTab]}
            onPress={() => setRole('teacher')}
          >
            <Text style={role === 'teacher' ? styles.activeTabText : styles.roleText}>
              {t('detailForm.teacher')}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={t('detailForm.nickname')}
          placeholderTextColor="#aaa"
          value={nickname}
          onChangeText={setNickname}
        />
        <TextInput
          style={styles.input}
          placeholder={t('detailForm.school')}
          placeholderTextColor="#aaa"
          value={school}
          onChangeText={setSchool}
        />

        {role === 'student' && (
          <>
            <TextInput
              style={styles.input}
              placeholder={t('detailForm.classInput')}
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={classId}
              onChangeText={setClassId}
            />
            <TextInput
              style={styles.input}
              placeholder={t('detailForm.studentNumber')}
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={studentNumber}
              onChangeText={setStudentNumber}
            />
            <TextInput
              style={styles.input}
              placeholder={t('detailForm.subjects')}
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
              placeholder={t('detailForm.classIdTeacher')}
              placeholderTextColor="#aaa"
              value={classId}
              onChangeText={setClassId}
            />
            <TextInput
              style={styles.input}
              placeholder={t('detailForm.subjects')}
              placeholderTextColor="#aaa"
              value={subjects}
              onChangeText={setSubjects}
            />
          </>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>{t('detailForm.nextStep')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailForm;
