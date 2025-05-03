const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// 👇 .glb 확장자를 에셋으로 추가
config.resolver.assetExts.push('glb');

module.exports = config;
