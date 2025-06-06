import { Pressable, View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/findStyle/FindStyle";
import { useTranslation } from "react-i18next";

function FindId() {
  const router = useRouter();
  const { t } = useTranslation();

  const [idText, setIdText] = useState("");
  const [flag, setFlag] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailholder, setEmailholder] = useState(t("find.emailGuide"));
  const [numberholder, setNumberholder] = useState(t("find.codeGuide"));
  const [end, setEnd] = useState(false);
  const [emailCenter, setEmailCenter] = useState(false);
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ".");

  const handleTimerEnd = () => {
    setNumberholder(t("find.codeExpired"));
    setEnd(true);
  };

  return emailCenter ? (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Text style={{ color: "#0097FB" }}>{idText}</Text>
        <Text style={{ color: "white" }}>{t("find.matchedMessage")}</Text>
      </View>
      <Text style={{ color: "white" }}>{t("find.userInfoMessage")}</Text>

      <View style={styles.modalContainer}>
        <Text style={{ color: "white", margin: 10 }}>{t("find.userId")}:</Text>
        <Text style={{ color: "white", margin: 10 }}>
          {t("find.joinDate")}: {formattedDate}
        </Text>
      </View>

      <View style={{ width: "80%", marginTop: "auto" }}>
        <Pressable onPress={() => router.push("/")} style={styles.button}>
          <Text style={styles.buttonText}>{t("find.goToLogin")}</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={t("find.inputEmail")}
          placeholderTextColor="#AEAEAE"
          value={idText}
          onChangeText={setIdText}
          editable={!flag}
        />
        <Pressable
          onPress={() => setIdText("")}
          style={{ position: "absolute", right: 10, top: 20 }}
          disabled={flag}
        >
          <FontAwesome5 name="times-circle" size={15} color="#F48771" />
        </Pressable>
        <Text style={styles.inputPlaceholder}>{emailholder}</Text>

        {flag && (
          <>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
              <TextInput
                style={styles.numberinput}
                placeholder={t("find.codeGuide")}
                placeholderTextColor="#AEAEAE"
              />
              <Pressable style={styles.confirmButton}>
                <Text style={styles.confirmText}>{t("find.confirm")}</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...styles.inputPlaceholder,
                  color: end ? "red" : "white",
                }}
              >
                {numberholder}
              </Text>
              <CountdownTimer initialTime={300} onTimerEnd={handleTimerEnd} />
            </View>
          </>
        )}

        <View style={{ width: "100%", marginTop: "auto" }}>
          <Pressable
            onPress={() => {
              if (flag) {
                setEmailCenter(true);
              } else {
                setModalVisible(true);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {flag ? t("find.findId") : t("find.getCode")}
            </Text>
          </Pressable>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          setFlag(true);
        }}
        idText={idText}
      />
    </View>
  );
}

export default FindId;
