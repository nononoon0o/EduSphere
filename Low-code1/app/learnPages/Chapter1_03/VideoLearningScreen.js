import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function VideoLearningScreen() {
  const videoId = 'V7Z9e0DXamI'; // 원하는 유튜브 영상 ID

  return (
    <View style={styles.container}>
      
      <Text style={styles.text}>🎬 영상 학습 페이지입니다.</Text>

      {Platform.OS === 'web' ? (
        <iframe
          width="90%"
          height={Dimensions.get('window').width * 0.5625}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={styles.iframe}
        />
      ) : (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.video}
            allowsFullscreenVideo
          />
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff7f5',
  },
  text: {
    fontSize: 20,
    color: '#c0392b',
    fontWeight: '600',
    marginBottom: 20,
  },
  videoContainer: {
    width: '90%',
    height: Dimensions.get('window').width * 0.5625,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  iframe: {
    borderWidth: 0,
  },
});
