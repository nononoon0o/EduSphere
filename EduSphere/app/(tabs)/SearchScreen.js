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
import screenMap from "../routes/screenMap"; // ✅ screenMap only
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import styles from "../../style/SearchStyle/searchStyles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const focusAnim = useRef(new Animated.Value(0)).current;

  // Grouped screenMap by Chapter
  const groupedMap = groupScreenMapByChapter(screenMap);
  const chapterKeys = Object.keys(groupedMap);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("recent_searches");
      if (stored) setRecent(JSON.parse(stored));
    })();
  }, []);

  // Search from screenMap only
  useEffect(() => {
    if (!query.trim()) return setResults([]);
    const all = Object.keys(screenMap); // ✅ only screenMap
    const filtered = all.filter(
      (item, idx, self) =>
        item.toLowerCase().includes(query.toLowerCase()) &&
        self.indexOf(item) === idx
    );
    setResults(filtered);
  }, [query]);

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

  const handleRemoveRecent = async (labelToRemove) => {
    const filtered = recent.filter((label) => label !== labelToRemove);
    setRecent(filtered);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(filtered));
  };

  const animateFocus = (toValue) => {
    Animated.timing(focusAnim, {
      toValue,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

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

  const renderSection = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleSearchSelect(item.label)}
      style={styles.filterItem}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={[styles.mainWrapper, { flexDirection: isMobile ? "column" : "row" }]}>
            <View style={[styles.sidebar, isMobile ? styles.sidebarMobile : styles.sidebarDesktop]}>
              <Text style={styles.header}>🔍 {t("SEARCH")}</Text>
              <FlatList
                data={chapterKeys}
                renderItem={renderChapter}
                keyExtractor={(item) => item}
              />
            </View>

            <View style={styles.mainContent}>
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

              {selectedChapter && (
                <FlatList
                  data={groupedMap[selectedChapter]}
                  renderItem={renderSection}
                  keyExtractor={(item) => item.label}
                />
              )}

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
                          <Ionicons name="book-outline" size={18} color="#3498db" />
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
