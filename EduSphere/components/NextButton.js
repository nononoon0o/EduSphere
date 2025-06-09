import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const NextButton = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{t('learnScreen.next')}</Text>
      </View>
      <View style={styles.circle}>
        <Ionicons name="chevron-forward" size={24} color="#ecf900" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    borderRadius: 40,
    padding: 6,
    paddingRight: 6,
    width: 200,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  labelBox: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8ebde5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  label: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NextButton;
