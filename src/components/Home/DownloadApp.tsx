import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const DownloadApp = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden" id="app">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t("حمّل تطبيق SPTA", "Download SPTA App")}
            </h2>

            <p className="text-xl text-primary-foreground/80 mb-8">
              {t(
                "احصل على جميع خدمات الجمعية في جيبك. تطبيق سهل الاستخدام يوفر لك الوصول السريع للمكتبة الإلكترونية والأخبار والفعاليات.",
                "Get all association services in your pocket. An easy-to-use app that gives you quick access to the digital library, news, and events."
              )}
            </p>

            <div className="flex gap-4 flex-wrap">
              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-xl hover:bg-primary-foreground/90 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>

                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-xs block opacity-80">
                    {t("متوفر على", "Download on")}
                  </span>
                  <span className="font-semibold">App Store</span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-3 bg-primary-foreground text-primary px-6 py-3 rounded-xl hover:bg-primary-foreground/90 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.5 1.5 0 01-.109-.531V2.344a1.5 1.5 0 01.108-.53zm10.89 9.479l2.708-2.708 5.904 3.349c.476.27.476.932 0 1.201l-5.904 3.35-2.708-2.708L12 12l2.5-.707zM4.4.935l8.676 8.677 2.708-2.708L5.502.238A1.5 1.5 0 004.4.935zm8.676 12.453L4.4 23.065a1.5 1.5 0 001.102.697l10.282-6.666-2.708-2.708z" />
                </svg>

                <div className={isRTL ? "text-right" : "text-left"}>
                  <span className="text-xs block opacity-80">
                    {t("متوفر على", "Get it on")}
                  </span>
                  <span className="font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Mockup */}
          <div
            className="flex justify-center"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="w-64 h-[500px] bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-primary-foreground rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-b-2xl" />

                  <div className="pt-10 px-4">
                    <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center mb-4">
                      <span className="text-primary-foreground font-bold text-2xl">
                        S
                      </span>
                    </div>

                    <p className="text-center text-foreground font-bold text-lg">
                      SPTA
                    </p>

                    <p className="text-center text-muted-foreground text-sm">
                      {t("الجمعية السعودية", "Saudi Physical")}
                    </p>
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
