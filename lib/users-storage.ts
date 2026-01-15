import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
};

// Use /tmp on Vercel (writable), otherwise use lib/users.json locally
const USERS_FILE =
  process.env.VERCEL || process.env.NODE_ENV === "production"
    ? "/tmp/users.json"
    : join(process.cwd(), "lib", "users.json");

function ensureUsersFile() {
  if (!existsSync(USERS_FILE)) {
    writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

export function getUsers(): User[] {
  ensureUsersFile();
  try {
    const content = readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    return [];
  }
}

export function saveUsers(users: User[]) {
  ensureUsersFile();
  writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
  role?: string;
}): Promise<User> {
  const users = getUsers();
  
  if (users.some((u) => u.email === data.email)) {
    throw new Error("Un compte existe déjà avec cet email.");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    email: data.email,
    password: hashedPassword,
    name: data.name,
    role: data.role || "member",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = getUsers();
  return users.find((u) => u.email === email) || null;
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}
