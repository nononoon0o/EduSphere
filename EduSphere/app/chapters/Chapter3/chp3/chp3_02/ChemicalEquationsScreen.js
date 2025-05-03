import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ChemicalEquationsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← 돌아가기</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>2. 화학 반응식 (Chemical Equations)</Text>
        <Text style={styles.content}>
          화학 반응은 반응물과 생성물, 그리고 그들의 비율을 화학 반응식으로 나타냅니다...{"\n\n"}
          주요 구성 요소:{"\n"}- Reactants (반응물), Products (생성물),{" "}
          Coefficients (계수), State Symbols (상태 기호){"\n\n"}
          예: 2H₂O (l) → 2H₂ (g) + O₂ (g){"\n"}
          예: CH₄ + 2O₂ → CO₂ + 2H₂O{"\n\n"}
          일부 반응은 에너지를 방출하고, 일부는 흡수합니다...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    backgroundColor: '#2E1A83',
    borderRadius: 25,
    padding: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
});

export default ChemicalEquationsScreen;