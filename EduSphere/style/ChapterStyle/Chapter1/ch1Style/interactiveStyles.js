import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
    backgroundColor: '#e6f0ff', // bright blue-gray background
  },

  questionBox: {
    width: '92%',
    backgroundColor: '#ffffff',
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  questionText: {
    fontSize: 17,
    marginBottom: 12,
    lineHeight: 25,
    color: '#1e3a8a', // dark blue
    fontWeight: '700',
  },

  choice: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f9fafb',
  },

  choiceSelected: {
    backgroundColor: '#dbeafe', // soft blue
    borderColor: '#3b82f6',
  },

  correct: {
    backgroundColor: '#d1fae5', // light green
    borderColor: '#10b981',
  },

  wrong: {
    backgroundColor: '#fee2e2', // light red
    borderColor: '#ef4444',
  },

  choiceText: {
    fontSize: 15,
    color: '#111827',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  resultText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },

  expButton: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },

  explanationBox: {
    marginTop: 10,
    backgroundColor: '#fefce8',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#facc15', // yellow border
  },

  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4b5563',
  },

  submitButton: {
    backgroundColor: '#3b82f6', // blue
    paddingVertical: 14,
    width: '92%',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 14,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  footer: {
    width: '92%',
    alignItems: 'center',
    marginVertical: 24,
  },

  finalText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 18,
  },

  resetButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },

  resetButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },

  exitButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderRadius: 12,
  },

  exitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },

  completeButton: {
    backgroundColor: '#10b981',
    paddingVertical: 14,
    width: '92%',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 30,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default styles;
