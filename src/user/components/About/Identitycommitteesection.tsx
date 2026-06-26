import { motion, useInView } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  LayoutTemplate,
  Microscope,
  Palette,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useRef } from "react";

// ─── data ─────────────────────────────────────────────────────────────────────

const LEADERSHIP = [
  {
    name: "شوق سعد الحربي",
    role: "مدير اللجنة",
    pill: "head",
    icon: ShieldCheck,
    color: "indigo",
  },
  {
    name: "غيداء إبراهيم الريس",
    role: "نائب مدير اللجنة",
    pill: "deputy",
    icon: GraduationCap,
    color: "violet",
  },
];

const DESIGN_UNIT = [
  {
    name: "غيداء إبراهيم الريس",
    role: "مدير وحدة التصميم",
    pill: "head",
    icon: Palette,
    color: "indigo",
  },
  {
    name: "شذا الحميدي العتيبي",
    role: "نائب المدير",
    pill: "deputy",
    icon: LayoutTemplate,
    color: "violet",
  },
];

const CONTENT_UNIT = [
  {
    name: "راكان خالد القرشي",
    role: "مدير وحدة المحتوى العلمي",
    pill: "head",
    icon: BookOpen,
    color: "indigo",
  },
  {
    name: "عبدالله نعمان اليمني",
    role: "نائب المدير",
    pill: "deputy",
    icon: BookOpen,
    color: "violet",
  },
  {
    name: "جود أسامة عامودي",
    role: "نائب المدير",
    pill: "deputy",
    icon: BookOpen,
    color: "violet",
  },
];

// ─── colour maps ───────────────────────────────────────────────────────────────

const iconBg = {
  indigo: "bg-indigo-100 dark:bg-indigo-900/40",
  violet: "bg-violet-100 dark:bg-violet-900/40",
};

const iconColor = {
  indigo: "text-indigo-600 dark:text-indigo-400",
  violet: "text-violet-600 dark:text-violet-400",
};

const pillCls = {
  head: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800",
  deputy:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300 border border-violet-200 dark:border-violet-800",
};

const pillDot = {
  head: "bg-indigo-500",
  deputy: "bg-violet-500",
};

// ─── MemberCard ───────────────────────────────────────────────────────────────

const MemberCard = ({ member, index }) => {
  const Icon = member.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative flex items-center gap-4 rounded-2xl border border-border/50
                 bg-card p-4 overflow-hidden
                 hover:border-indigo-300 dark:hover:border-indigo-700
                 hover:-translate-y-1 transition-all duration-300 cursor-default"
    >
      {/* hover tint */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-indigo-50/40 dark:bg-indigo-900/10 transition-opacity duration-300 rounded-2xl"
      />

      {/* left accent bar */}
      <div
        className="absolute inset-y-0 start-0 w-[3px] rounded-e-full
                      bg-indigo-400 dark:bg-indigo-600
                      scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300"
      />

      {/* icon */}
      <div
        className={`relative z-10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0
                    ${iconBg[member.color]} transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={`w-5 h-5 ${iconColor[member.color]}`} />
      </div>

      {/* text */}
      <div className="relative z-10 min-w-0 flex-1">
        <p className="text-sm font-bold text-foreground leading-snug">
          {member.name}
        </p>
        <span
          className={`mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${pillCls[member.pill]}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${pillDot[member.pill]}`}
          />
          {member.role}
        </span>
      </div>
    </motion.div>
  );
};

// ─── UnitBlock ────────────────────────────────────────────────────────────────

const UnitBlock = ({ icon: Icon, label, members, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="mb-8"
  >
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/40
                      flex items-center justify-center shrink-0"
      >
        <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <div className="flex-1 h-px bg-border/60" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {members.map((m, i) => (
        <MemberCard key={`${m.name}-${i}`} member={m} index={i} />
      ))}
    </div>
  </motion.div>
);

// ─── main ─────────────────────────────────────────────────────────────────────

const IdentityCommitteeSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      dir="rtl"
      className="relative py-20 bg-background overflow-hidden"
    >
      {/* ambient glow */}
      <motion.div
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 40% at 50% 90%, rgba(99,102,241,0.06), transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ── header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          {/* eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                          bg-indigo-100 dark:bg-indigo-900/40
                          text-indigo-700 dark:text-indigo-300
                          text-xs font-bold tracking-wide mb-5 border border-indigo-200 dark:border-indigo-800"
          >
            <Users className="w-3.5 h-3.5" />
            لجان الجمعية
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                لجنة الهوية البصرية
                <br />
                <span className="text-indigo-600 dark:text-indigo-400">
                  والمحتوى العلمي
                </span>
              </h2>
              <div className="mt-3 h-1 w-14 rounded-full bg-indigo-500" />
              <p className="mt-4 text-muted-foreground text-sm max-w-md leading-relaxed">
                تتولى هذه اللجنة الإشراف على الهوية البصرية للجمعية وإدارة
                محتواها العلمي بما يعكس رؤيتها الاستراتيجية.
              </p>
            </div>

            {/* stat cards */}
            <div className="flex gap-3">
              {[
                { value: "2", label: "وحدة عمل" },
                { value: "7", label: "عضو في اللجنة" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border/50 rounded-2xl px-5 py-4 text-center min-w-[88px]"
                >
                  <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400 leading-none">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1.5 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── leadership ── */}
        <UnitBlock
          icon={ShieldCheck}
          label="قيادة اللجنة"
          members={LEADERSHIP}
          delay={0.1}
        />

        {/* ── design unit ── */}
        <UnitBlock
          icon={Palette}
          label="وحدة التصميم"
          members={DESIGN_UNIT}
          delay={0.2}
        />

        {/* ── content unit ── */}
        <UnitBlock
          icon={BookOpen}
          label="وحدة المحتوى العلمي"
          members={CONTENT_UNIT}
          delay={0.3}
        />

        {/* ── journal banner ── */}
        <motion.a
          href="https://spta.ksu.edu.sa/ar/node/2887"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="group flex items-center gap-4 rounded-2xl
                     border border-indigo-200 dark:border-indigo-800
                     bg-indigo-50/60 dark:bg-indigo-950/30
                     p-5 no-underline
                     hover:border-indigo-400 dark:hover:border-indigo-600
                     hover:bg-indigo-50 dark:hover:bg-indigo-950/50
                     transition-all duration-300"
        >
          <div
            className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/60
                          flex items-center justify-center shrink-0
                          group-hover:scale-105 transition-transform duration-300"
          >
            <Microscope className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100">
              المجلة العلمية التابعة للجمعية
            </p>
            <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70 mt-0.5">
              International Journal of Physical Therapy Research &amp; Practice
            </p>
          </div>

          <div className="me-auto" />

          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                          bg-indigo-600 text-white text-xs font-bold shrink-0
                          group-hover:bg-indigo-700 transition-colors duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            زيارة المجلة
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default IdentityCommitteeSection;
