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
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const EXAMPLES = [
  { id: 'p1', type: 'physical', src: require('../../../../../../assets/images/fish.jpg'), label: '어항의 물이 준다' },
  { id: 'p2', type: 'physical', src: require('../../../../../../assets/images/water.jpg'), label: '물 끓이기' },
  { id: 'p3', type: 'physical', src: require('../../../../../../assets/images/sugar.jpg'), label: '설탕을 물에 녹이기' },
  { id: 'p4', type: 'physical', src: require('../../../../../../assets/images/vat.jpg'), label: '채소 썰기' },
  { id: 'c1', type: 'chemical', src: require('../../../../../../assets/images/egg.jpg'), label: '계란 삶기기' },
  { id: 'c2', type: 'chemical', src: require('../../../../../../assets/images/candle.jpg'), label: '향초가 탄다다' },
  { id: 'c3', type: 'chemical', src: require('../../../../../../assets/images/fire.jpg'), label: '불꽃놀이' },
  { id: 'c4', type: 'chemical', src: require('../../../../../../assets/images/meet.jpg'), label: '고기 익히기' },
];

const DraggableImage = ({ image, dropZones, droppedImages, onDrop, resetTrigger }) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

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
        <Text style={styles.imageLabel}>{image.label}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

function learnScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [dropZones, setDropZones] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [showPhysicalExplanation, setShowPhysicalExplanation] = useState(false);
  const [showChemicalExplanation, setShowChemicalExplanation] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

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
    setResetCounter(prev => prev + 1);
  };

  useEffect(() => {
    if (droppedImages.length === EXAMPLES.length) {
      const allCorrect = droppedImages.every(img => img.type === img.droppedZone);
      setResultMessage(t('learn.resultCorrect'));
    } else {
      setResultMessage('');
    }
  }, [droppedImages]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>{t('learn.back')}</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{t('learn.instruction')}</Text>
      <View style={styles.sectionsRow}>
        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'physical')}>
          <Text style={styles.dropZoneTitle}>{t('learn.physicalChange')}</Text>
          <View style={styles.innerDropZone}>
            {droppedImages.filter((img) => img.droppedZone === 'physical').map((img) => (
              <Pressable key={img.id} onPress={() => handleRemoveImage(img.id)}>
                <Image source={img.src} style={styles.image} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'chemical')}>
          <Text style={styles.dropZoneTitle}>{t('learn.chemicalChange')}</Text>
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

      {resultMessage.includes(t('learn.correctKeyword')) && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title={t('learn.showPhysical')} onPress={() => setShowPhysicalExplanation(true)} color="#2980b9" />
          <View style={{ height: 10 }} />
          <Button title={t('learn.showChemical')} onPress={() => setShowChemicalExplanation(true)} color="#e67e22" />
        </View>
      )}

      {resultMessage.includes(t('learn.wrongKeyword')) && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title={t('learn.retry')} onPress={handleReset} color="#cc0000" />
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
  imageLabel: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
});

export default learnScreen;
