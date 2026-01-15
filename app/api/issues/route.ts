import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const columns = [
  { status: "todo", label: "À faire" },
  { status: "inProgress", label: "En cours" },
  { status: "blocked", label: "Bloqué" },
  { status: "done", label: "Terminé" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
});

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { updatedAt: "desc" },
    });

    const formattedIssues = issues.map((issue) => ({
      id: issue.id,
      code: issue.code,
      title: issue.title,
      status: issue.status,
      assignee: issue.assignee ?? null,
      dueDate: issue.dueDate ? dateFormatter.format(issue.dueDate) : null,
    }));

    return NextResponse.json({
      columns,
      issues: formattedIssues,
    });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}
