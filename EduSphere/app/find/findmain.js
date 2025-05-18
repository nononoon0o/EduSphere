import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FindId from "./FindId";
import FindPassword from "./FindPassword";
import styles from "../../style/findStyle/FindStyle";

const findmain = () => {
  const [selectedTab, setSelectedTab] = useState("ID");

  return (
    <View style={{ flex: 1, backgroundColor: "#1E1E1E" }}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "ID" ? styles.selectedTab : styles.unselectedTab,
          ]}
          onPress={() => setSelectedTab("ID")}
        >
          <Text style={{ color: "white" }}>아이디 찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === "PW" ? styles.selectedTab : styles.unselectedTab,
          ]}
          onPress={() => setSelectedTab("PW")}
        >
          <Text style={{ color: "white" }}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {selectedTab === "ID" ? <FindId /> : <FindPassword />}
      </View>
    </View>
  );
};

export default findmain;
