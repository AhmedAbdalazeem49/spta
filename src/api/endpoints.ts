/**
 * Centralized API endpoint constants.
 * Use these instead of hard-coded strings in services.
 */

export const AUTH_ENDPOINTS = {
  login: "/login",
  register: "/register",
  logout: "/logout",
  me: "/me",
  verifyOtp: "/verify-otp",
  resendOtp: "/resend-otp",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export const MEMBERSHIP_ENDPOINTS = {
  list: "/memberships",
  mine: "/memberships/mine",
  subscribe: "/memberships/subscribe",
  renew: "/memberships/renew",
  adminList: "/admin/memberships",
} as const;

export const PAYMENT_ENDPOINTS = {
  create: "/payments/create",
  verify: "/payments/verify",
} as const;

export const CERTIFICATE_ENDPOINTS = {
  mine: "/certificates/mine",
  verify: (code: string) => `/certificates/verify/${code}`,
  adminList: "/admin/certificates",
} as const;

export const CONFERENCE_ENDPOINTS = {
  list: "/conferences",
  detail: (id: string | number) => `/conferences/${id}`,
  register: (id: string | number) => `/conferences/${id}/register`,
} as const;

export const WORKSHOP_ENDPOINTS = {
  list: "/workshops",
  detail: (id: string | number) => `/workshops/${id}`,
  register: (id: string | number) => `/workshops/${id}/register`,
  adminCreate: "/admin/workshops",
  adminUpdate: (id: string | number) => `/admin/workshops/${id}`,
  adminDelete: (id: string | number) => `/admin/workshops/${id}`,
  adminSyncCertificates: (id: string | number) => `/admin/workshops/${id}/sync-certificates`,
} as const;

export const USER_ENDPOINTS = {
  adminList: "/admin/users",
  adminUpdateStatus: (id: string | number) => `/admin/users/${id}/status`,
} as const;

export const COUPON_ENDPOINTS = {
  list: "/promo-codes",
  validate: "/promo-codes/validate",
  adminCreate: "/admin/promo-codes",
  adminDelete: (id: string | number) => `/admin/promo-codes/${id}`,
} as const;


