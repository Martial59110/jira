"use server";

import { authConfig } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { z } from "zod";

const moveIssueSchema = z.object({
  issueId: z.string().min(1),
  status: z.enum(["todo", "inProgress", "blocked", "done"]),
});

export type MoveIssueActionResult = {
  success: boolean;
  error?: string;
};

export async function moveIssueAction(formData: FormData): Promise<MoveIssueActionResult> {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) {
    return { success: false, error: "Authentification requise." };
  }

  const parsed = moveIssueSchema.safeParse({
    issueId: formData.get("issueId"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Requête invalide." };
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parsed.data.issueId },
    include: { author: true },
  });

  if (!issue) {
    return { success: false, error: "Ticket introuvable." };
  }

  if (issue.status === parsed.data.status) {
    return { success: true };
  }

  await prisma.issue.update({
    where: { id: parsed.data.issueId },
    data: {
      status: parsed.data.status,
    },
  });

  await prisma.activity.create({
    data: {
      author: session.user.name ?? session.user.email,
      action: `a déplacé ${issue.code} vers ${parsed.data.status}`,
    },
  });

  revalidatePath("/issues");
  revalidatePath("/");

  return { success: true };
}
