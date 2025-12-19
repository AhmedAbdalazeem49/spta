import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Quote, ArrowRight, Award, Users, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import hero1 from "@/assets/hero-1.jpg";

const PresidentMessagePage = () => {
  const { t, isRTL } = useLanguage();
  const [typedText, setTypedText] = useState("");
  const [showContent, setShowContent] = useState(false);

  const openingLine = t(
    "بسم الله الرحمن الرحيم، أعزائي أعضاء الجمعية السعودية للعلاج الطبيعي...",
    "In the name of Allah, the Most Gracious, the Most Merciful. Dear members of SPTA..."
  );

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < openingLine.length) {
        setTypedText(openingLine.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowContent(true), 500);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [openingLine]);

  const messageContent = [
    {
      text: t(
        "يسعدني أن أرحب بكم في الموقع الرسمي للجمعية السعودية للعلاج الطبيعي، هذا الصرح العلمي والمهني الذي نفخر به جميعاً. منذ تأسيس الجمعية ونحن نسعى جاهدين لتطوير مهنة العلاج الطبيعي في المملكة العربية السعودية.",
        "I am pleased to welcome you to the official website of the Saudi Physical Therapy Association, this scientific and professional institution that we are all proud of. Since the establishment of the association, we have been striving to develop the physical therapy profession in Saudi Arabia."
      ),
    },
    {
      text: t(
        "إن رؤية المملكة 2030 تضع الصحة في مقدمة أولوياتها، ونحن في الجمعية نعمل على المساهمة في تحقيق هذه الرؤية من خلال تأهيل كوادر وطنية متميزة في مجال العلاج الطبيعي، وتعزيز البحث العلمي، وتقديم برامج تعليم مستمر عالية الجودة.",
        "Saudi Vision 2030 places health at the forefront of its priorities, and we at the association work to contribute to achieving this vision by qualifying distinguished national cadres in physical therapy, promoting scientific research, and providing high-quality continuing education programs."
      ),
    },
    {
      text: t(
        "نؤمن بأن العلاج الطبيعي ركيزة أساسية في منظومة الرعاية الصحية، ونسعى لرفع مستوى الوعي المجتمعي بأهمية هذا التخصص ودوره في تحسين جودة الحياة. كما نحرص على تعزيز علاقاتنا الدولية والاستفادة من الخبرات العالمية.",
        "We believe that physical therapy is a fundamental pillar in the healthcare system, and we strive to raise community awareness of the importance of this specialty and its role in improving quality of life. We also ensure to strengthen our international relations and benefit from global expertise."
      ),
    },
    {
      text: t(
        "أدعوكم جميعاً للمشاركة الفعالة في أنشطة الجمعية وفعالياتها، والمساهمة في تحقيق أهدافنا المشتركة. معاً نبني مستقبلاً مشرقاً لمهنة العلاج الطبيعي في بلادنا الغالية.",
        "I invite you all to actively participate in the association's activities and events, and contribute to achieving our common goals. Together, we build a bright future for the physical therapy profession in our beloved country."
      ),
    },
  ];

  const highlights = [
    { icon: Users, number: "5000+", label: t("عضو فخور", "Proud Members") },
    { icon: Target, number: "25+", label: t("سنة من الإنجاز", "Years of Achievement") },
    { icon: Award, number: "100+", label: t("شراكة ناجحة", "Successful Partnerships") },
    { icon: Heart, number: "∞", label: t("التزام بالتميز", "Commitment to Excellence") },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("كلمة رئيس الجمعية", "President's Message")}
            </h1>
            <p className="text-xl text-white/80">
              {t("رسالة من قلب الجمعية إليكم", "A message from the heart of the association to you")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-12 items-start">
              {/* President Image */}
              <motion.div
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2"
              >
                <div className="sticky top-24">
                  <div className="relative">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                      <img
                        src={hero1}
                        alt={t("رئيس الجمعية", "Association President")}
                        className="w-full aspect-[3/4] object-cover"
                      />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -bottom-6 -end-6 bg-accent text-accent-foreground rounded-2xl p-4 shadow-lg"
                    >
                      <p className="font-bold text-lg">
                        {t("د. أحمد محمد العمري", "Dr. Ahmed M. Al-Omari")}
                      </p>
                      <p className="text-sm opacity-90">
                        {t("رئيس مجلس الإدارة", "Board Chairman")}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Message Content */}
              <div className="lg:col-span-3">
                {/* Typewriter Opening */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-8"
                >
                  <Quote className="w-12 h-12 text-accent mb-4" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground leading-relaxed min-h-[100px]">
                    {typedText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-1 h-8 bg-primary ms-1"
                    />
                  </p>
                </motion.div>

                {/* Message Paragraphs */}
                <div className="space-y-6">
                  {showContent &&
                    messageContent.map((para, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3 }}
                        className="text-lg text-muted-foreground leading-relaxed"
                      >
                        {para.text}
                      </motion.p>
                    ))}
                </div>

                {/* Signature */}
                {showContent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-12 pt-8 border-t border-border"
                  >
                    <p className="text-lg text-foreground mb-2">
                      {t("مع تحياتي وتقديري،", "With my regards and appreciation,")}
                    </p>
                    <p className="text-xl font-bold text-primary">
                      {t("د. أحمد محمد العمري", "Dr. Ahmed Mohammed Al-Omari")}
                    </p>
                    <p className="text-muted-foreground">
                      {t("رئيس مجلس إدارة الجمعية السعودية للعلاج الطبيعي", "Chairman of the SPTA Board of Directors")}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                <span className="text-4xl font-bold block mb-2">{item.number}</span>
                <span className="text-primary-foreground/80">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="container-custom text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t("انضم لعائلتنا", "Join Our Family")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t(
              "كن جزءاً من مجتمع المتخصصين في العلاج الطبيعي",
              "Be part of the physical therapy specialists community"
            )}
          </p>
          <Link to="/membership/types">
            <Button size="lg" className="gap-2">
              {t("انضم الآن", "Join Now")}
              <ArrowRight className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default PresidentMessagePage;
