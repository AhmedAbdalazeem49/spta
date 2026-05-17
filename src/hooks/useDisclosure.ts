import { useCallback, useState } from "react";

/**
 * Standardized open/close state for modals and popovers.
 * Replaces ad-hoc `const [open, setOpen] = useState(false)` patterns.
 */
export function useDisclosure(initial = false) {
  const [isOpen, setOpen] = useState(initial);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);
  return { isOpen, open, close, toggle, setOpen };
}
