import api from "../api/api";
import type { User } from "../types/User";

const AUTH_TOKEN_KEY = "zellio_token";

export function initializeUsers() {
  return Promise.resolve();
}

function persistAuth(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const res = await api.post("/users/register", {
      name,
      email,
      password,
    });

    const { user, token } = res.data;

    persistAuth(token);

    return user as User;
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message
        : "Registration failed";

    throw new Error(message || "Registration failed");
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await api.post("/users/login", { email, password });

    const { user, token } = res.data;

    persistAuth(token);

    return user as User;
  } catch (error: unknown) {
    const message =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message
        : "Invalid email or password";

    throw new Error(message || "Invalid email or password");
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const res = await api.get("/users/profile");
    return res.data;
  } catch {
    return null;
  }
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}