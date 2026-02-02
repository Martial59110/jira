import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "@/lib/auth/options";

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
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    // Check for Supabase paused project error
    if (errorMessage.includes("Tenant or user not found") || errorMessage.includes("FATAL")) {
      return NextResponse.json(
        { error: "Database connection failed. Please check your database configuration." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

const createIssueSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères."),
  status: z.enum(["todo", "inProgress", "blocked", "done"]).default("todo"),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
});

async function generateIssueCode() {
  const lastIssue = await prisma.issue.findFirst({
    orderBy: { createdAt: "desc" },
    select: { code: true },
  });

  const baseNumber = lastIssue ? Number(lastIssue.code.split("-")[1]) || 214 : 214;
  return `MYJ-${baseNumber + 1}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Vous devez être connecté." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = createIssueSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Champs invalides.", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const author = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 }
      );
    }

    const code = await generateIssueCode();

    const issue = await prisma.issue.create({
      data: {
        code,
        title: parsed.data.title,
        status: parsed.data.status,
        assignee: parsed.data.assignee || null,
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

    return NextResponse.json({
      success: true,
      issue: {
        id: issue.id,
        code: issue.code,
        title: issue.title,
        status: issue.status,
        assignee: issue.assignee,
        dueDate: issue.dueDate ? dateFormatter.format(issue.dueDate) : null,
      },
    });
  } catch (error) {
    console.error("Error creating issue:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du ticket." },
      { status: 500 }
    );
  }
}
