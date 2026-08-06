export interface User {
  _id?: string;
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  phone?: string;
}