import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(6, "아이디는 6자 이상이어야 합니다.")
      .max(20, "아이디는 20자 이하여야 합니다."),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password.length < 8 || password.length > 20) {
      ctx.addIssue({
        path: ["password"],
        message: "8~20자 사이로 입력해주세요.",
        code: "custom",
      });
    }

    if (!/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/.test(password)) {
      ctx.addIssue({
        path: ["password"],
        message: "문자, 숫자, 특수문자를 모두 포함해주세요.",
        code: "custom",
      });
    }

    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "비밀번호가 일치하지 않습니다.",
        code: "custom",
      });
    }
  });

export type SignupInput = z.infer<typeof signupSchema>;
