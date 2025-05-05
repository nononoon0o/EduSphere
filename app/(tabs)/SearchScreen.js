import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import screenMap from "../routes/screenMap";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import styles from "../../style/SearchStyle/searchStyles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();

  const keywords = [
    "Ⅰ. 화학 반응의 규칙과 에너지 변화",
    "01. 물질 변화와 화학 반응식",
    "02. 질량 보존 법칙, 일정 성분비 법칙",
    "03. 기체 반응 법칙, 화학 반응에서의 에너지 출입",
    "Ⅱ. 기권과 날씨",
    "01. 기권과 지구 기온",
    "02. 구름과 강수",
    "03. 기압과 바람",
    "04. 날씨의 변화",
    "Ⅲ. 운동과 에너지",
    "01. 운동",
    "02. 일과 에너지",
    "Ⅳ. 자극과 반응",
    "01. 감각 기관",
    "02. 신경계와 호르몬",
  ];

  // Load recent searches from storage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("recent_searches");
      if (stored) setRecent(JSON.parse(stored));
    })();
  }, []);

  // Filter results based on query
  useEffect(() => {
    if (!query.trim()) return setResults([]);
    const all = [...Object.keys(screenMap), ...keywords];
    const filtered = all.filter((item, idx, self) =>
      item.toLowerCase().includes(query.toLowerCase()) && self.indexOf(item) === idx
    );
    setResults(filtered);
  }, [query]);

  const handleSearchSelect = async (item) => {
    const route = screenMap[item];
    if (route) {
      const updated = [item, ...recent.filter((r) => r !== item)].slice(0, 8);
      setRecent(updated);
      await AsyncStorage.setItem("recent_searches", JSON.stringify(updated));
      router.push(route);
    } else {
      Alert.alert(t("noRouteTitle", "Route Not Found"), `${t("noRouteMessage")} "${item}"`);
    }
  };

  const handleDeleteRecent = async (item) => {
    const updated = recent.filter((i) => i !== item);
    setRecent(updated);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <View style={styles.recentRow}>
      <TouchableOpacity style={styles.recentItem} onPress={() => handleSearchSelect(item)}>
        <Ionicons
          name={query ? "arrow-forward-circle" : "time-outline"}
          size={18}
          color={query ? "#27ae60" : "#3498db"}
        />
        <Text style={styles.recentText}>{item}</Text>
      </TouchableOpacity>
      {!query && (
        <TouchableOpacity onPress={() => handleDeleteRecent(item)}>
          <Ionicons name="close-circle" size={18} color="#e74c3c" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 🔙 Back Navigation */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/HomeScreen")}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>{t("backToHome")}</Text>
        </TouchableOpacity>

        {/* 🧠 Titles */}
        <View style={styles.titleWrapper}>
          <Text style={styles.header}>🔍 {t("searchTitle")}</Text>
          <Text style={styles.subheader}>{t("searchSubtitle")}</Text>
        </View>

        {/* 🔍 Search Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder={t("searchPlaceholder")}
            value={query}
            onChangeText={setQuery}
            placeholderTextColor="#888"
            returnKeyType="search"
          />
        </View>

        {/* 📃 Results / Recent */}
        <Text style={styles.sectionTitle}>
          {query.trim() ? t("searchResults") : t("recentSearches")}
        </Text>

        {query.trim() && results.length === 0 ? (
          <Text style={styles.noResult}>{t("noMatches")}</Text>
        ) : (
          <FlatList
            data={query.trim() ? results : recent}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
