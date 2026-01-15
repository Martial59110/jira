import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { useTranslations } from "next-intl";
const prisma = new PrismaClient();

async function main() {
  const t = useTranslations();
  const users = [
    {
      email: "marti@example.com",
      password: "admin123",
      name: "Marti",
      role: "admin",
    },
    {
      email: "team@example.com",
      password: "member123",
      name: "Teammate",
      role: "member",
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      create: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role,
      },
      update: {
        password: hashedPassword,
        name: user.name,
        role: user.role,
      },
    });
  }

  const authorByEmail = await prisma.user.findMany().then((list) =>
    list.reduce<Record<string, string>>((acc, user) => {
      acc[user.email] = user.id;
      return acc;
    }, {}),
  );

  await prisma.issue.deleteMany();
  await prisma.activity.deleteMany();

  const issues = [
    {
      code: "MYJ-214",
      title: "Tâche 1",
      status: "todo",
      assignee: "Victor",
      dueDate: new Date("2025-11-27"),
      authorEmail: "marti@example.com",
    },
    {
      code: "MYJ-215",
      title: "Tâche 2",
      status: "done",
      assignee: "Léa",
      dueDate: new Date("2025-11-28"),
      authorEmail: "marti@example.com",
    },
    {
      code: "MYJ-216",
      title: "Tâche 3",
      status: "blocked",
      assignee: "Yasmine",
      dueDate: new Date("2025-11-29"),
      authorEmail: "team@example.com",
    },
    {
      code: "MYJ-217",
      title: "Audit sécurité",
      status: "inProgress",
      assignee: "Nora",
      dueDate: new Date("2025-12-01"),
      authorEmail: "team@example.com",
    },
  ];

  for (const issue of issues) {
    await prisma.issue.upsert({
      where: { code: issue.code },
      create: {
        code: issue.code,
        title: issue.title,
        status: issue.status,
        assignee: issue.assignee,
        dueDate: issue.dueDate,
        authorId: authorByEmail[issue.authorEmail],
      },
      update: {
        title: issue.title,
        status: issue.status,
        assignee: issue.assignee,
        dueDate: issue.dueDate,
      },
    });
  }

  const activities = [
    {
      author: "Léa",
      action: "a créé le ticket MYJ-214" + " " + t("todo"),
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      author: "Victor",
      action: "a déplacé MYJ-198 vers " + " " + t("inProgress"),
      timestamp: new Date(Date.now() - 32 * 60 * 1000),
    },
    {
      author: "Yasmine",
      action: "a clôturé MYJ-176" + " " + t("done"),
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
  ];

  await prisma.activity.createMany({
    data: activities,
  });

  console.log("Seed completed");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
