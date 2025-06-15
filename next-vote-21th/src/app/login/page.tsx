"use client";

import Link from "next/link";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

import InputField from "@/components/common/InputField";

import type { LoginPayload } from "@/types/auth/dto";

const LoginPage = () => {
  const [form, setForm] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  const { login, isLoginLoading } = useAuth();

  const handleInputFieldChange = (key: keyof LoginPayload, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center pt-[124px] md:pt-[272px]">
      <div className="flex w-[313px] flex-col gap-[46px] md:gap-[44px]">
        <h1 className="text-heading3 text-green-dark md:text-heading1">
          LOGIN
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col gap-[13px] md:gap-4.5"
        >
          <div className="flex flex-col gap-[13px] md:gap-[18px]">
            <InputField
              label="아이디"
              placeholder="아이디를 입력해주세요."
              value={form.username}
              onChange={e => handleInputFieldChange("username", e.target.value)}
              autoComplete="username"
            />
            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={form.password}
              onChange={e => handleInputFieldChange("password", e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={isLoginLoading}
            className="bg-green hover:bg-green-dark text-heading3 md:heading2 mt-[30px] h-fit w-full cursor-pointer rounded-[20px] py-[10px] text-white focus:outline-none md:mt-[44px]"
          >
            {isLoginLoading ? "로그인 중…" : "로그인하기"}
          </button>
        </form>

        <span className="text-cap1-med md:text-body2-med mt-[22px] text-center text-gray-800 underline">
          <Link href="/signup">계정이 없다면 회원가입하러 가기 &gt;</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
