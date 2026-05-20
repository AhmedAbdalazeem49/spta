import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, GraduationCap, Lock, LogIn, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginRequiredModalProps {
  open: boolean;
  onClose: () => void;
  workshopTitle?: string;
  t: (ar: string, en: string) => string;
}

export const LoginRequiredModal = ({
  open,
  onClose,
  workshopTitle,
  t,
}: LoginRequiredModalProps) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="login-panel"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl bg-background border border-border/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative top stripe */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

              {/* Animated icon area */}
              <div className="flex flex-col items-center pt-8 pb-6 px-6 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.12,
                    type: "spring",
                    stiffness: 300,
                    damping: 18,
                  }}
                  className="relative mb-5"
                >
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full bg-primary/25 blur-md"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Lock className="w-9 h-9 text-primary" strokeWidth={1.6} />
                  </div>
                  {/* Sparkle */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 }}
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                >
                  <h2 className="text-xl font-bold mb-2 leading-snug">
                    {t("تسجيل الدخول مطلوب", "Login Required")}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {workshopTitle
                      ? t(
                          `للتسجيل في "${workshopTitle}" يجب أن تكون مسجلاً في المنصة`,
                          `To register for "${workshopTitle}" you need to be signed in`
                        )
                      : t(
                          "يجب تسجيل الدخول للاشتراك في ورش العمل",
                          "You need to sign in to register for workshops"
                        )}
                  </p>
                </motion.div>

                {/* Divider with workshop name pill */}
                {workshopTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.24 }}
                    className="mt-4 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-xs font-medium text-primary max-w-full truncate"
                  >
                    <GraduationCap className="w-3 h-3 inline me-1.5 shrink-0" />
                    {workshopTitle}
                  </motion.div>
                )}
              </div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="px-6 pb-6 space-y-2.5"
              >
                <Button
                  className="w-full gap-2 h-11 text-sm font-semibold rounded-xl"
                  onClick={() => {
                    onClose();
                    navigate("/login", {
                      state: { from: { pathname: "/workshops" } },
                    });
                  }}
                >
                  <LogIn className="w-4 h-4" />
                  {t("تسجيل الدخول", "Sign In")}
                  <ArrowRight className="w-3.5 h-3.5 ms-auto opacity-60" />
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-9 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                  onClick={onClose}
                >
                  {t("ليس الآن", "Maybe Later")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
