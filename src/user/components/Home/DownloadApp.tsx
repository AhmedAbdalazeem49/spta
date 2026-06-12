import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const DownloadApp = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section
      className="py-24 bg-primary text-primary-foreground relative overflow-hidden"
      id="app"
    >
      {/* Decorative Islamic geometric pattern background */}
      <div className="absolute inset-0 opacity-[0.06]">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="islamicPattern"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M10 0 L20 10 L10 20 L0 10 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="10"
                cy="10"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#islamicPattern)" />
        </svg>
      </div>

      {/* Glow blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div data-aos="fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground" />
              </span>
              <span className="text-sm font-medium text-primary-foreground/90">
                {t("متوفر الآن", "Now Available")}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {t("حمّل تطبيق SPTA", "Download the SPTA App")}
            </h2>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-xl leading-relaxed">
              {t(
                "احصل على جميع خدمات الجمعية في جيبك. تطبيق سهل الاستخدام يوفر لك الوصول السريع للمكتبة الإلكترونية والأخبار والفعاليات.",
                "Get all association services in your pocket. An easy-to-use app that gives you quick access to the digital library, news, and events.",
              )}
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-md">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  ),
                  label: t("مكتبة", "Library"),
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.026 20.026 0 0 1-1.658-5.16m5.32-8.426a3.75 3.75 0 0 1 4.5 0M9 12h6m6 0a8.97 8.97 0 0 1-3.75 7.32A8.967 8.967 0 0 1 12 21a8.967 8.967 0 0 1-5.25-1.68A8.97 8.97 0 0 1 3 12c0-1.255.25-2.45.704-3.535"
                    />
                  ),
                  label: t("أخبار", "News"),
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  ),
                  label: t("فعاليات", "Events"),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl py-4 px-2 hover:bg-primary-foreground/10 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {item.icon}
                  </svg>
                  <span className="text-xs font-medium text-primary-foreground/80">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex gap-4 flex-wrap">
              {/* App Store */}
              <a
                href="#"
                className="group flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-2xl hover:bg-primary-foreground/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-black/10"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-xs block opacity-70">
                    {t("متوفر على", "Download on")}
                  </span>
                  <span className="font-semibold text-base">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="group flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-2xl hover:bg-primary-foreground/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-black/10"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 01-.109-.531V2.344a1.5 1.5 0 01.108-.53zm10.89 9.479l2.708-2.708 5.904 3.349c.476.27.476.932 0 1.201l-5.904 3.35-2.708-2.708L12 12l2.5-.707zM4.4.935l8.676 8.677 2.708-2.708L5.502.238A1.5 1.5 0 004.4.935zm8.676 12.453L4.4 23.065a1.5 1.5 0 001.102.697l10.282-6.666-2.708-2.708z" />
                </svg>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-xs block opacity-70">
                    {t("متوفر على", "Get it on")}
                  </span>
                  <span className="font-semibold text-base">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Mockup */}
          <div
            className="flex justify-center relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Decorative circles behind phone */}
            <div className="absolute w-72 h-72 rounded-full border border-primary-foreground/10" />
            <div className="absolute w-96 h-96 rounded-full border border-primary-foreground/5" />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Floating notification cards */}
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.9, 1, 0.9] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className={`absolute ${isRTL ? "-right-8 md:-right-16" : "-left-8 md:-left-16"} top-16 bg-primary-foreground text-primary rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 z-20 max-w-[180px]`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold">
                    {t("تم التسجيل بنجاح", "Registration Success")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("ورشة العمل #12", "Workshop #12")}
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className={`absolute ${isRTL ? "-left-6 md:-left-14" : "-right-6 md:-right-14"} bottom-24 bg-primary-foreground text-primary rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3 z-20 max-w-[170px]`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>
                <div className="text-xs leading-tight">
                  <p className="font-semibold">
                    {t("مقال جديد متاح", "New Article Out")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("المكتبة", "Library")}
                  </p>
                </div>
              </motion.div>

              {/* Phone frame */}
              <div className="w-64 h-[520px] bg-foreground rounded-[3rem] p-3 shadow-2xl ring-1 ring-primary-foreground/10 relative z-10">
                <div className="w-full h-full bg-primary-foreground rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl z-10" />

                  {/* App header */}
                  <div className="h-40 bg-gradient-to-br from-primary to-primary/70 relative flex flex-col items-center justify-center pt-6">
                    <div className="absolute inset-0 opacity-10">
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <pattern
                          id="phonePattern"
                          width="14"
                          height="14"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M7 0 L14 7 L7 14 L0 7 Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                          />
                        </pattern>
                        <rect
                          width="100"
                          height="100"
                          fill="url(#phonePattern)"
                          className="text-primary-foreground"
                        />
                      </svg>
                    </div>
                    <div className="w-16 h-16 bg-primary-foreground rounded-2xl flex items-center justify-center mb-2 shadow-lg relative z-10">
                      <span className="text-primary font-bold text-2xl">
                        S
                      </span>
                    </div>
                    <p className="text-primary-foreground font-bold text-lg relative z-10">
                      SPTA
                    </p>
                    <p className="text-primary-foreground/70 text-xs relative z-10">
                      {t("الجمعية السعودية للعلاج الطبيعي", "Saudi Physical Therapy")}
                    </p>
                  </div>

                  {/* App body - fake content cards */}
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="bg-muted/60 rounded-xl p-3 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <div className="w-5 h-5 rounded-full bg-primary/30" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-2 bg-foreground/20 rounded-full w-full" />
                          <div className="h-2 bg-foreground/10 rounded-full w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-background border-t border-border flex items-center justify-around px-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          i === 0 ? "bg-primary/10" : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-sm ${
                            i === 0 ? "bg-primary" : "bg-foreground/20"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;