import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import screenMap from "../routes/screenMap"; // 화면 경로 매핑
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import styles from "../../style/SearchStyle/searchStyles";
import { getAllI18nTexts } from "../../utils/flattenI18n"; // 모든 번역 텍스트 가져오기

export default function SearchScreen() {
  const [query, setQuery] = useState(""); // 검색어
  const [recent, setRecent] = useState([]); // 최근 검색어
  const [results, setResults] = useState([]); // 검색 결과
  const [keywords, setKeywords] = useState([]); // i18n 키워드
  const [selectedChapter, setSelectedChapter] = useState(null); // 선택된 챕터
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const focusAnim = useRef(new Animated.Value(0)).current;

  // 챕터별로 screenMap 정리
  const groupedMap = groupScreenMapByChapter(screenMap);
  const chapterKeys = Object.keys(groupedMap);

  // 번역된 모든 텍스트 키워드로 변환
  useEffect(() => {
    const allTexts = getAllI18nTexts(i18n, i18n.language);
    setKeywords(allTexts);
  }, [i18n.language]);

  // 최근 검색 기록 불러오기
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("recent_searches");
      if (stored) setRecent(JSON.parse(stored));
    })();
  }, []);

  // query가 바뀔 때마다 결과 필터링
  useEffect(() => {
    if (!query.trim()) return setResults([]);
    const all = [...Object.keys(screenMap), ...keywords];
    const filtered = all.filter(
      (item, idx, self) =>
        item.toLowerCase().includes(query.toLowerCase()) &&
        self.indexOf(item) === idx
    );
    setResults(filtered);
  }, [query, keywords]);

  // 챕터별로 screenMap 그룹화
  function groupScreenMapByChapter(map) {
    const grouped = {};
    Object.entries(map).forEach(([label, path]) => {
      const match = path.match(/\/chapters\/(Chapter\d+)/);
      if (match) {
        const chapter = match[1];
        if (!grouped[chapter]) grouped[chapter] = [];
        grouped[chapter].push({ label, path });
      }
    });
    return grouped;
  }

  // 검색어 선택 시 화면 이동
  const handleSearchSelect = async (label) => {
    const route = screenMap[label];
    if (route) {
      const updated = [label, ...recent.filter((r) => r !== label)].slice(0, 8);
      setRecent(updated);
      await AsyncStorage.setItem("recent_searches", JSON.stringify(updated));
      router.push(route);
    } else {
      Alert.alert(t("noRouteTitle"), `${t("noRouteMessage")} "${label}"`);
    }
  };

  // 최근 검색어 삭제
  const handleRemoveRecent = async (labelToRemove) => {
    const filtered = recent.filter((label) => label !== labelToRemove);
    setRecent(filtered);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(filtered));
  };

  // 포커스 애니메이션 트리거
  const animateFocus = (toValue) => {
    Animated.timing(focusAnim, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  // 검색창 스타일 애니메이션
  const inputStyle = {
    borderColor: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#ddd', '#3b82f6'],
    }),
    shadowOpacity: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.02, 0.2],
    }),
    shadowRadius: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 6],
    }),
    elevation: focusAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 4],
    }),
  };

  // 챕터 목록 렌더링
  const renderChapter = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedChapter(item)}
      style={styles.filterItem}
    >
      <Text style={selectedChapter === item ? styles.activeItem : styles.itemText}>
        {item} ({groupedMap[item]?.length})
      </Text>
    </TouchableOpacity>
  );

  // 챕터 하위 항목 렌더링
  const renderSection = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSearchSelect(item.label)}
      style={styles.filterItem}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  // 전체 렌더링
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* 레이아웃 구성 */}
          <View style={[styles.mainWrapper, { flexDirection: isMobile ? "column" : "row" }]}>
            {/* 사이드바 */}
            <View style={[styles.sidebar, isMobile ? styles.sidebarMobile : styles.sidebarDesktop]}>
              <Text style={styles.header}>🔍 {t("SEARCH")}</Text>
              <FlatList
                data={chapterKeys}
                renderItem={renderChapter}
                keyExtractor={(item) => item}
              />
            </View>

            {/* 메인 콘텐츠 */}
            <View style={styles.mainContent}>
              {/* 검색창 */}
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => inputRef.current?.focus()}
              >
                <Animated.View style={[styles.inputContainer, inputStyle]}>
                  <Ionicons name="search" size={18} color="#888" style={styles.icon} />
                  <TextInput
                    ref={inputRef}
                    style={styles.textInput}
                    placeholder={t("search")}
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor="#888"
                    returnKeyType="search"
                    underlineColorAndroid="transparent"
                    onFocus={() => animateFocus(1)}
                    onBlur={() => animateFocus(0)}
                  />
                </Animated.View>
              </TouchableOpacity>

              {/* 선택된 챕터의 항목 표시 */}
              {selectedChapter && (
                <FlatList
                  data={groupedMap[selectedChapter]}
                  renderItem={renderSection}
                  keyExtractor={(item) => item.label}
                />
              )}

              {/* 검색 결과 or 최근 검색어 */}
              <Text style={styles.sectionTitle}>
                {query.trim() ? t("searchResults") : t("Recent-Searches")}
              </Text>

              {query.trim() && results.length === 0 ? (
                <Text style={styles.noResult}>{t("noMatches")}</Text>
              ) : (
                <FlatList
                  data={query.trim() ? results : recent}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <View style={styles.recentRow}>
                      <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() => handleSearchSelect(item)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Ionicons name="time-outline" size={18} color="#3498db" />
                          <Text style={styles.recentText}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleRemoveRecent(item)}>
                        <Ionicons name="close-circle-outline" size={20} color="#d11a2a" />
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.listContainer}
                  keyboardShouldPersistTaps="handled"
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
