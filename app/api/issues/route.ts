import { NextResponse } from "next/server";

const columns = [
  { status: "todo", label: "Pas commencé" },
  { status: "inProgress", label: "En cours" },
  { status: "blocked", label: "Bloqué" },
  { status: "done", label: "Fait" },
] as const;

const issues = [
  {
    id: "MYJ-214",
    title: "Tâche 1",
    status: "todo",
    assignee: "Victor",
    dueDate: "27 nov.",
  },
  {
    id: "MYJ-215",
    title: "Tâche 2",
    status: "done",
    assignee: "Léa",
    dueDate: "28 nov.",
  },
  {
    id: "MYJ-216",
    title: "Tâche 3",
    status: "blocked",
    assignee: "Yasmine",
    dueDate: "29 nov.",
  },
  {
    id: "MYJ-217",
    title: "Audit sécurité",
    status: "inProgress",
    assignee: "Nora",
    dueDate: "30 nov.",
  },
] as const;

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    columns,
    issues,
  });
}
