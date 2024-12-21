import { z } from 'zod';
import { ERROR_MESSAGES } from '../errors/messages';

// Base schemas for reusable validation rules
const emailSchema = z.string()
  .email(ERROR_MESSAGES.validation.invalid_email)
  .min(1, ERROR_MESSAGES.validation.required);

const passwordSchema = z.string()
  .min(8, ERROR_MESSAGES.validation.min_length('Password', 8))
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Form schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, ERROR_MESSAGES.validation.required),
  rememberMe: z.boolean().optional()
});

export const registerSchema = z.object({
  fullName: z.string()
    .min(2, ERROR_MESSAGES.validation.min_length('Full name', 2))
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: ERROR_MESSAGES.validation.password_mismatch,
  path: ["confirmPassword"]
});

export const contactSchema = z.object({
  name: z.string().min(2, ERROR_MESSAGES.validation.min_length('Name', 2)),
  email: emailSchema,
  message: z.string().min(10, ERROR_MESSAGES.validation.min_length('Message', 10))
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;