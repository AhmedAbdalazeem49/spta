import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  FileText,
  Presentation,
} from "lucide-react";

import ConferenceBanner from "@/assets/conference-6-spta-logo.webp";

const ConferenceSubmissionBanner = () => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-[32px] border border-white/10 bg-white shadow-xl"
      >
        {/* Banner Image */}
        <img
          src={ConferenceBanner}
          alt="6th Saudi International Physiotherapy Conference"
          className="w-full object-cover"
        />

        <div className="p-8 md:p-14">
          <span className="inline-flex rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            {t(
              "المؤتمر السعودي الدولي السادس للعلاج الطبيعي",
              "The 6th Saudi International Physiotherapy Conference",
            )}
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            {t(
              "شارك خبرتك وساهم في تطوير مستقبل العلاج الطبيعي",
              "Share Your Expertise & Shape the Future of Physiotherapy",
            )}
          </h2>

          <p className="mt-6  text-lg leading-8 text-muted-foreground">
            {t(
              "تدعو الجمعية السعودية للعلاج الطبيعي الباحثين والأكاديميين والممارسين الصحيين للمشاركة في المؤتمر السعودي الدولي السادس للعلاج الطبيعي من خلال تقديم الملخصات العلمية أو مقترحات ورش العمل. تمثل هذه الفرصة منصة علمية متميزة لتبادل المعرفة، واستعراض أحدث الأبحاث، ومناقشة أفضل الممارسات مع نخبة من الخبراء والمتخصصين من داخل المملكة وخارجها.",
              "The Saudi Physical Therapy Association invites researchers, clinicians, educators, and healthcare professionals to participate in the 6th Saudi International Physiotherapy Conference by submitting scientific abstracts or workshop proposals. This prestigious conference provides a unique platform to showcase research, exchange knowledge, discuss clinical innovations, and connect with leading national and international experts in physiotherapy and rehabilitation.",
            )}
          </p>

          {/* Highlights */}

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border bg-muted/30 p-6">
              <Presentation className="mb-4 h-8 w-8 text-accent" />
              <h3 className="font-semibold">
                {t("ورش العمل", "Workshop Proposals")}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  "شارك بورشة عمل تفاعلية يقودها خبراء ومتخصصون.",
                  "Deliver an engaging educational workshop led by experts.",
                )}
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-6">
              <FileText className="mb-4 h-8 w-8 text-accent" />
              <h3 className="font-semibold">
                {t("الملخصات العلمية", "Scientific Abstracts")}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  "اعرض نتائج أبحاثك أمام نخبة من المختصين.",
                  "Present your latest research to an international audience.",
                )}
              </p>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-6">
              <CalendarDays className="mb-4 h-8 w-8 text-accent" />
              <h3 className="font-semibold">
                {t("مؤتمر دولي", "International Conference")}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {t(
                  "فرصة للتواصل العلمي وبناء شراكات مهنية.",
                  "Network with world-class professionals and institutions.",
                )}
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="https://sptaworkshop-mckvddhf.manus.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 font-semibold text-accent-foreground transition hover:scale-[1.02]"
            >
              {t("تقديم ورش العمل", "Workshop Submission")}
              <ArrowUpRight size={18} />
            </a>

            <a
              href="https://sptaconf-rtge7wgu.manus.space/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-7 py-4 font-semibold transition hover:bg-muted"
            >
              {t("تقديم الملخصات", "Abstract Submission")}
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ConferenceSubmissionBanner;
