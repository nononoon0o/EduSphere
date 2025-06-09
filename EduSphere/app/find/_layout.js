// app/_layout.js
import React, { useState } from "react";
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BackPressModal from "./BackPressModal";

export default function Layout() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const showBackModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const confirmNavigation = () => {
    setModalVisible(false);
    router.replace("/signin/loginScreen");
  };

  return (
    <>
      <Stack>
        <Stack.Screen
          name="findmain"
          options={{
            headerTitle: "아이디 / 비밀번호 찾기",
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => (
              <TouchableOpacity style={styles.backButton} onPress={showBackModal}>
                <FontAwesome5 name="arrow-left" size={20} color="#2563EB" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>

      <BackPressModal
        visible={isModalVisible}
        onClose={hideModal}
        onConfirm={confirmNavigation}
        onText="아이디 찾기"
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#F0F9FF", // light blue background
    elevation: 0, // remove Android shadow
    shadowOpacity: 0, // remove iOS shadow
    borderBottomWidth: 0,
  },
  headerTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});
