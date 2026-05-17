import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

/**
 * Map a Laravel-style validation error response onto a react-hook-form.
 * Expected shape: { errors: { field: ["msg", ...] }, message?: string }
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): string | null {
  const e = error as {
    response?: { data?: { errors?: Record<string, string[]>; message?: string } };
    message?: string;
  };
  const errors = e?.response?.data?.errors;
  if (errors) {
    Object.entries(errors).forEach(([field, messages]) => {
      const msg = Array.isArray(messages) ? messages[0] : String(messages);
      setError(field as Path<T>, { type: "server", message: msg });
    });
    return e?.response?.data?.message ?? null;
  }
  return (
    e?.response?.data?.message ??
    e?.message ??
    "Something went wrong. Please try again."
  );
}
