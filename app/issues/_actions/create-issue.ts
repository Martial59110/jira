"use server";

import { authConfig } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
  status: z.enum(["todo", "inProgress", "blocked", "done"]).default("todo"),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});

export type CreateIssueActionState = {
  success: boolean;
  error?: string;
};

const initialState: CreateIssueActionState = {
  success: false,
};

async function generateIssueCode() {
  const lastIssue = await prisma.issue.findFirst({
    orderBy: { createdAt: "desc" },
    select: { code: true },
  });

  const baseNumber = lastIssue ? Number(lastIssue.code.split("-")[1]) || 214 : 214;
  return `MYJ-${baseNumber + 1}`;
}

export async function createIssueAction(
  _prevState: CreateIssueActionState,
  formData: FormData,
): Promise<CreateIssueActionState> {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return { success: false, error: "Vous devez être connecté." };
  }

  const parsed = createIssueSchema.safeParse({
    title: formData.get("title"),
    status: formData.get("status") ?? "todo",
    assignee: formData.get("assignee") || undefined,
    dueDate: formData.get("dueDate") || undefined,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Champs invalides." };
  }

  const author = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  });

  if (!author) {
    return { success: false, error: "Utilisateur introuvable." };
  }

  const code = await generateIssueCode();

  await prisma.issue.create({
    data: {
      code,
      title: parsed.data.title,
      status: parsed.data.status,
      assignee: parsed.data.assignee,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
      authorId: author.id,
    },
  });

  await prisma.activity.create({
    data: {
      author: author.name ?? session.user.email,
      action: `a créé le ticket ${code}`,
    },
  });

  revalidatePath("/issues");
  revalidatePath("/");

  return { success: true };
}

export { initialState as createIssueInitialState };
