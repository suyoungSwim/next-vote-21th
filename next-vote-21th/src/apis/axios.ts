import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 백에서 자동 재발급 하는 방식임.
// 요청 인터셉터: accessToken을 Zustand에서 가져와 주입
axiosInstance.interceptors.request.use(
  config => {
    const isAuthRequest =
      config.url?.includes("/auth/signin") ||
      config.url?.includes("/auth/tokens/refresh");

    if (!isAuthRequest) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: 새 accessToken이 있으면 Zustand에 저장
axiosInstance.interceptors.response.use(
  response => {
    const authHeader = response.headers["authorization"];
    if (authHeader?.startsWith("Bearer ")) {
      const newToken = authHeader.split(" ")[1];
      useAuthStore.getState().setAccessToken(newToken);
    }
    return response;
  },
  async error => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      await axiosInstance.post("/auth/tokens/refresh");
      const newToken = useAuthStore.getState().accessToken;
      original.headers["Authorization"] = `Bearer ${newToken}`;
      return axiosInstance(original);
    }
    return Promise.reject(error);
  },
);
