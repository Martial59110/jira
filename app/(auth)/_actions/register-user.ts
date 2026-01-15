"use server";

import { z } from "zod";
import { createUser } from "@/lib/users-storage";

const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères."),
  email: z.string().email("Email invalide."),
  password: z.string().min(6, "Le mot de passe doit contenir 6 caractères minimum."),
});

export type RegisterActionState = {
  success: boolean;
  error?: string;
};

export async function registerUserAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }

  try {
    await createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      name: parsed.data.name,
      role: "member",
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Une erreur inattendue est survenue." };
  }
}
