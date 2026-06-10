import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import AOS from "aos";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import Con1linter from "@/assets/con-1-inter.jpg";
import Con1luzoma from "@/assets/con-1-luzoma.jpg";
import Conference1 from "@/assets/con-1.jpg";
import Conference2 from "@/assets/con-2.jpg";
import Conference3 from "@/assets/con-3.jpg";
import Conference4 from "@/assets/con-4.jpeg";
import Conference5 from "@/assets/con-5.jpg";

const allConferences = [
  {
    id: "conf-1",
    titleAr: "المؤتمر الأول للعلاج الطبيعي",
    titleEn: "1st Physical Therapy Conference",
    descriptionAr: "المؤتمر الأول الذي أقامته الجمعية السعودية للعلاج الطبيعي",
    descriptionEn:
      "The first conference organized by the Saudi Physical Therapy Association",
    image: Conference1,
    edition: 1,
  },
  {
    id: "conf-2",
    titleAr: "المؤتمر الثاني للعلاج الطبيعي",
    titleEn: "2nd Physical Therapy Conference",
    descriptionAr: "المؤتمر الثاني للجمعية السعودية للعلاج الطبيعي",
    descriptionEn:
      "The second conference organized by the Saudi Physical Therapy Association",
    image: Conference2,
    edition: 2,
  },
  {
    id: "conf-3",
    titleAr: "المؤتمر الثالث للعلاج الطبيعي",
    titleEn: "3rd Physical Therapy Conference",
    descriptionAr: "المؤتمر الثالث للجمعية السعودية للعلاج الطبيعي",
    descriptionEn:
      "The third conference organized by the Saudi Physical Therapy Association",
    image: Conference3,
    edition: 3,
  },
  {
    id: "lymphedema-1",
    titleAr: "المؤتمر الأول للوذمة اللمفاوية",
    titleEn: "1st Lymphedema Conference",
    descriptionAr: "مؤتمر متخصص في الوذمة اللمفاوية وإعادة التأهيل",
    descriptionEn:
      "Specialized conference focused on lymphedema and rehabilitation",
    image: Con1luzoma,
    edition: 4,
  },
  {
    id: "conf-4",
    titleAr: "المؤتمر السعودي الدولي الرابع للعلاج الطبيعي",
    titleEn: "4th Saudi International Physical Therapy Conference",
    descriptionAr: "المؤتمر السعودي الدولي الرابع للعلاج الطبيعي",
    descriptionEn: "The 4th Saudi International Physical Therapy Conference",
    image: Conference4,
    edition: 5,
  },
  {
    id: "stroke-1",
    titleAr: "المؤتمر السعودي الدولي الأول للجلطة الدماغية",
    titleEn: "1st Saudi International Stroke Conference",
    descriptionAr: "مؤتمر متخصص في الجلطات الدماغية وإعادة التأهيل العصبي",
    descriptionEn:
      "Specialized conference on stroke management and neurological rehabilitation",
    image: Con1linter,
    edition: 6,
  },
  {
    id: "conf-5",
    titleAr: "المؤتمر السعودي الدولي الخامس للعلاج الطبيعي",
    titleEn: "5th Saudi International Physical Therapy Conference",
    descriptionAr: "أحدث مؤتمرات الجمعية السعودية للعلاج الطبيعي",
    descriptionEn:
      "The latest Saudi International Physical Therapy Conference organized by the Association",
    image: Conference5,
    edition: 7,
  },
];

const ConferencesPage = () => {
  const { t, isRTL } = useLanguage();
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Hero card = last (most recent), rest displayed below
  const [hero, ...rest] = [...allConferences].reverse();
  // Second featured = large side-by-side pair
  const featured = rest.slice(0, 2);
  const grid = rest.slice(2);

  return (
    <Layout>
      {/* ── HERO ── */}
      <section
        className="relative min-h-[360px] flex items-end overflow-hidden"
        style={{ background: "var(--gradient-navy)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 start-1/4 w-[500px] h-[500px] rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent, #d4a84b) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 end-0 w-[300px] h-[300px] rounded-full opacity-5"
            style={{
              background: "radial-gradient(circle, #fff 0%, transparent 70%)",
            }}
          />
        </div>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border-primary,rgba(255,255,255,.2)) 1px,transparent 1px),linear-gradient(90deg,var(--color-border-primary,rgba(255,255,255,.2)) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="container mx-auto px-4 pb-16 pt-28 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">
              {t(
                "الجمعية السعودية للعلاج الطبيعي",
                "Saudi Physical Therapy Association",
              )}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {t("المؤتمرات والفعاليات", "Conferences & Events")}
            </h1>
            <p className="mt-4 text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              {t(
                "سجل كامل لمؤتمرات الجمعية السعودية للعلاج الطبيعي منذ التأسيس حتى اليوم",
                "A complete record of SPTA conferences from founding to present day",
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14 space-y-6">
        {/* ── HERO CARD — full-bleed tall ── */}
        <div data-aos="fade-up">
          <article
            className="group relative w-full overflow-hidden rounded-3xl"
            style={{ height: "clamp(320px, 55vw, 560px)" }}
          >
            <img
              src={hero.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {/* dark vignette — stronger at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(5,10,30,.15) 0%, rgba(5,10,30,.0) 30%, rgba(5,10,30,.75) 75%, rgba(5,10,30,.95) 100%)",
              }}
            />
            {/* edition tag */}
            <div
              className="absolute top-5 start-5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: "rgba(255,255,255,.12)",
                color: "rgba(255,255,255,.7)",
                backdropFilter: "blur(8px)",
                border: "0.5px solid rgba(255,255,255,.15)",
              }}
            >
              #{hero.edition}
            </div>
            {/* latest badge */}
            <div
              className="absolute top-5 end-5 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{
                background: "var(--color-background-warning)",
                color: "var(--color-text-warning)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {t("الأحدث", "Latest")}
            </div>
            {/* content */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-4xl font-bold text-white leading-snug mb-2">
                  {t(hero.titleAr, hero.titleEn)}
                </h2>
                <p className="text-white/55 text-sm md:text-base line-clamp-2 max-w-2xl">
                  {t(hero.descriptionAr, hero.descriptionEn)}
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* ── FEATURED PAIR — two tall cards side by side ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((c, i) => (
            <div data-aos="fade-up" data-aos-delay={i * 80}>
              <article
                className="group relative w-full overflow-hidden rounded-2xl"
                style={{ height: "clamp(260px, 38vw, 420px)" }}
              >
                <img
                  src={c.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(5,10,30,.92) 0%, rgba(5,10,30,.35) 55%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute top-4 start-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(5,10,30,.6)",
                    color: "rgba(255,255,255,.7)",
                    backdropFilter: "blur(6px)",
                    border: "0.5px solid rgba(255,255,255,.15)",
                  }}
                >
                  {c.edition}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-1">
                      {t(c.titleAr, c.titleEn)}
                    </h3>
                    <p className="text-white/50 text-xs line-clamp-2">
                      {t(c.descriptionAr, c.descriptionEn)}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ── GRID — remaining cards ── */}
        {grid.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {grid.map((c, i) => (
              <div data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <article
                  className="group relative w-full overflow-hidden rounded-2xl"
                  style={{ height: "clamp(220px, 28vw, 320px)" }}
                >
                  <img
                    src={c.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
                  />
                  {/* subtle color grade on hover reveal */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "rgba(10,20,60,.15)",
                      mixBlendMode: "multiply",
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,10,30,.9) 0%, rgba(5,10,30,.2) 50%, transparent 100%)",
                    }}
                  />
                  {/* edition pill */}
                  <div
                    className="absolute top-3 start-3 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "rgba(5,10,30,.65)",
                      color: "rgba(255,255,255,.75)",
                      backdropFilter: "blur(6px)",
                      border: "0.5px solid rgba(255,255,255,.12)",
                    }}
                  >
                    {c.edition}
                  </div>
                  {/* content */}
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="text-sm md:text-base font-bold text-white leading-snug mb-1 line-clamp-2">
                      {t(c.titleAr, c.titleEn)}
                    </h3>
                    <p className="text-white/50 text-xs line-clamp-2 max-h-0 overflow-hidden group-hover:max-h-10 transition-all duration-500">
                      {t(c.descriptionAr, c.descriptionEn)}
                    </p>
                  </div>
                  {/* bottom accent line */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-start"
                    style={{ background: "var(--color-accent, #d4a84b)" }}
                  />
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ConferencesPage;
