import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Vibration,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DraggableCircle = ({ label, onDrop, isFused, setHoverZone }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: false,
        }).start();
      },
      onPanResponderMove: (_, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });

        const dropY = gesture.moveY;
        if (dropY > 300) {
          setHoverZone('chemistry');
        } else if (dropY > 100) {
          setHoverZone('physics');
        } else {
          setHoverZone(null);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        Animated.spring(scale, { toValue: 1, useNativeDriver: false }).start();
        setHoverZone(null);
        onDrop(label, gesture.moveY);

        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.circle,
        pan.getLayout(),
        { transform: [...pan.getTranslateTransform(), { scale }] },
        isFused && styles.fusedCircle,
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.circleText}>{label}</Text>
    </Animated.View>
  );
};

const LearnScreen = () => {
  const [physicsMolecules, setPhysicsMolecules] = useState([]);
  const [chemistryMolecules, setChemistryMolecules] = useState([]);
  const [fusedMolecules, setFusedMolecules] = useState([]);
  const [hoverZone, setHoverZone] = useState(null);

  const physicsPulse = useRef(new Animated.Value(1)).current;
  const chemistryPulse = useRef(new Animated.Value(1)).current;

  const animatePulse = (animatedValue) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.05,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (hoverZone === 'physics') {
      animatePulse(physicsPulse);
    } else {
      physicsPulse.setValue(1);
    }

    if (hoverZone === 'chemistry') {
      animatePulse(chemistryPulse);
    } else {
      chemistryPulse.setValue(1);
    }
  }, [hoverZone]);

  const initialMolecules = ['E1', 'E1', 'E2', 'E2'];

  const triggerHaptic = () => {
    Vibration.vibrate(100);
  };

  const onDrop = (label, y) => {
    const chemistryZoneY = 300;
    const physicsZoneY = 100;

    if (y > chemistryZoneY) {
      setChemistryMolecules((prev) => [...prev, label]);
    } else if (y > physicsZoneY) {
      setPhysicsMolecules((prev) => [...prev, label]);
    }
  };

  useEffect(() => {
    const checkFusion = (list, setList, zoneName) => {
      const counts = {};
      list.forEach((mol) => {
        counts[mol] = (counts[mol] || 0) + 1;
      });

      Object.keys(counts).forEach((mol) => {
        if (!mol.startsWith('F-') && counts[mol] >= 2) {
          setList((prev) => {
            const filtered = prev.filter((m) => m !== mol);
            return [...filtered, `F-${mol}`];
          });
          setFusedMolecules((prev) => [
            ...prev,
            { from: mol, fused: `F-${mol}`, zone: zoneName },
          ]);
          triggerHaptic();
        }
      });
    };

    checkFusion(physicsMolecules, setPhysicsMolecules, 'physics');
    checkFusion(chemistryMolecules, setChemistryMolecules, 'chemistry');
  }, [physicsMolecules, chemistryMolecules]);

  const resetGame = () => {
    setPhysicsMolecules([]);
    setChemistryMolecules([]);
    setFusedMolecules([]);
    setHoverZone(null);  // Clear hover zone when resetting the game
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔬 Drag Molecules to Zones</Text>

      <View style={styles.moleculeRow}>
        {initialMolecules.map((mol, index) => (
          <DraggableCircle
            key={`${mol}-${index}`}
            label={mol}
            onDrop={onDrop}
            isFused={false}
            setHoverZone={setHoverZone}
          />
        ))}
      </View>

      <Animated.View
        style={[
          styles.zone,
          { transform: [{ scale: physicsPulse }] },
          hoverZone === 'physics' && styles.zoneHover,
        ]}
      >
        <Text style={styles.zoneTitle}>⚙️ 물리 변화</Text>
        <View style={styles.zoneRow}>
          {physicsMolecules.map((mol, index) => (
            <DraggableCircle
              key={`physics-${mol}-${index}`}
              label={mol}
              onDrop={onDrop}
              isFused={mol.startsWith('F-')}
              setHoverZone={setHoverZone}
            />
          ))}
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.zone,
          { transform: [{ scale: chemistryPulse }] },
          hoverZone === 'chemistry' && styles.zoneHover,
        ]}
      >
        <Text style={styles.zoneTitle}>🧪 화학 변화</Text>
        <View style={styles.zoneRow}>
          {chemistryMolecules.map((mol, index) => (
            <DraggableCircle
              key={`chem-${mol}-${index}`}
              label={mol}
              onDrop={onDrop}
              isFused={mol.startsWith('F-')}
              setHoverZone={setHoverZone}
            />
          ))}
        </View>
      </Animated.View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>게임 초기화</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#f0f8ff' },
  title: { fontSize: 22, textAlign: 'center', marginBottom: 10 },
  moleculeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  zone: {
    backgroundColor: '#e0f7fa',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    minHeight: 120,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  zoneHover: {
    borderColor: '#00cec9',
    backgroundColor: '#d0f0ec',
  },
  zoneTitle: { fontSize: 18, marginBottom: 10 },
  zoneRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#74b9ff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  fusedCircle: {
    backgroundColor: '#f39c12',
    transform: [{ scale: 1.2 }],
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#ff6f61',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LearnScreen;
