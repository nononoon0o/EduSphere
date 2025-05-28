import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import styles from "../../style/findStyle/FindStyle";

const FindMain = () => {
  const [selectedTab, setSelectedTab] = useState("ID");

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
            아이디 찾기
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
            비밀번호 찾기
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
