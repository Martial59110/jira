import { NextResponse } from "next/server";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json({
    totals: {
      backlog: 42,
      inProgress: 18,
      done: 96,
      blocked: 5,
    },
    activity: [
      {
        id: "1",
        author: "Léa",
        action: "a créé le ticket MYJ-214",
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        author: "Victor",
        action: "a déplacé MYJ-198 vers En cours",
        timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        author: "Yasmine",
        action: "a clôturé MYJ-176",
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ],
  });
}
