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
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/LearnScreenStyles';


const { width } = Dimensions.get('window');

const EXAMPLES = [
  { id: 'p1', type: 'physical', src: require('../../../../../assets/images/fish.jpg'), label: '어항의 물이 준다' },
  { id: 'p2', type: 'physical', src: require('../../../../../assets/images/water.jpg'), label: '물 끓이기' },
  { id: 'p3', type: 'physical', src: require('../../../../../assets/images/sugar.jpg'), label: '설탕을 물에 녹이기' },
  { id: 'p4', type: 'physical', src: require('../../../../../assets/images/vat.jpg'), label: '채소 썰기' },

  { id: 'c1', type: 'chemical', src: require('../../../../../assets/images/egg.jpg'), label: '계란 삶기기' },
  { id: 'c2', type: 'chemical', src: require('../../../../../assets/images/candle.jpg'), label: '향초가 탄다다' },
  { id: 'c3', type: 'chemical', src: require('../../../../../assets/images/fire.jpg'), label: '불꽃놀이' },
  { id: 'c4', type: 'chemical', src: require('../../../../../assets/images/meet.jpg'), label: '고기 익히기' },
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
        <Text style={styles.imageLabel}>{image.label}</Text> {/* 여기 추가! */}
      </Animated.View>
    </GestureDetector>
  );
};

function learnScreen() {
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_01')}>
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
            <Text style={styles.explanationTitle}>🧪 설탕을 물에 녹인다 : </Text>
          <Text>1. 물질의 성질이 변하지 않아요!</Text>
          <Text>설탕을 물에 넣으면 설탕이 물속에 골고루 퍼질 뿐, 설탕 자체가 다른 물질로 바뀌는 건 아니에요. → 화학 반응이 일어나지 않고, 설탕은 여전히 설탕이에요!</Text>
          <Text>2. 되돌릴 수 있어요!</Text>
          <Text>물을 증발시키면 다시 설탕 결정이 생겨요. → 즉, 설탕을 다시 원래 상태로 되돌릴 수 있기 때문에, 이건 물리 변화입니다.</Text>
          <Text>3. 입자 구조가 그대로예요!</Text>
          <Text>물에 녹은 설탕은 입자 단위로 나뉘어 퍼지지만, 그 입자 자체의 구조는 변하지 않아요. → 원자나 분자의 배열이 바뀌는 화학 반응이 일어나지 않기 때문이에요.</Text>
          <Text style={styles.explanationTitle}>🧪 설탕을 물에 녹인다 : </Text>
          <Text>1. 물 자체는 변하지 않아요!</Text>
          <Text>물을 끓이면 **액체 상태의 물이 기체(수증기)**로 변하지만, 그 본질은 여전히 **물(H₂O)**이에요. → 물이 다른 물질로 바뀌지 않기 때문에 화학 변화가 아니라 물리 변화예요.</Text>
          <Text>2. 되돌릴 수 있어요!</Text>
          <Text>수증기를 식히면 다시 물로 만들 수 있어요. → 되돌릴 수 있는 변화는 물리 변화의 대표적인 특징이죠!</Text>
          <Text>3. 입자 구조가 변하지 않아요!</Text>
          <Text>끓는 동안 물 입자들이 더 빠르게 움직일 뿐, 그 입자(분자) 자체가 바뀌거나 새로운 물질이 생기지는 않아요.</Text>
          <Text style={styles.explanationTitle}>🧪 채소를 썬다 : </Text>
          <Text>1. 물질의 성질이 그대로예요!</Text>
          <Text>채소를 아무리 잘게 썰어도, 그것은 여전히 채소예요. → 색깔, 맛, 냄새, 성분 모두 변하지 않기 때문에 화학 반응이 일어난 게 아니에요.</Text>
          <Text>2. 단지 모양만 바뀌어요</Text>
          <Text>채소를 써는 것은 단순히 형태나 크기만 달라지는 거예요. → 이런 변화를 물리 변화라고 해요.</Text>
          <Text>3. 되돌릴 수는 없지만, 새로운 물질은 안 생겨요</Text>
          <Text>되돌리기 어렵긴 하지만, 중요한 건 새로운 물질이 생기지 않았다는 것!</Text>
          <Text style={styles.explanationTitle}>🧪 채소를 썬다 : </Text>
          <Text>1. 물의 성분이 변하지 않아요!</Text>
          <Text>어항의 물이 줄어드는 이유는 물이 **기체(수증기)**로 증발하기 때문이에요. → 이때 물(H₂O)은 그대로 물입니다.</Text>
          <Text>2. 되돌릴 수 있어요!</Text>
          <Text>공기 중으로 증발한 물은 다시 응결하면 물방울이 되어 돌아올 수 있어요. → 되돌릴 수 있는 변화는 물리 변화의 특징입니다.</Text>
          <Text>3. 입자 구조가 바뀌지 않아요!</Text>
          <Text>물은 단지 **상태(액체 → 기체)**만 바뀌었을 뿐, 입자 구조는 그대로입니다. → 화학 반응처럼 새로운 물질이 생성되지는 않아요.</Text>
          <Text>                                                           </Text>
              <Button title="닫기" onPress={() => setShowPhysicalExplanation(false)} />
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={showChemicalExplanation} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
            <Text style={styles.explanationTitle}>🔥 향초를 피운다 : </Text>
          <Text>1. 새로운 물질이 생겨요!  </Text>
          <Text>향초가 타면 원래 있던 파라핀(초의 주성분)이 공기 중의 산소와 반응해 **이산화탄소(CO₂)**와 **물(H₂O)**이라는 전혀 다른 물질로 바뀌어요. 이처럼 원래 있던 물질이 다른 물질로 바뀌는 것이 바로 화학 변화입니다.</Text>
          <Text>2. 연소(탈 때)는 화학 반응이에요!</Text>
          <Text>향초가 타는 건 "연소"라는 과정인데, 이건 물질이 산소와 빠르게 반응하면서 열과 빛을 내는 화학 반응이에요. → 단순히 모양이 바뀌는 물리 변화와는 달라요.</Text>
          <Text>3. 되돌릴 수 없어요</Text>
          <Text>향초가 다 타버리고 나면, 다시 원래의 향초로 되돌릴 수 없어요. 이처럼 되돌릴 수 없는 변화도 화학 변화의 특징이에요.</Text>
          <Text style={styles.explanationTitle}>🔥 고기가 익는다 : </Text>
          <Text>1. 단백질이 구조를 바꿔요!</Text>
          <Text>고기를 가열하면 단백질이 열에 의해 변성돼요. → 단백질 분자가 원래의 구조를 잃고 새로운 구조로 바뀌며, 고기의 색과 질감, 맛도 달라져요. 이는 단순히 모양이 변하는 게 아니라 분자의 구조 자체가 바뀌는 화학 반응이에요.</Text>
          <Text>2. 새로운 물질이 생겨요!</Text>
          <Text>열을 가할 때 고기 속의 아미노산과 당이 반응해서 갈색 물질이 생기고, 맛있는 향기와 맛도 함께 만들어져요. → 이 반응을 **마이야르 반응(Maillard Reaction)**이라고 해요.</Text>
          <Text>3. 되돌릴 수 없어요!</Text>
          <Text>익은 고기를 다시 생고기로 되돌릴 수 없죠? → 이처럼 되돌릴 수 없는 변화는 화학 반응의 대표적 특징이에요.</Text>
          <Text style={styles.explanationTitle}>🔥 불꽃놀이 : </Text>
          <Text>1. 새로운 물질이 생겨요!</Text>
          <Text>불꽃놀이 속에는 다양한 **화학 물질(금속 화합물)**이 들어 있어요. 이 물질들이 산소와 반응하면 폭발하면서 새로운 기체, 연기, 빛 등을 만들어냅니다. → 이 과정에서 원래의 물질이 완전히 다른 물질로 변하기 때문에 화학 변화입니다.</Text>
          <Text>2. 불꽃 색깔도 화학 반응 덕분이에요!</Text>
          <Text>스트론튬 → 빨간 불꽃    구리 → 파란 불꽃    나트륨 → 노란 불꽃</Text>
          <Text>이처럼 각 원소가 타면서 특정한 색의 불꽃을 내는 것도 화학 반응의 결과예요. → 빛의 색이 다르게 나오는 건, 원소의 전자가 열에너지로 들떴다가 다시 돌아오면서 생기는 에너지 변화 때문이에요.</Text>
          <Text>3. 되돌릴 수 없어요!</Text>
          <Text>한 번 터진 폭죽은 다시 원래의 상태로 되돌릴 수 없죠. → 되돌릴 수 없는 변화 = 화학 변화의 특징이에요.</Text>
          <Text style={styles.explanationTitle}>🔥 계란을 삶는다 : </Text>
          <Text>1. 단백질이 구조를 바꿔요 (변성 반응)</Text>
          <Text>달걀 흰자와 노른자에는 단백질이 많이 들어 있어요. → 이 단백질은 열을 받으면 원래의 복잡한 구조가 풀리고, 다시 엉켜서 새로운 구조로 바뀌어요.</Text>
          <Text>→ 이 과정이 바로 단백질 변성이라는 화학 반응입니다.</Text>
          <Text>예시: 익기 전엔 투명한 흰자가, 익으면 하얗고 단단하게 변하죠? → 이것이 단백질 구조가 바뀐 증거예요!</Text>
          <Text>2. 되돌릴 수 없어요!</Text>
          <Text>한 번 삶은 달걀은 다시 생달걀로 되돌릴 수 없죠? → 되돌릴 수 없는 변화는 물리 변화가 아닌 화학 변화의 중요한 특징이에요.</Text>
          <Text>                                                           </Text>
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
      
      <View style={styles.navigation}>
      {/* 이전 버튼 */}
      <TouchableOpacity
        style={styles.prevButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/ConceptSummaryScreen')}
      >
        <View style={styles.prevButtonCircle}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </View>
        <Text style={styles.prevButtonText}>이전</Text>
      </TouchableOpacity>

      {/* 다음 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/VideoLearningScreen')}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
        <View style={styles.nextButtonCircle}>
          <Text style={styles.nextButtonText}>다음</Text>
        </View>
      </TouchableOpacity>
    </View>
    </GestureHandlerRootView>
    
  );
};

export default learnScreen;
