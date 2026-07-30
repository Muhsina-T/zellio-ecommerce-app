import type { User } from "../types/User";
import { USERS_KEY, CURRENT_USER_KEY } from "./storage";

const defaultAdmin: User = {
  id: crypto.randomUUID(),
  name: "Admin",
  email: "admin@zellio.com",
  password: "admin123",
  role: "admin",
};

export function initializeUsers() {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([defaultAdmin])
    );
  }
}

export function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);

  return users ? JSON.parse(users) : [];
}

export function saveUsers(users: User[]) {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
}

export function registerUser(
  name: string,
  email: string,
  password: string
) {
  const users = getUsers();

  const exists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    throw new Error("Email already exists");
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: "user",
  };

  users.push(newUser);

  saveUsers(users);

  return newUser;
}

export function loginUser(email: string, password: string) {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  setCurrentUser(user);

  return user;
}

export function setCurrentUser(user: User) {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
}

export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  return user ? JSON.parse(user) : null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}