import { z } from "zod";

/**
 * Reusable zod field primitives.
 * All messages are keys — translate at the form layer via t().
 * For now they fall back to readable English defaults.
 */

export const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(255);

export const passwordField = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128);

export const strongPasswordField = passwordField
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[0-9]/, "Must contain a number");

export const nameField = z
  .string({ required_error: "Name is required" })
  .trim()
  .min(2, "Name is too short")
  .max(100, "Name is too long");

// Saudi mobile: 05XXXXXXXX or +9665XXXXXXXX
export const saudiPhoneField = z
  .string()
  .trim()
  .regex(/^(?:\+?966|0)?5\d{8}$/, "Invalid Saudi phone number");

export const nationalIdField = z
  .string()
  .trim()
  .regex(/^\d{10}$/, "National ID / Iqama must be 10 digits");

export const classificationNumberField = z
  .string()
  .trim()
  .min(3, "Classification number is required")
  .max(50);

export const promoCodeField = z
  .string()
  .trim()
  .min(2, "Promo code is too short")
  .max(50)
  .optional()
  .or(z.literal(""));

export const otpField = z
  .string()
  .trim()
  .regex(/^\d{4,8}$/, "Invalid OTP code");
