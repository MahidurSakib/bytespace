import { z } from "zod";

const email = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address"));

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long");

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name")
    .max(60, "Name is too long"),
  email,
  password,
});

export const newsletterSchema = z.object({ email });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type NewsletterValues = z.infer<typeof newsletterSchema>;
