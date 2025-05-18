// src/services/authService.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppConfig } from "../constants/config";
import { api } from "./api";

const TOKEN_KEY = AppConfig.auth.tokenStorageKey || "auth_token";

// ✅ Login and store token
export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const token = response.token;

    if (token) {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    }

    return response;
  } catch (error) {
    console.error("🔐 Login error:", error.message);
    throw error;
  }
};

// ✅ Logout and clear token
export const logout = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log("🔓 Logged out successfully.");
  } catch (error) {
    console.error("🔐 Logout error:", error.message);
  }
};

// ✅ Get stored token
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("🧾 Token retrieval error:", error.message);
    return null;
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};
