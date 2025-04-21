import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import screenMap from "../routes/screenMap";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState([]);
  const [results, setResults] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    const loadRecent = async () => {
      const stored = await AsyncStorage.getItem("recent_searches");
      if (stored) setRecent(JSON.parse(stored));
    };
    loadRecent();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }
    const allOptions = [...Object.keys(screenMap), ...keywords];
    const filtered = allOptions.filter(
      (key, index, self) =>
        key.toLowerCase().includes(query.toLowerCase()) &&
        self.indexOf(key) === index
    );
    setResults(filtered);
  }, [query]);

  const handleSearchSelect = async (item) => {
    const route = screenMap[item];
    if (route) {
      const updatedRecent = [item, ...recent.filter((r) => r !== item)].slice(0, 8);
      setRecent(updatedRecent);
      await AsyncStorage.setItem("recent_searches", JSON.stringify(updatedRecent));
      router.push(route);
    } else {
      console.warn("⚠️ No route available for:", item);
    }
  };

  const handleDeleteRecent = async (item) => {
    const updated = recent.filter((i) => i !== item);
    setRecent(updated);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace("/HomeScreen")}
      >
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>홈으로</Text>
      </TouchableOpacity>

      {/* 🧠 Title + Subtitle */}
      <View style={styles.titleWrapper}>
        <Text style={styles.header}>🔍 Explore Science</Text>
        <Text style={styles.subheader}>
          Learn science interactively by exploring key topics and chapters.
        </Text>
      </View>

      {/* 🔍 Search Bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search chapters, topics, keywords..."
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#888"
        />
      </View>

      {/* 🕘 Results or Recent */}
      {query.trim() === "" ? (
        <>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <FlatList
            data={recent}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.recentRow}>
                <TouchableOpacity
                  style={styles.recentItem}
                  onPress={() => handleSearchSelect(item)}
                >
                  <Ionicons name="time-outline" size={18} color="#3498db" />
                  <Text style={styles.recentText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteRecent(item)}>
                  <Ionicons name="close-circle" size={18} color="#e74c3c" />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Search Results</Text>
          {results.length === 0 ? (
            <Text style={styles.noResult}>No matches found.</Text>
          ) : (
            <FlatList
              data={results}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentRow}
                  onPress={() => handleSearchSelect(item)}
                >
                  <View style={styles.recentItem}>
                    <Ionicons name="arrow-forward-circle" size={18} color="#27ae60" />
                    <Text style={styles.recentText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f8fc",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e3a8a",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "600",
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2d3436",
    marginBottom: 4,
  },
  subheader: {
    fontSize: 14,
    color: "#636e72",
    textAlign: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    marginBottom: 30,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recentText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#2c3e50",
  },
  noResult: {
    fontSize: 16,
    color: "#b2bec3",
    textAlign: "center",
    marginTop: 20,
  },
});
