import { FieldErrors, UseFormRegister } from "react-hook-form";

import type { SignupForm } from "@/types/auth/dto";

import InputField from "../common/InputField";

interface SignupFormFieldsProps {
  register: UseFormRegister<SignupForm>;
  errors: FieldErrors<SignupForm>;
  watch: (name: keyof SignupForm) => string;
  statuses: Record<"username" | "email", "error" | "success" | undefined>;
  successMsgs: Record<"username" | "email", string | undefined>;
  setStatuses: React.Dispatch<
    React.SetStateAction<{
      username: "error" | "success" | undefined;
      email: "error" | "success" | undefined;
    }>
  >;
  setSuccessMsgs: React.Dispatch<
    React.SetStateAction<{
      username: string | undefined;
      email: string | undefined;
    }>
  >;
  check: (type: "username" | "email", value: string) => void;
}

const SignupFormFields = ({
  register,
  errors,
  watch,
  statuses,
  successMsgs,
  setStatuses,
  setSuccessMsgs,
  check,
}: SignupFormFieldsProps) => {
  return (
    <div className="mb-6 flex flex-col gap-[10px]">
      {(["username", "email"] as const).map(field => {
        const disable = !!errors[field] || !watch(field);
        const registered = register(field, {
          onChange: e => {
            const val = e.target.value;
            setStatuses(prev => ({ ...prev, [field]: undefined }));
            setSuccessMsgs(prev => ({ ...prev, [field]: undefined }));
          },
        });

        return (
          <InputField
            key={field}
            label={`${field === "username" ? "아이디 *" : "이메일 *"}`}
            placeholder={
              field === "username"
                ? "6~20자 이내로 입력해주세요."
                : "이메일을 입력해주세요."
            }
            {...registered}
            onCheckDuplicate={() => check(field, watch(field))}
            showCheckButton
            disabledCheckButton={disable}
            error={errors[field]?.message as string | undefined}
            successMsg={successMsgs[field]}
            status={statuses[field]}
            autoComplete={field === "email" ? "email" : undefined}
          />
        );
      })}

      <InputField
        label="비밀번호 *"
        type="password"
        autoComplete="new-password"
        placeholder="문자, 숫자, 특수문자 포함 8~20자"
        {...register("password")}
        error={errors.password?.message}
      />

      <InputField
        label="비밀번호 * 재입력 "
        type="password"
        autoComplete="new-password"
        placeholder="비밀번호 재입력"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
    </div>
  );
};

export default SignupFormFields;
