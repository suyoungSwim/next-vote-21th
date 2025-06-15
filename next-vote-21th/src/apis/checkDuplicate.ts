import { axiosInstance } from "./axios";

interface DuplicateCheckResult {
  exists: boolean;
  message: string;
}

export const checkUsernameDuplicate = async (
  username: string,
): Promise<DuplicateCheckResult> => {
  try {
    const res = await axiosInstance.get("/auth/signup/username/exists", {
      params: { username },
    });
    const isDup = res.data.data.exists === "true";
    return {
      exists: isDup,
      message: isDup
        ? "이미 사용 중인 아이디입니다."
        : "사용 가능한 아이디입니다.",
    };
  } catch (error) {
    console.error("아이디 중복 확인 실패", error);
    return {
      exists: true,
      message: "아이디 중복 확인에 실패했습니다.",
    };
  }
};

export const checkEmailDuplicate = async (
  email: string,
): Promise<DuplicateCheckResult> => {
  try {
    const res = await axiosInstance.get("/auth/signup/email/exists", {
      params: { email },
    });
    const isDup = res.data.data.exists === "true";

    return {
      exists: isDup,
      message: isDup
        ? "이미 사용 중인 이메일입니다."
        : "사용 가능한 이메일입니다.",
    };
  } catch (error) {
    console.error("이메일 중복 확인 실패", error);
    return {
      exists: true,
      message: "이메일 중복 확인에 실패했습니다.",
    };
  }
};
