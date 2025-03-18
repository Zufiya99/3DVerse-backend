import { z } from "zod";

export const adminSchema = z.object({
  username: z.string().min(5, "Username must be at least 3 characters long"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(/@mhssce\.ac\.in$/, "Must be a college email (@mhssce.ac.in)"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
