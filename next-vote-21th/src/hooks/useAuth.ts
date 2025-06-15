"use client";

import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login, logout, signup } from "@/apis/auth";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. 회원가입
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      if (data) router.push("/login");
    },
  });

  // 2. 로그인
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ token, errorMessage }) => {
      if (token) {
        router.push("/");
      } else {
        alert(errorMessage);
      }
    },
  });

  // 3. 로그아웃
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
    onError: error => console.error("로그아웃 실패", error),
  });

  return {
    signup: signupMutation.mutate,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    isLoginLoading: loginMutation.isPending,
    isSignupLoading: signupMutation.isPending,
    loginError: loginMutation.error,
    signupError: signupMutation.error,
  };
};
