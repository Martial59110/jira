import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const defaultTotals = {
  backlog: 0,
  inProgress: 0,
  done: 0,
  blocked: 0,
};

const statusToKey: Record<string, keyof typeof defaultTotals> = {
  todo: "backlog",
  inProgress: "inProgress",
  done: "done",
  blocked: "blocked",
};

export async function GET() {
  const grouped = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const totals = { ...defaultTotals };
  for (const entry of grouped) {
    const key = statusToKey[entry.status] ?? "backlog";
    totals[key] = entry._count.status;
  }

  const activity = await prisma.activity.findMany({
    orderBy: { timestamp: "desc" },
    take: 5,
  });

  return NextResponse.json({
    totals,
    activity: activity.map((item) => ({
      id: item.id,
      author: item.author,
      action: item.action,
      timestamp: item.timestamp.toISOString(),
    })),
  });
}
