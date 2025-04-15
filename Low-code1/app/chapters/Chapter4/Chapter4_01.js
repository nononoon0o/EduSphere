import { View, Text } from 'react-native';

export const subtitle = "01 감각 기관";

export default function Chapter4_01() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{subtitle}</Text>
      <Text style={{ marginTop: 10 }}>
        이 단원에서는 물질이 어떻게 변화하고, 그 변화를 화학 반응식으로 표현하는 방법을 배웁니다.
      </Text>
    </View>
  );
}
