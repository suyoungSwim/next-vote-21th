import { useMemo, useState } from "react";

import { SignupInput, signupSchema } from "@/schemas/signupSchema";

import { SignupErrors } from "@/types/auth/dto";

const initialForm: SignupInput = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialErrors: SignupErrors = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const useSignupForm = () => {
  const [form, setForm] = useState<SignupInput>(initialForm);
  const [errors, setErrors] = useState<SignupErrors>(initialErrors);

  const validate = () => {
    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const newErrors = { ...initialErrors };
      result.error.errors.forEach(({ path, message }) => {
        const field = path[0] as keyof SignupErrors;
        newErrors[field] = message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors(initialErrors);
    return true;
  };

  const isDisabled = useMemo(() => {
    return (
      Object.values(form).some(val => val === "") ||
      Object.values(errors).some(Boolean)
    );
  }, [form, errors]);

  return {
    form,
    setForm,
    errors,
    setErrors,
    validate,
    isDisabled,
  };
};
