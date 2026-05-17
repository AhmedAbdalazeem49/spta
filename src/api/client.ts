/**
 * Centralized API client.
 * All feature services should import from here instead of `@/services/api`
 * so we have a single chokepoint for interceptors, retries, and base URL.
 */
export { default as api } from "@/services/api";
export { default } from "@/services/api";
