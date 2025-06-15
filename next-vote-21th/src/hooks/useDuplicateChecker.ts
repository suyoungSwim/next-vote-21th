import {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

import {
  checkEmailDuplicate,
  checkUsernameDuplicate,
} from "@/apis/checkDuplicate";

type Status = "error" | "success" | undefined;

interface UseDuplicateCheckerProps<T extends FieldValues> {
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  setStatuses: React.Dispatch<
    React.SetStateAction<{ username: Status; email: Status }>
  >;
  setSuccessMsgs: React.Dispatch<
    React.SetStateAction<{
      username: string | undefined;
      email: string | undefined;
    }>
  >;
}

export const useDuplicateChecker = <T extends FieldValues>({
  setError,
  clearErrors,
  setStatuses,
  setSuccessMsgs,
}: UseDuplicateCheckerProps<T>) => {
  const check = async (
    type: Path<T> & ("username" | "email"),
    value: string,
  ) => {
    const checkFn =
      type === "username" ? checkUsernameDuplicate : checkEmailDuplicate;

    try {
      const { exists, message } = await checkFn(value);

      if (exists) {
        setError(type, { message });
        setStatuses(prev => ({ ...prev, [type]: "error" }));
        setSuccessMsgs(prev => ({ ...prev, [type]: undefined }));
      } else {
        clearErrors(type);
        setStatuses(prev => ({ ...prev, [type]: "success" }));
        setSuccessMsgs(prev => ({ ...prev, [type]: message }));
      }
    } catch (err) {
      setError(type, {
        message: "중복 확인 중 오류가 발생했습니다.",
      });
      setStatuses(prev => ({ ...prev, [type]: "error" }));
    }
  };

  return { check };
};
