import { useCallback, useState } from "react";

interface State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Tiny imperative wrapper for one-off API calls (no caching).
 * For cached / shared data use React Query.
 */
export function useApiCall<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) {
  const [state, setState] = useState<State<TResult>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: TArgs) => {
      setState({ data: null, loading: true, error: null });
      try {
        const data = await fn(...args);
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        const e = err as { response?: { data?: { message?: string } }; message?: string };
        const message =
          e?.response?.data?.message ?? e?.message ?? "Request failed";
        setState({ data: null, loading: false, error: message });
        throw err;
      }
    },
    [fn],
  );

  return { ...state, execute };
}
