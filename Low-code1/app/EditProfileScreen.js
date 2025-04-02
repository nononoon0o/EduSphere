import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen({ navigation }) {
  const userId = auth.currentUser?.uid;
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    birth: "",
    gender: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const ref = doc(db, "users", userId);
      const snap = await getDoc(ref);
      if (snap.exists()) setProfile({ ...profile, ...snap.data() });
    };
    fetchData();
  }, [userId]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setLoading(true);
      try {
        const image = result.assets[0];
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `avatars/${userId}.jpg`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        setProfile((prev) => ({ ...prev, avatar: downloadURL }));
      } catch (err) {
        Alert.alert("Error", "Image upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!userId) return;
    try {
      await setDoc(doc(db, "users", userId), profile);
      Alert.alert("Success", "Profile updated");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Could not save profile");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <Image
            source={{ uri: profile.avatar || "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
        )}
        <TouchableOpacity style={styles.editIcon} onPress={handlePickAvatar}>
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <TextInput placeholder="First Name" value={profile.firstName} onChangeText={(v) => handleChange("firstName", v)} style={styles.input} />
      <TextInput placeholder="Last Name" value={profile.lastName} onChangeText={(v) => handleChange("lastName", v)} style={styles.input} />
      <TextInput placeholder="Username" value={profile.username} onChangeText={(v) => handleChange("username", v)} style={styles.input} />
      <TextInput placeholder="Email" value={profile.email} onChangeText={(v) => handleChange("email", v)} style={styles.input} />
      <TextInput placeholder="Phone" value={profile.phone} onChangeText={(v) => handleChange("phone", v)} style={styles.input} />
      <TextInput placeholder="Birth Year (e.g. 2000)" value={profile.birth} onChangeText={(v) => handleChange("birth", v)} style={styles.input} />
      <TextInput placeholder="Gender" value={profile.gender} onChangeText={(v) => handleChange("gender", v)} style={styles.input} />

      <TouchableOpacity style={styles.saveProfileButton} onPress={handleSave}>
        <Text style={styles.saveProfileText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={() => {
        if (profile.email) {
          Alert.alert(
            "Change Password",
            `A reset link will be sent to ${profile.email}`,
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Send",
                onPress: async () => {
                  try {
                    await auth.sendPasswordResetEmail(profile.email);
                    Alert.alert("Success", "Password reset email sent");
                  } catch (error) {
                    Alert.alert("Error", "Could not send reset email");
                  }
                },
              },
            ]
          );
        }
      }}>
        <Ionicons name="lock-closed" size={16} color="#fff" />
        <Text style={styles.saveButtonText}> Change Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  avatarSection: { alignItems: "center", marginVertical: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 120,
    backgroundColor: "#007AFF",
    padding: 6,
    borderRadius: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveProfileButton: {
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveProfileText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
