// src/services/api.js

import { AppConfig } from "../constants/config";

// 🔄 Generic API handler
const request = async (endpoint, method = "GET", data = null, headers = {}) => {
  const url = `${AppConfig.apiBaseUrl}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${await getAuthToken()}`, // Add token from authService
  };

  const options = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (data && method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "API request failed");
    }

    return result;
  } catch (error) {
    console.error("🌐 API Error:", error.message);
    throw error;
  }
};

// ✅ Example auth token retriever (you can customize this)
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem(AppConfig.auth.tokenStorageKey);
    return token;
  } catch (err) {
    console.warn("Failed to get auth token", err);
    return null;
  }
};

// 🧩 Export API methods
export const api = {
  get: (endpoint, headers) => request(endpoint, "GET", null, headers),
  post: (endpoint, data, headers) => request(endpoint, "POST", data, headers),
  put: (endpoint, data, headers) => request(endpoint, "PUT", data, headers),
  delete: (endpoint, data, headers) => request(endpoint, "DELETE", data, headers),
};
