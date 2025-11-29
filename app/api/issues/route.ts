import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const columns = [
  { status: "todo", label: "Pas commencé" },
  { status: "inProgress", label: "En cours" },
  { status: "blocked", label: "Bloqué" },
  { status: "done", label: "Fait" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
});

export async function GET() {
  const issues = await prisma.issue.findMany({
    orderBy: { updatedAt: "desc" },
  });

  const formattedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    status: issue.status,
    assignee: issue.assignee ?? "Non assigné",
    dueDate: issue.dueDate ? dateFormatter.format(issue.dueDate) : "—",
  }));

  return NextResponse.json({
    columns,
    issues: formattedIssues,
  });
}
