/* 회원가입 완료창 */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Navigation
import nextstyle from "../../style/NumberScreen"; // 스타일 파일 임포트

const NextScreen = () => {
  const router = useRouter(); // useRouter 사용하여 네비게이션 구현

  const handleScreen = () => {
    router.push("/ProfileScreen"); // 로그인 화면으로 이동
  };

  return (
    <View style={nextstyle.container}>
      <Text style={nextstyle.title}>환영합니다!</Text>
      {/* "회원가입이 완료되었습니다" 문구가 타이틀 밑에 위치 */}
      <Text style={nextstyle.text}>회원가입이 완료되었습니다.</Text>

      <TouchableOpacity style={nextstyle.HomeButton} onPress={handleScreen}>
        <Text style={nextstyle.HomeButtonText}>로그인 화면으로 이동</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextScreen;
