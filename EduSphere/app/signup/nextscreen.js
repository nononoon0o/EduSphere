import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style/signupStyle/NumberScreen';
import { useTranslation } from 'react-i18next';

const NextScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  // Redirect automatically after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin/loginScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    router.push('/signin/loginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="check-circle" size={64} color="#10B981" style={styles.icon} />
        <Text style={styles.title}>{t("nextScreen.welcome")}</Text>
        <Text style={styles.subtitle}>{t("nextScreen.signupComplete")}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>{t("nextScreen.goToLogin")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NextScreen;
