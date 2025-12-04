"use client";

import { useActionState, useEffect, useTransition, useState } from "react";
import { registerUserAction, type RegisterActionState } from "@/app/(auth)/_actions/register-user";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const initialState: RegisterActionState = {
  success: false,
};

export function useRegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [autoLoginPending, startTransition] = useTransition();

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    registerUserAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      startTransition(async () => {
        await signIn("credentials", { email, password, redirect: false });
        router.push("/");
        router.refresh();
      });
    }
  }, [state.success, email, password, router]);

  return {
    state,
    formAction,
    nameControl: { value: name, onChange: (v: string) => setName(v) },
    emailControl: { value: email, onChange: (v: string) => setEmail(v) },
    passwordControl: { value: password, onChange: (v: string) => setPassword(v) },
    autoLoginPending,
  };
}
