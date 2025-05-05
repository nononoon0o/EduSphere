import React from 'react';
import { Slot } from 'expo-router';
import './i18n/i18n'; // ✅ Note: one level up from app/
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Slot />
    </I18nextProvider>
  );
}
