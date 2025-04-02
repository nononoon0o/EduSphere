// components/FloatingAIButton.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { askGpt } from '../services/gptService';

export default function FloatingAIButton() {
  const pan = useState(new Animated.ValueXY({ x: 250, y: 500 }))[0];
  const [visible, setVisible] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {},
  });

  const handleAIWrite = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await askGpt(question);
      setAnswer(response);
    } catch (err) {
      setAnswer("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Animated.View
        style={[styles.floatingBtn, pan.getLayout()]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.aiButton}>
          <Ionicons name="sparkles-outline" size={20} color="#fff" />
          <Text style={styles.text}>Write with AI</Text>
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🧠 Ask AI something</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your question..."
              placeholderTextColor="#ccc"
              value={question}
              onChangeText={setQuestion}
              multiline
            />
            <TouchableOpacity onPress={handleAIWrite} style={styles.submitBtn}>
              <Text style={styles.submitText}>{loading ? 'Thinking...' : 'Submit'}</Text>
            </TouchableOpacity>
            {answer !== '' && <Text style={styles.answer}>{answer}</Text>}
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.close}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: 'absolute',
    zIndex: 999,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1.2,
    borderColor: '#8e44ad',
    shadowColor: '#8e44ad',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 10,
    elevation: 8,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    marginBottom: 12,
    fontSize: 15,
  },
  submitBtn: {
    backgroundColor: '#8e44ad',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  answer: {
    fontSize: 15,
    color: '#333',
    marginTop: 10,
    marginBottom: 12,
  },
  close: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
  },
});
