import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

// Validate DATABASE_URL format for SQLite
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("❌ DATABASE_URL environment variable is not set");
  throw new Error("DATABASE_URL environment variable is required");
}

if (!databaseUrl.startsWith("file:")) {
  console.error(
    `❌ Invalid DATABASE_URL format for SQLite. Expected format: file:./path/to/db.db\nCurrent value: ${databaseUrl.substring(0, 50)}...`
  );
  throw new Error(
    `DATABASE_URL must start with "file:" for SQLite. Current format: ${databaseUrl.substring(0, 50)}`
  );
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
