import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import styles from "../../style/findStyle/FindStyle";
import { useTranslation } from "react-i18next";

const FindMain = () => {
  const [selectedTab, setSelectedTab] = useState("ID");
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "ID" ? styles.selectedTab : styles.unselectedTab,
          ]}
          onPress={() => setSelectedTab("ID")}
        >
          <Text style={selectedTab === "ID" ? styles.tabTextSelected : styles.tabText}>
            {t("find.tabFindId")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "PW" ? styles.selectedTab : styles.unselectedTab,
          ]}
          onPress={() => setSelectedTab("PW")}
        >
          <Text style={selectedTab === "PW" ? styles.tabTextSelected : styles.tabText}>
            {t("find.tabFindPassword")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        {selectedTab === "ID" ? <FindId /> : <FindPassword />}
      </View>
    </View>
  );
};

export default FindMain;
