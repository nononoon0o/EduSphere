import { View, Text } from 'react-native';

export const subtitle = "02 신경계와 호르몬";

export default function Chapter4_02() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{subtitle}</Text>
      <Text style={{ marginTop: 10 }}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>
    </View>
  );
}
