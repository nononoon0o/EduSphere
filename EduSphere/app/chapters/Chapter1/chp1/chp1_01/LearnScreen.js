// LearnScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Button,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/LearnScreenStyles';
import BackButton from '../../../../../components/BackButton';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const EXAMPLES = [
  { id: 'p3', type: 'physical', src: require('../../../../../assets/images/sugar.jpg'), label: 'Dissolving sugar in water' },
  { id: 'p2', type: 'physical', src: require('../../../../../assets/images/water.jpg'), label: 'Boiling water' },
  { id: 'p4', type: 'physical', src: require('../../../../../assets/images/vat.jpg'), label: 'Cutting vegetables' },
  { id: 'p1', type: 'physical', src: require('../../../../../assets/images/fish.jpg'), label: 'Water level drops in a fish tank' },
  { id: 'c2', type: 'chemical', src: require('../../../../../assets/images/candle.jpg'), label: 'Burning a candle' },
  { id: 'c4', type: 'chemical', src: require('../../../../../assets/images/meet.jpg'), label: 'Cooking meat' },
  { id: 'c3', type: 'chemical', src: require('../../../../../assets/images/fire.jpg'), label: 'Fireworks' },
  { id: 'c1', type: 'chemical', src: require('../../../../../assets/images/egg.jpg'), label: 'Boiling an egg' }
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

function LearnScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [dropZones, setDropZones] = useState([]);
  const [droppedImages, setDroppedImages] = useState([]);
  const [resultMessage, setResultMessage] = useState('');
  const [resetCounter, setResetCounter] = useState(0);
  const [selectedExplanationKey, setSelectedExplanationKey] = useState(null);

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
    setSelectedExplanationKey(null);
    setResetCounter(prev => prev + 1);
  };

  const handleOpenExplanation = (key) => {
    setSelectedExplanationKey(key);
  };

  const handleCloseExplanation = () => {
    setSelectedExplanationKey(null);
  };

  useEffect(() => {
    if (droppedImages.length === EXAMPLES.length) {
      const allCorrect = droppedImages.every(img => img.type === img.droppedZone);
      setResultMessage(allCorrect ? 'correct' : 'wrong');
    } else {
      setResultMessage('');
    }
  }, [droppedImages]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_01')} />
      <Text style={styles.header}>{t('learnScreen.instruction')}</Text>

      <View style={styles.sectionsRow}>
        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'physical')}>
          <Text style={styles.dropZoneTitle}>{t('learnScreen.physical')}</Text>
          <View style={styles.innerDropZone}>
            {droppedImages.filter((img) => img.droppedZone === 'physical').map((img) => (
              <Pressable key={img.id} onPress={() => handleRemoveImage(img.id)}>
                <Image source={img.src} style={styles.image} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.dropZone} onLayout={(e) => onLayoutZone(e, 'chemical')}>
          <Text style={styles.dropZoneTitle}>{t('learnScreen.chemical')}</Text>
          <View style={styles.innerDropZone}>
            {droppedImages.filter((img) => img.droppedZone === 'chemical').map((img) => (
              <Pressable key={img.id} onPress={() => handleRemoveImage(img.id)}>
                <Image source={img.src} style={styles.image} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {resultMessage ? (
        <Text style={styles.resultMessage}>{t(`learnScreen.${resultMessage}`)}</Text>
      ) : null}

      {resultMessage === 'correct' && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title={t('learnScreen.viewPhysical')} onPress={() => handleOpenExplanation('physical')} color="#2980b9" />
          <View style={{ height: 10 }} />
          <Button title={t('learnScreen.viewChemical')} onPress={() => handleOpenExplanation('chemical')} color="#e67e22" />
        </View>
      )}

      {resultMessage === 'wrong' && (
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Button title={t('learnScreen.retry')} onPress={handleReset} color="#cc0000" />
        </View>
      )}

      <Modal visible={!!selectedExplanationKey} transparent animationType="slide" onRequestClose={handleCloseExplanation}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t(`learnScreen.explanations.${selectedExplanationKey}.title`)}
            </Text>
            <ScrollView>
              {
                (() => {
                  const points = t(`learnScreen.explanations.${selectedExplanationKey}.points`, { returnObjects: true });
                  return Array.isArray(points)
                    ? points.map((point, i) => (
                        <Text key={i} style={styles.modalText}>{point}</Text>
                      ))
                    : <Text style={styles.modalText}>{points}</Text>;
                })()
              }
            </ScrollView>
            <Button title={t('learnScreen.close')} onPress={handleCloseExplanation} />
          </View>
        </View>
      </Modal>

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
        <TouchableOpacity style={styles.prevButton} onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/ConceptSummaryScreen')}>
          <View style={styles.prevButtonCircle}><Ionicons name="arrow-back" size={24} color="#fff" /></View>
          <Text style={styles.prevButtonText}>{t('learnScreen.prev')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/VideoLearningScreen')}>
          <Ionicons name="arrow-forward" size={24} color="#fff" />
          <View style={styles.nextButtonCircle}><Text style={styles.nextButtonText}>{t('learnScreen.next')}</Text></View>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

export default LearnScreen;
