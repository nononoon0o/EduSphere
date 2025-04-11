import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)/MenuScreen'); // ✅ Correct tab route
    }, 2000);

    return () => clearTimeout(timer); // ✅ Clean up the timer
  }, [router]); // ✅ Add router as a dependency

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/welcom.jpeg')} // ✅ Make sure this image exists!
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Welcome to Royalty App 👑</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
  },
});
