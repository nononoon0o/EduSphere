import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import FloatingAIButton from '../FloatingAIButton';
import { askGpt } from '../../services/gptService';

// Action Button
function ActionButton({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Ionicons name={icon} size={26} color="#fff" style={styles.icon} />
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  // 💡 Handle AI interaction
  const handleAIWrite = async () => {
    Alert.prompt(
      "Ask AI",
      "What do you want to know?",
      async (text) => {
        if (text) {
          try {
            const response = await askGpt(text);
            Alert.alert("🤖 AI says:", response);
          } catch (err) {
            console.error(err);
            Alert.alert("Error", "Could not get AI response.");
          }
        }
      }
    );
  };

  return (
    <>
      <ImageBackground
        source={require('../../assets/images/image 1.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>🔬 Welcome to the Molecule Game!</Text>

            <ActionButton
              icon="play-circle"
              label="Start Game"
              onPress={() => router.push('/GameScreen')}
            />
            <ActionButton
              icon="cube"
              label="View Inventory"
              onPress={() => router.push('/InventoryScreen')}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* Floating AI Button */}
      <FloatingAIButton onPress={handleAIWrite} />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    backdropFilter: 'blur(20px)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
  },
  buttonPressed: {
    backgroundColor: '#2980b9',
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
  },
  icon: {
    marginRight: 6,
  },
});
