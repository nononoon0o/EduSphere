import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chapter1_01() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {/* Back Navigation */}
        <TouchableOpacity
          onPress={() => router.replace('/chapters/Chapter1/Chapter1_main')}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={22} color="#fff" />
          <Text style={styles.backText}>돌아가기</Text>
        </TouchableOpacity>

        {/* Chapter Header */}
        <View style={styles.headerRow}>
          <Text style={styles.chapterTitle}>01. 물리 변화와 화학 변화</Text>
        </View>

        <View style={styles.divider} />

        {/* (개념요약) Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/learnPages/Chapter1_01/ConceptSummaryScreen')}
        >
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>📘</Text>
          </View>
          <Text style={styles.cardText}>(학습목표 & 개념요약)</Text>
        </TouchableOpacity>

        {/* (학습하기) Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/learnPages/Chapter1_01/LearnScreen')}
        >
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>📦</Text>
          </View>
          <Text style={styles.cardText}>(학습하기)</Text>
        </TouchableOpacity>

        {/* (영상 학습) Section */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push('/learnPages/Chapter1_01/VideoLearningScreen')}
        >
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>🎬</Text>
          </View>
          <Text style={styles.cardText}>(영상 학습)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'rgba(30,58,138,0.85)',
    borderRadius: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  backText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginLeft: 12,
    flex: 1,
    flexWrap: 'wrap',
  },
  divider: {
    height: 3,
    backgroundColor: '#aed6f1',
    marginVertical: 20,
    marginHorizontal: 50,
    borderRadius: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderColor: '#d0eafc',
    borderWidth: 1,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  bullet: {
    width: 45,
    height: 45,
    backgroundColor: '#2980b9',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  bulletText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardText: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    flexShrink: 1,
  },
});
