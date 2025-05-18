// app/_layout.js
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import BackPressModal from "./BackPressModal";

export default function Layout() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleBackPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    router.replace("/ProfileScreen");
    setModalVisible(false);
  };
  return (
    <>
      <Stack>
        <Stack.Screen
          name="findmain"
          options={({ navigation }) => ({
            headerTitle: "아이디 / 비밀번호 찾기",
            headerStyle: {
              backgroundColor: "#1E1E1E",
            },
            headerTitleStyle: {
              color: "white",
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 0, padding: 5 }}
                onPress={handleBackPress}
              >
                <FontAwesome5 name="arrow-left" size={20} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack>
      <BackPressModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        onText={"아이디 찾기"}
      />
    </>
  );
}
