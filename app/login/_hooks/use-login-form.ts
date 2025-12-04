"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect, useRef, FormEvent } from "react";

type LoginState = {
  error?: string;
};

export function useLoginForm() {
  const { status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("marti@example.com");
  const [password, setPassword] = useState("admin123");
  const [formState, setFormState] = useState<LoginState>({});
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isRedirecting = status === "authenticated";

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRedirecting) {
      router.replace("/");
    }
  }, [isRedirecting, router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    setFormState({});
    setIsSubmitting(true);
    startTransition(async () => {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setFormState({ error: "Identifiants incorrects." });
        setIsSubmitting(false);
        return;
      }
      redirectTimeoutRef.current = setTimeout(() => {
        router.replace("/");
      }, 600);
    });
  };

  return {
    emailControl: { value: email, onChange: (v: string) => setEmail(v) },
    passwordControl: { value: password, onChange: (v: string) => setPassword(v) },
    errorMessage: formState.error,
    isPending,
    handleSubmit,
    isRedirecting,
    isSubmitting,
  };
}
