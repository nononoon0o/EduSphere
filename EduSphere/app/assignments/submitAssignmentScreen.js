import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style/assignments/submitAssignmentScreenStyle';
import { useTranslation } from 'react-i18next';

export default function SubmitAssignmentScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const assignmentList = res.data.map((a) => ({
        label: a.title,
        value: a._id,
      }));
      setAssignments(assignmentList);
    } catch (e) {
      Alert.alert(t('submit.error'), t('submit.fetchError'));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/assignments/submit',
        {
          assignmentId: selectedAssignment,
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert(t('submit.success'), t('submit.successMessage'));
      setTitle('');
      setContent('');
      setSelectedAssignment(null);
    } catch (e) {
      Alert.alert(t('submit.error'), t('submit.submitError'));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('submit.title')}</Text>

          <Dropdown
            style={styles.dropdown}
            data={assignments}
            labelField="label"
            valueField="value"
            placeholder={t('submit.selectAssignment')}
            value={selectedAssignment}
            onChange={(item) => setSelectedAssignment(item.value)}
            maxHeight={300}
          />

          <TextInput
            style={styles.input}
            placeholder={t('submit.assignmentTitle')}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={t('submit.content')}
            value={content}
            onChangeText={setContent}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('submit.submit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
