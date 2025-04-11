import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, SafeAreaView, Alert } from "react-native";
import { useGameStore } from "../../../store/useGameStore";
import { Ionicons } from "@expo/vector-icons";

// 🌐 Language Options
const languageOptions = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// 🔬 Periodic Table Data
const periodicElements = [
  { number: 1, symbol: "H", name: { en: "Hydrogen", fr: "Hydrogène" }, color: "#4CAF50" },
  { number: 3, symbol: "Li", name: "Lithium", color: "#FF9800" },
  { number: 11, symbol: "Na", name: "Sodium", color: "#FF9800" },
  { number: 19, symbol: "K", name: "Potassium", color: "#FF9800" },
  { number: 37, symbol: "Rb", name: "Rubidium", color: "#FF9800" },
  { number: 55, symbol: "Cs", name: "Césium", color: "#FF9800" },
  { number: 87, symbol: "Fr", name: "Francium", color: "#FF9800" },

  // 🔴 Non-Métaux (Adding Carbon and Oxygen here)
  { number: 6, symbol: "C", name: "Carbone", color: "#FFEB3B" },
  { number: 8, symbol: "O", name: "Oxygène", color: "#FFEB3B" },

  // 🔵 Métaux Alcalino-Terreux
  { number: 4, symbol: "Be", name: "Béryllium", color: "#2196F3" },
  { number: 12, symbol: "Mg", name: "Magnésium", color: "#2196F3" },
  { number: 20, symbol: "Ca", name: "Calcium", color: "#2196F3" },
  { number: 38, symbol: "Sr", name: "Strontium", color: "#2196F3" },
  { number: 56, symbol: "Ba", name: "Baryum", color: "#2196F3" },
  { number: 88, symbol: "Ra", name: "Radium", color: "#2196F3" },
  { number: 3, symbol: "Li", name: "Lithium", color: "#FF9800" },
  { number: 11, symbol: "Na", name: "Sodium", color: "#FF9800" },
  { number: 19, symbol: "K", name: "Potassium", color: "#FF9800" },
  { number: 37, symbol: "Rb", name: "Rubidium", color: "#FF9800" },
  { number: 55, symbol: "Cs", name: "Césium", color: "#FF9800" },
  { number: 87, symbol: "Fr", name: "Francium", color: "#FF9800" },

  // 🔴 Métaux de Transition
  { number: 21, symbol: "Sc", name: "Scandium", color: "#F44336" },
  { number: 22, symbol: "Ti", name: "Titane", color: "#F44336" },
  { number: 23, symbol: "V", name: "Vanadium", color: "#F44336" },
  { number: 24, symbol: "Cr", name: "Chrome", color: "#F44336" },
  { number: 25, symbol: "Mn", name: "Manganèse", color: "#F44336" },
  { number: 26, symbol: "Fe", name: "Fer", color: "#F44336" },
  { number: 27, symbol: "Co", name: "Cobalt", color: "#F44336" },
  { number: 28, symbol: "Ni", name: "Nickel", color: "#F44336" },
  { number: 29, symbol: "Cu", name: "Cuivre", color: "#F44336" },
  { number: 30, symbol: "Zn", name: "Zinc", color: "#F44336" },
  { number: 39, symbol: "Y", name: "Yttrium", color: "#F44336" },
  { number: 40, symbol: "Zr", name: "Zirconium", color: "#F44336" },
  { number: 41, symbol: "Nb", name: "Niobium", color: "#F44336" },
  { number: 42, symbol: "Mo", name: "Molybdène", color: "#F44336" },
  { number: 43, symbol: "Tc", name: "Technétium", color: "#F44336" },
  { number: 44, symbol: "Ru", name: "Ruthénium", color: "#F44336" },
  { number: 45, symbol: "Rh", name: "Rhodium", color: "#F44336" },
  { number: 46, symbol: "Pd", name: "Palladium", color: "#F44336" },
  { number: 47, symbol: "Ag", name: "Argent", color: "#F44336" },
  { number: 48, symbol: "Cd", name: "Cadmium", color: "#F44336" },
  { number: 72, symbol: "Hf", name: "Hafnium", color: "#F44336" },
  { number: 73, symbol: "Ta", name: "Tantale", color: "#F44336" },
  { number: 74, symbol: "W", name: "Tungstène", color: "#F44336" },
  { number: 75, symbol: "Re", name: "Rhénium", color: "#F44336" },
  { number: 76, symbol: "Os", name: "Osmium", color: "#F44336" },
  { number: 77, symbol: "Ir", name: "Iridium", color: "#F44336" },
  { number: 78, symbol: "Pt", name: "Platine", color: "#F44336" },
  { number: 79, symbol: "Au", name: "Or", color: "#F44336" },
  { number: 80, symbol: "Hg", name: "Mercure", color: "#F44336" },

  // 🟠 Métaux Pauvres
  { number: 5, symbol: "B", name: "Bore", color: "#FFC107" },
  { number: 13, symbol: "Al", name: "Aluminium", color: "#FFC107" },
  { number: 31, symbol: "Ga", name: "Gallium", color: "#FFC107" },
  { number: 49, symbol: "In", name: "Indium", color: "#FFC107" },
  { number: 81, symbol: "Tl", name: "Thallium", color: "#FFC107" },
  { number: 82, symbol: "Pb", name: "Plomb", color: "#FFC107" },
  { number: 83, symbol: "Bi", name: "Bismuth", color: "#FFC107" },
  { number: 84, symbol: "Po", name: "Polonium", color: "#FFC107" },

  // 🟡 Métalloïdes
  { number: 14, symbol: "Si", name: "Silicium", color: "#FFD700" },
  { number: 32, symbol: "Ge", name: "Germanium", color: "#FFD700" },
  { number: 33, symbol: "As", name: "Arsenic", color: "#FFD700" },
  { number: 51, symbol: "Sb", name: "Antimoine", color: "#FFD700" },
  { number: 52, symbol: "Te", name: "Tellure", color: "#FFD700" },

  // 🟣 Gaz Nobles
  { number: 2, symbol: "He", name: "Hélium", color: "#9C27B0" },
  { number: 10, symbol: "Ne", name: "Néon", color: "#9C27B0" },
  { number: 18, symbol: "Ar", name: "Argon", color: "#9C27B0" },
  { number: 36, symbol: "Kr", name: "Krypton", color: "#9C27B0" },
  { number: 54, symbol: "Xe", name: "Xénon", color: "#9C27B0" },
  { number: 86, symbol: "Rn", name: "Radon", color: "#9C27B0" },
  { number: 118, symbol: "Og", name: "Oganesson", color: "#9C27B0" },
];

// 🌍 Language Translations
const translations = {
  en: { title: "🧪 Periodic Table Inventory", addElements: "No items yet! Add elements.", reactMolecules: "React Molecules", searchPlaceholder: "Search elements...", switchLang: "Switch to French" },
  fr: { title: "🧪 Inventaire du Tableau Périodique", addElements: "Aucun élément ! Ajoutez-en.", reactMolecules: "Réagir Molécules", searchPlaceholder: "Rechercher des éléments...", switchLang: "Passer à l'anglais" },
};

export default function InventoryScreen() {
  const { inventory, addElement, reactMolecules } = useGameStore();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter elements based on search query
  const filteredElements = periodicElements.filter(el =>
    el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
    el.name[selectedLanguage].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleElementLongPress = (el) => {
    Alert.alert(
      el.name[selectedLanguage],
      `Atomic Number: ${el.number}\nSymbol: ${el.symbol}`,
      [{ text: "OK", style: "cancel" }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* 🌐 Language Button */}
      <TouchableOpacity 
        style={styles.languageButton} 
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.flagIcon}>{languageOptions.find(lang => lang.code === selectedLanguage)?.flag}</Text>
        <Ionicons name="caret-down" size={18} color="#000" />
      </TouchableOpacity>

      {/* 🔽 Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={() => setDropdownVisible(false)}
          >
            <Ionicons name="close" size={18} color="black" />
          </TouchableOpacity>

          {languageOptions.map(lang => (
            <TouchableOpacity 
              key={lang.code} 
              style={[
                styles.languageOption, 
                selectedLanguage === lang.code && styles.activeLanguage
              ]}
              onPress={() => {
                setSelectedLanguage(lang.code);
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.flagIcon}>{lang.flag}</Text>
              <Text style={[styles.languageText, { color: selectedLanguage === lang.code ? "#fff" : "#000" }]}>
                {lang.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 🔎 Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder={translations[selectedLanguage].searchPlaceholder}
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      {/* 🧪 Title */}
      <Text style={styles.title}>{translations[selectedLanguage].title}</Text>

      {/* 📦 Inventory List */}
      <ScrollView style={styles.inventoryList}>
        {inventory.length > 0 ? (
          inventory.map((item, index) => (
            <View key={index} style={styles.inventoryItem}>
              <Ionicons name="cube" size={20} color="#00BCD4" />
              <Text style={styles.inventoryText}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>{translations[selectedLanguage].addElements}</Text>
        )}
      </ScrollView>

      {/* 🟢 Periodic Table Elements */}
      <View style={styles.gridContainer}>
        {filteredElements.map((el) => (
          <TouchableOpacity
            key={el.symbol}
            style={[styles.elementButton, { backgroundColor: el.color }]}
            onPress={() => addElement(el.symbol)}
            onLongPress={() => handleElementLongPress(el)}
          >
            <Text style={styles.elementText}>{el.symbol}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✨ React Molecules Button */}
      <TouchableOpacity style={styles.reactButton} onPress={reactMolecules}>
        <Ionicons name="sparkles" size={24} color="white" />
        <Text style={styles.reactButtonText}>{translations[selectedLanguage].reactMolecules}</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}


// ✅ Styles for Periodic Table Look
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E1E1E", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#FFFFFF", textAlign: "center", marginBottom: 20, textTransform: "uppercase", letterSpacing: 1 },
  inventoryList: { backgroundColor: "#292929", padding: 15, borderRadius: 10, maxHeight: 200, marginBottom: 20, shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 5,},
  inventoryItem: { flexDirection: "row", alignItems: "center", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#444", },
  inventoryText: { marginLeft: 10, color: "#FFFFFF", fontSize: 16, fontWeight: "500",},
  emptyText: { color: "#AAAAAA", textAlign: "center", fontSize: 16, padding: 10, fontStyle: "italic"},
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10 },
  elementButton: { width: 60, height: 60, margin: 6, borderRadius: 10, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 3 },
  elementText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  reactButton: { backgroundColor: "#FF5722", padding: 12, borderRadius: 10, marginTop: 10, elevation: 6, shadowRadius: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" },
  reactButtonText: { color: "white", fontSize: 18, fontWeight: "600", textAlign: "center", marginLeft: 10, },
  languageButton: { flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, },
  languageText: { color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8, },
  searchBar: { backgroundColor: "#424242", 
    color: "#FFFFFF", 
    paddingVertical: 12, 
    paddingHorizontal: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    fontSize: 17, 
    borderWidth: 1, 
    borderColor: "#616161",
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 4, },
    dropdownContainer: {
      position: "absolute",
      top: 60,
      right: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: 250,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 10,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    languageOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 5,
      marginVertical: 2,
    },
    activeLanguage: {
      backgroundColor: "#3F51B5",
    },
    
    flagIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
    },
    
    closeButton: {
      position: "absolute",
      top: 5,
      right: 10,
    },
});