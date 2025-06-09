import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const PreviousButton = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.circle}>
        <Ionicons name="chevron-back" size={24} color="#ecf900" />
      </View>
      <View style={styles.labelBox}>
        <Text style={styles.label}>{t('learnScreen.prev')}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fce7f3',
    borderRadius: 40,
    padding: 6,
    paddingLeft: 6,
    width: 200,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8ebde5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#f472b6',
  },
  labelBox: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#9d174d',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PreviousButton;
