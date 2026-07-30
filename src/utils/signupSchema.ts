import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Minimum 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Minimum 6 characters"),
});

export type SignupFormData = z.infer<typeof signupSchema>;