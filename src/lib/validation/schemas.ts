import { z } from "zod";
import {
  classificationNumberField,
  emailField,
  nameField,
  otpField,
  passwordField,
  promoCodeField,
  saudiPhoneField,
  strongPasswordField,
} from "./primitives";

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: nameField,
    email: emailField,
    phone: saudiPhoneField,
    password: strongPasswordField,
    password_confirmation: passwordField,
    membership_type: z.enum(["active", "affiliate", "intern", "student"], {
      required_error: "Choose a membership type",
    }),
    classification_number: classificationNumberField,
    promo_code: promoCodeField,
    terms_accepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((d) => d.password === d.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });
export type SignupInput = z.infer<typeof signupSchema>;

export const forgotPasswordSchema = z.object({ email: emailField });
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    email: emailField,
    token: z.string().min(1, "Reset token is required"),
    password: strongPasswordField,
    password_confirmation: passwordField,
  })
  .refine((d) => d.password === d.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const verifyOtpSchema = z.object({
  email: emailField,
  otp: otpField,
});
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const contactSchema = z.object({
  name: nameField,
  email: emailField,
  phone: saudiPhoneField.optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "Message is too short").max(2000),
});
export type ContactInput = z.infer<typeof contactSchema>;

export const workshopRegistrationSchema = z.object({
  name: nameField,
  email: emailField,
  phone: saudiPhoneField,
  workshop_id: z.number().int().positive(),
});
export type WorkshopRegistrationInput = z.infer<
  typeof workshopRegistrationSchema
>;

export const conferenceRegistrationSchema = z.object({
  name: nameField,
  email: emailField,
  phone: saudiPhoneField,
  affiliation: z.string().trim().min(2).max(150).optional().or(z.literal("")),
  conference_id: z.number().int().positive(),
});
export type ConferenceRegistrationInput = z.infer<
  typeof conferenceRegistrationSchema
>;

export const membershipSubscribeSchema = z.object({
  membership_type: z.enum(["active", "affiliate", "intern", "student"]),
  promo_code: promoCodeField,
});
export type MembershipSubscribeInput = z.infer<
  typeof membershipSubscribeSchema
>;

export const promoCodeFormSchema = z.object({
  code: z.string().trim().min(2).max(50),
  discount_type: z.enum(["percentage", "fixed", "free"]),
  discount_value: z.coerce.number().min(0),
  expires_at: z.string().optional().or(z.literal("")),
  usage_limit: z.coerce.number().int().min(0).optional(),
});
export type PromoCodeFormInput = z.infer<typeof promoCodeFormSchema>;
