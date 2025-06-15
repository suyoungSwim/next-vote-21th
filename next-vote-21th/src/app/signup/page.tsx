"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { signup } from "@/apis/auth";

import { useDuplicateChecker } from "@/hooks/useDuplicateChecker";
import { useTeamSelection } from "@/hooks/useTeamSelection";

import SignUpModal from "@/components/common/SignUpModal";
import PartSelector from "@/components/signup/PartSelector";
import SignupFormFields from "@/components/signup/SignUpFormFields";
import TeamSelector from "@/components/signup/TeamSelector";

import type { SignupForm } from "@/types/auth/dto";

const SignUpPage = () => {
  const router = useRouter();

  const {
    selectedLabel,
    selectedTeamName,
    selectedMember,
    setSelectedLabel,
    setSelectedTeamName,
    setSelectedMember,
    positionKey,
    selectedTeam,
    teams,
    members,
  } = useTeamSelection();

  const [statuses, setStatuses] = useState<{
    username: "error" | "success" | undefined;
    email: "error" | "success" | undefined;
  }>({
    username: undefined,
    email: undefined,
  });
  const [successMsgs, setSuccessMsgs] = useState<{
    username: string | undefined;
    email: string | undefined;
  }>({
    username: undefined,
    email: undefined,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const { check } = useDuplicateChecker<SignupForm>({
    setError,
    clearErrors,
    setStatuses,
    setSuccessMsgs,
  });

  const onSubmit = async (form: SignupForm) => {
    if (!positionKey || !selectedTeam || !selectedMember) return;

    const payload = {
      name: selectedMember,
      username: form.username,
      password: form.password,
      email: form.email,
      position: positionKey,
      team: selectedTeam.code,
    };

    const result = await signup(payload);
    if (result) setIsModalOpen(true);
  };

  const hasEmpty =
    !watch("username") ||
    !watch("email") ||
    !watch("password") ||
    !watch("confirmPassword");

  const isSubmitDisabled =
    hasEmpty ||
    !positionKey ||
    !selectedTeam ||
    !selectedMember ||
    statuses.username !== "success" ||
    statuses.email !== "success" ||
    !!errors.password ||
    !!errors.confirmPassword;

  return (
    <div className="scrollbar-hide flex min-h-screen w-screen flex-col items-center overflow-y-auto pt-[124px] pb-9 md:pt-[121px]">
      <div className="flex w-[313px] flex-col">
        <div className="flex flex-col gap-9">
          <h1 className="text-heading3 text-green-dark md:text-heading1">
            SIGN UP
          </h1>

          <PartSelector
            selectedPart={selectedLabel}
            onSelect={label => {
              setSelectedLabel(label);
              setSelectedTeamName("");
              setSelectedMember("");
            }}
          />

          <TeamSelector
            teams={teams}
            members={members}
            selectedTeam={selectedTeamName}
            selectedMember={selectedMember}
            onTeamSelect={name => {
              setSelectedTeamName(name);
              setSelectedMember("");
            }}
            onMemberSelect={setSelectedMember}
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[313px] flex-col"
        >
          <SignupFormFields
            register={register}
            errors={errors}
            watch={watch}
            statuses={statuses}
            setStatuses={setStatuses}
            successMsgs={successMsgs}
            setSuccessMsgs={setSuccessMsgs}
            check={check}
          />

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`text-heading3 md:text-heading2 w-[313px] rounded-[20px] py-3 text-white ${
              isSubmitDisabled ? "cursor-not-allowed bg-gray-300" : "bg-green"
            }`}
          >
            가입하기
          </button>
        </form>

        {isModalOpen && (
          <SignUpModal
            onConfirm={() => {
              setIsModalOpen(false);
              router.push("/login");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
