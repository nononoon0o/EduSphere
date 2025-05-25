import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NavigationOnlyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      
      {/* 뒤로가기 버튼 */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_03')}>
            <Ionicons name="arrow-back" size={20} color="#2c3e50" />
            <Text style={styles.backText}>뒤로가기</Text>
        </TouchableOpacity>
      {/* 이전 버튼 */}
      <TouchableOpacity
        style={styles.prevButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/ConceptSummaryScreen')}
      >
        <View style={styles.prevCircle}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </View>
        <Text style={styles.prevText}>이전으로</Text>
      </TouchableOpacity>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/VideoLearningScreen')}
      >
        <Text style={styles.nextText}>다음으로</Text>
        <View style={styles.nextCircle}>
          <Ionicons name="arrow-forward" size={24} color="#3498db" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  prevButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  prevCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    marginLeft: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  nextCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
});
