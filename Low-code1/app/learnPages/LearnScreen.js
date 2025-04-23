import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Pressable, Button, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const EXAMPLES = [
  { id: 'p1', type: 'physical', src: require('../../../Low-code1/assets/images/fish.jpg') },
  { id: 'p2', type: 'physical', src: require('../../../Low-code1/assets/images/water.jpg') },
  { id: 'p3', type: 'physical', src: require('../../../Low-code1/assets/images/sugar.jpg') },
  { id: 'p4', type: 'physical', src: require('../../../Low-code1/assets/images/vat.jpg') },
  { id: 'c1', type: 'chemical', src: require('../../../Low-code1/assets/images/egg.jpg') },
  { id: 'c2', type: 'chemical', src: require('../../../Low-code1/assets/images/candle.jpg') },
  { id: 'c3', type: 'chemical', src: require('../../../Low-code1/assets/images/fire.jpg') },
  { id: 'c4', type: 'chemical', src: require('../../../Low-code1/assets/images/meet.jpg') },
];

const DraggableImage = ({ image, dropZones, droppedImages, onDrop, resetTrigger }) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // 초기화 트리거 감지 시 위치 리셋
  useEffect(() => {
    offsetX.value = 0;
    offsetY.value = 0;
  }, [resetTrigger]);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offsetX.value = e.translationX;
      offsetY.value = e.translationY;
    })
    .onEnd((e) => {
      let dropped = false;
      dropZones.forEach((zone) => {
        if (
          e.absoluteX >= zone.x &&
          e.absoluteX <= zone.x + zone.width &&
          e.absoluteY >= zone.y &&
          e.absoluteY <= zone.y + zone.height
        ) {
          runOnJS(onDrop)(image, zone.type);
          dropped = true;
        }
      });
      if (!dropped) {
        offsetX.value = 0;
        offsetY.value = 0;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
    opacity: droppedImages.some(img => img.id === image.id) ? 0 : 1,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        <Image source={image.src} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </GestureDetector>
  );
};

export default function DragDropChemistry() {
  const router = useRouter();
  const [dropZones, setDropZones] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [showPhysicalExplanation, setShowPhysicalExplanation] = useState(false);
  const [showChemicalExplanation, setShowChemicalExplanation] = useState(false);
  const [resetCounter, setResetCounter] = useState(0); // 리셋 트리거

  const onLayoutZone = (event, zoneType) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setDropZones((prev) => [...prev.filter(z => z.type !== zoneType), { type: zoneType, x, y, width, height }]);
  };

  const handleDrop = (image, zoneType) => {
    setDroppedImages((prev) => {
      const others = prev.filter((img) => img.id !== image.id);
      return [...others, { ...image, droppedZone: zoneType }];
    });
  };

  const handleRemoveImage = (id) => {
    setDroppedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleReset = () => {
    setDroppedImages([]);
    setResultMessage('');
    setShowPhysicalExplanation(false);
    setShowChemicalExplanation(false);
    setResetCounter(prev => prev + 1); // 위치 초기화 트리거 증가
  };

  useEffect(() => {
    if (droppedImages.length === EXAMPLES.length) {
      const allCorrect = droppedImages.every(img => img.type === img.droppedZone);
      setResultMessage(allCorrect ? '🎉 정답입니다! 각 변화의 설명을 확인해보세요.' : '❌ 다시 풀어보세요');
    } else {
      setResultMessage('');
    }
  }, [droppedImages]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>
      <Text style={styles.header}>변화 유형에 따라 이미지를 분류해보세요</Text>
      <View style={styles.sectionsRow}>
        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'physical')}>
          <Text style={styles.dropZoneTitle}>물리 변화</Text>
          <View style={styles.innerDropZone}>
            {droppedImages.filter((img) => img.droppedZone === 'physical').map((img) => (
              <Pressable key={img.id} onPress={() => handleRemoveImage(img.id)}>
                <Image source={img.src} style={styles.image} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'chemical')}>
          <Text style={styles.dropZoneTitle}>화학 변화</Text>
          <View style={styles.innerDropZone}>
            {droppedImages.filter((img) => img.droppedZone === 'chemical').map((img) => (
              <Pressable key={img.id} onPress={() => handleRemoveImage(img.id)}>
                <Image source={img.src} style={styles.image} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.resultMessage}>{resultMessage}</Text>

      {resultMessage.includes('정답') && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title="물리 변화 풀이 보기" onPress={() => setShowPhysicalExplanation(true)} color="#2980b9" />
          <View style={{ height: 10 }} />
          <Button title="화학 변화 풀이 보기" onPress={() => setShowChemicalExplanation(true)} color="#e67e22" />
        </View>
      )}

      <Modal visible={showPhysicalExplanation} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.explanationTitle}>🧪 물리 변화 풀이 예시</Text>
              {/* 여기에 상세 설명 추가 */}
              <Button title="닫기" onPress={() => setShowPhysicalExplanation(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showChemicalExplanation} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.explanationTitle}>🔥 화학 변화 풀이 예시</Text>
              {/* 여기에 상세 설명 추가 */}
              <Button title="닫기" onPress={() => setShowChemicalExplanation(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {resultMessage.includes('다시') && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title="다시 풀기" onPress={handleReset} color="#cc0000" />
        </View>
      )}
      <View style={styles.examplesContainer}>
        {EXAMPLES.map(example => (
          <DraggableImage
            key={example.id}
            image={example}
            dropZones={dropZones}
            droppedImages={droppedImages}
            onDrop={handleDrop}
            resetTrigger={resetCounter}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dropZone: {
    width: width * 0.4,
    height: 250,
    backgroundColor: '#cce5ff',
    borderColor: '#3399ff',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    padding: 10,
  },
  dropZoneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 10,
  },
  innerDropZone: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e6f2ff',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cc0000',
    marginBottom: 10,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    margin: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    margin: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
});
