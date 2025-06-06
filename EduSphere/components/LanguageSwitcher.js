// components/LanguageSwitcher.js
import React from 'react';
import { View, Button } from 'react-native';
import i18n from '../i18n/i18n';

export default function LanguageSwitcher() {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      <Button title="🇰🇷 한국어" onPress={() => i18n.changeLanguage('ko')} />
      <Button title="🇺🇸 English" onPress={() => i18n.changeLanguage('en')} />
      <Button title="🇫🇷 Français" onPress={() => i18n.changeLanguage('fr')} />
    </View>
  );
}
