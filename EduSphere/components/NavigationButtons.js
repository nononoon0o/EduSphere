import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const NavigationButtons = ({ onPressPrev, onPressNext }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.navButtonsWrapper}>
      {/* Previous Button */}
      <TouchableOpacity style={styles.advancedPrevButton} onPress={onPressPrev}>
        <View style={styles.advancedPrevCircle}>
          <Ionicons name="chevron-back" size={24} color="#ecf900" />
        </View>
        <View style={styles.advancedPrevRight}>
          <Text style={styles.advancedPrevText}>{t('learnScreen.prev')}</Text>
        </View>
      </TouchableOpacity>

      {/* Next Button */}
      <TouchableOpacity style={styles.advancedNextButton} onPress={onPressNext}>
        <View style={styles.advancedNextLeft}>
          <Text style={styles.advancedNextText}>{t('learnScreen.next')}</Text>
        </View>
        <View style={styles.advancedNextCircle}>
          <Ionicons name="chevron-forward" size={24} color="#ecf900" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 30,
  },

  // 🔙 Previous Button - Elegant Rose
  advancedPrevButton: {
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

  advancedPrevCircle: {
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

  advancedPrevRight: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  advancedPrevText: {
    color: '#9d174d',
    fontSize: 16,
    fontWeight: '700',
  },

  // 🔜 Next Button - Clean Blue
  advancedNextButton: {
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

  advancedNextLeft: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  advancedNextCircle: {
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

  advancedNextText: {
    color: '#1e3a8a',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NavigationButtons;
