import { z } from "zod";

const registerSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export { registerSchema, loginSchema };
