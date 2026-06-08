"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import sptaConference2 from "@/assets/spta-conference-2.jpg";

export default function About() {
  const { isRTL, t } = useLanguage();

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div data-aos="fade-up">
            <span className="text-accent font-semibold text-lg mb-4 block">
              {t("من نحن", "About Us")}
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t(
                "الجمعية السعودية للعلاج الطبيعي",
                "Saudi Physical Therapy Association",
              )}
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t(
                "تُعتبر الجمعية السعودية للعلاج الطبيعي إحدى الجمعيات العلمية التابعة لجامعة الملك سعود، والتي أُنشئت وفق القواعد المنظمة للجمعيات العلمية في الجامعات السعودية، الصادر بقرار مجلس التعليم العالي والمتوج بموافقة خادم الحرمين الشريفين رئيس مجلس الوزراء ورئيس مجلس التعليم العالي بالتوجيه السامي الكريم رقم 284/م بتاريخ 16/3/1421هـ.",
                "The Saudi Physical Therapy Association is one of the scientific societies affiliated with King Saud University. It was established in accordance with the regulations governing scientific societies in Saudi universities, issued by the Higher Education Council and approved by the Custodian of the Two Holy Mosques, Prime Minister and President of the Higher Education Council, under Royal Decree No. 284/M dated 16/3/1421H.",
              )}
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t(
                "تمارس الجمعية نشاطاتها في تطوير المعارف النظرية والتطبيقية، وتقديم الاستشارات والدراسات العلمية والتطبيقية للقطاعات الصحية العامة والخاصة في مجال العلاج الطبيعي، ولها تمثيل في قطاعات وطنية وعالمية.",
                "The association carries out its activities in advancing theoretical and applied knowledge, and providing consultations, scientific studies, and practical applications to both public and private healthcare sectors in the field of physical therapy. It also has representation in national and international sectors.",
              )}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                "للجمعية مقعد في المجلس الصحي السعودي، كما لها تمثيل عالمي في World Physiotherapy، مما يؤهلها لاستقبال التوصيات العلمية والتعاون البحثي أو التغييرات في المسارات الإكلينيكية على مستوى المملكة العربية السعودية.",
                "The association holds a seat in the Saudi Health Council and is internationally represented in World Physiotherapy, which enables it to receive scientific recommendations and engage in research collaboration and clinical pathway developments across the Kingdom of Saudi Arabia.",
              )}
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t(
                "من أهم واجبات الجمعية مسؤوليتها المجتمعية في تقديم التوعية الصحية من خلال المشاركات المجتمعية، وتطوير مهنة العلاج الطبيعي من الجانب التعليمي والبحثي عبر التعاون المشترك بين الجمعية والمؤسسات الحكومية والخاصة، تحقيقًا لأهداف رؤية المملكة العربية السعودية 2030 لإعادة هيكلة القطاع الصحي ليكون نظامًا صحيًا شاملاً وفعالاً ومتكاملاً، قائمًا على صحة الفرد والمجتمع، وداعمًا لتكامل القطاعات الخيرية والعلمية والخاصة لخدمة المجتمع.",
                "One of the association’s key responsibilities is its community role in promoting health awareness through community engagement, and in advancing the physical therapy profession academically and research-wise through collaboration between the association and governmental and private institutions. This aligns with Saudi Vision 2030 goals of restructuring the healthcare sector into a comprehensive, efficient, and integrated system based on the health of individuals and society, and supporting the integration of charitable, scientific, and private sectors in serving the community.",
              )}
            </p>

            <Link to="/about">
              <Button className="gap-2" size="lg">
                {t("اقرأ المزيد", "Read More")}
                <ArrowRight
                  className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`}
                />
              </Button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="relative" data-aos="fade-up" data-aos-delay="200">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={sptaConference2}
                alt={t("فعاليات الجمعية", "SPTA Events")}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-8 right-0 lg:-right-8 bg-accent text-accent-foreground p-6 rounded-2xl shadow-lg"
            >
              <span className="text-4xl font-bold block">13</span>
              <span className="text-sm">
                {t("فرعاً حول المملكة", "Branches Across KSA")}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
