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
  });
}
