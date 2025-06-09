import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/assignments/assignmentDetailStyle';
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data || !res.data.assignment) {
        setError(t('assignment.errorFetch'));
        setAssignment(null);
        return;
      }

      setAssignment(res.data.assignment);
    } catch (err) {
      setError(t('assignment.errorFetch'));
      setAssignment(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const handleDownload = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const fileId = assignment.teafileId;
      const url = `http://localhost:5000/api/assignments/files/${fileId}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        alert(t('assignment.downloadFail'));
        return;
      }

      const contentDisposition = res.headers.get('Content-Disposition');
      let filename = t('assignment.defaultFilename');
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }

      const blob = await res.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      alert(t('assignment.downloadError'));
      console.log(err);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!assignment) return <Text style={styles.error}>{t('assignment.notFound')}</Text>;

  return (
  <View style={styles.container}>
    <BackButton onPress={() => navigation.goBack()} />

    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.title}>
          {assignment.title}
        </Text>

        <Text style={styles.label}>{t('assignment.description')}</Text>
        <Text style={styles.text}>
          {assignment.description}
        </Text>

        <Text style={styles.label}>{t('assignment.dueDate')}</Text>
        <View style={styles.dueDateBadge}>
          <Text style={styles.dueDateText}>
            {assignment.dueDate
              ? new Date(assignment.dueDate).toLocaleDateString()
              : '-'}
          </Text>
        </View>

        {assignment.teafileId && (
          <TouchableOpacity onPress={handleDownload}>
            <Text style={styles.downloadLink}>📎 {t('assignment.download')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  </View>
);

}
