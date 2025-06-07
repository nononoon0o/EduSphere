import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../../../style/ChapterStyle/Chapter3/chp3Styles/ChangesInMatterScreenStyles'; // Adjust the path as necessary


const ChangesInMatterScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← 돌아가기</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>1. 물질의 변화 (Changes in Matter)</Text>
        <Text style={styles.content}>
          물질은 물리적 변화와 화학적 변화로 나눌 수 있습니다.{"\n\n"}
          <Text style={styles.bold}>1.1 물리적 변화 (Physical Changes)</Text>{"\n"}
          물리적 변화는 물질의 상태나 모양이 바뀌지만 화학적 성질은 변하지 않는 변화입니다...{"\n\n"}
          <Text style={styles.bold}>1.2 화학적 변화 (Chemical Changes)</Text>{"\n"}
          화학적 변화는 물질이 변하여 새로운 물질이 형성되는 과정입니다...
        </Text>
      </View>
    </View>
  );
};

export default ChangesInMatterScreen;