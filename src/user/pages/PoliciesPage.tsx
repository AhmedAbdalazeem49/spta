import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ChevronDown, Search, List, ScrollText } from "lucide-react";
import { useState, useEffect } from "react";

const PoliciesPage = () => {
  const { t, isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSidebarItem, setActiveSidebarItem] = useState("intro");

  const sections = [
    {
      id: "intro",
      title: t("مقدمة", "Introduction"),
      content: t(
        "تعتبر هذه اللائحة الإطار التنظيمي للجمعية السعودية للعلاج الطبيعي، وتهدف إلى تحديد الأهداف والمهام والصلاحيات وآليات العمل داخل الجمعية. تم إعداد هذه اللائحة وفقاً للأنظمة واللوائح المعمول بها في المملكة العربية السعودية.",
        "This regulation is the organizational framework for the Saudi Physical Therapy Association, aiming to define objectives, tasks, authorities, and work mechanisms within the association. This regulation was prepared in accordance with the systems and regulations in force in Saudi Arabia."
      ),
    },
    {
      id: "objectives",
      title: t("أهداف الجمعية", "Association Objectives"),
      content: t(
        "1. تطوير مهنة العلاج الطبيعي في المملكة العربية السعودية\n2. رفع مستوى الممارسة المهنية للعلاج الطبيعي\n3. تشجيع البحث العلمي في مجال العلاج الطبيعي\n4. توفير فرص التعليم المستمر للممارسين\n5. تمثيل المهنة محلياً ودولياً\n6. المساهمة في وضع المعايير والسياسات المهنية\n7. التوعية المجتمعية بأهمية العلاج الطبيعي",
        "1. Develop the physical therapy profession in Saudi Arabia\n2. Raise the level of professional practice in physical therapy\n3. Encourage scientific research in physical therapy\n4. Provide continuing education opportunities for practitioners\n5. Represent the profession locally and internationally\n6. Contribute to developing professional standards and policies\n7. Community awareness about the importance of physical therapy"
      ),
    },
    {
      id: "membership",
      title: t("العضوية", "Membership"),
      content: t(
        "تنقسم العضوية في الجمعية إلى:\n\n- العضوية العاملة: للممارسين المرخصين\n- العضوية الشرفية: للشخصيات المميزة\n- عضوية الانتساب: للطلاب والمهتمين\n\nيجب على جميع الأعضاء الالتزام بأخلاقيات المهنة ولوائح الجمعية.",
        "Membership in the association is divided into:\n\n- Active Membership: For licensed practitioners\n- Honorary Membership: For distinguished individuals\n- affiliate Membership: For students and interested parties\n\nAll members must adhere to professional ethics and association regulations."
      ),
    },
    {
      id: "board",
      title: t("مجلس الإدارة", "Board of Directors"),
      content: t(
        "يتكون مجلس الإدارة من:\n\n- الرئيس\n- نائب الرئيس\n- الأمين العام\n- أمين الصندوق\n- أعضاء المجلس\n\nمدة الدورة أربع سنوات قابلة للتجديد. يجتمع المجلس بشكل دوري لمناقشة شؤون الجمعية واتخاذ القرارات اللازمة.",
        "The Board of Directors consists of:\n\n- President\n- Vice President\n- Secretary General\n- Treasurer\n- Board Members\n\nTerm duration is four years, renewable. The board meets regularly to discuss association affairs and make necessary decisions."
      ),
    },
    {
      id: "committees",
      title: t("اللجان", "Committees"),
      content: t(
        "تضم الجمعية عدة لجان متخصصة:\n\n1. لجنة التعليم والتدريب\n2. لجنة البحث العلمي\n3. لجنة العلاقات العامة\n4. لجنة العضوية\n5. لجنة المالية\n6. لجنة الفروع\n7. لجنة المجلة العلمية\n\nتعمل هذه اللجان تحت إشراف مجلس الإدارة.",
        "The association includes several specialized committees:\n\n1. Education and Training Committee\n2. Scientific Research Committee\n3. Public Relations Committee\n4. Membership Committee\n5. Finance Committee\n6. Branches Committee\n7. Scientific Journal Committee\n\nThese committees work under the supervision of the Board of Directors."
      ),
    },
    {
      id: "finance",
      title: t("الموارد المالية", "Financial Resources"),
      content: t(
        "تتكون الموارد المالية للجمعية من:\n\n1. رسوم العضوية السنوية\n2. التبرعات والهبات\n3. عوائد الفعاليات والمؤتمرات\n4. الدعم الحكومي\n5. الشراكات والرعايات\n6. أي موارد أخرى مشروعة\n\nتخضع جميع الأموال للرقابة المالية وفقاً للأنظمة المعمول بها.",
        "The financial resources of the association consist of:\n\n1. Annual membership fees\n2. Donations and grants\n3. Events and conference revenues\n4. Government support\n5. Partnerships and sponsorships\n6. Any other legitimate resources\n\nAll funds are subject to financial oversight in accordance with applicable regulations."
      ),
    },
    {
      id: "ethics",
      title: t("أخلاقيات المهنة", "Professional Ethics"),
      content: t(
        "يلتزم جميع الأعضاء بـ:\n\n1. احترام كرامة المريض وخصوصيته\n2. تقديم أفضل رعاية ممكنة\n3. التطوير المهني المستمر\n4. الصدق والأمانة في الممارسة\n5. التعاون مع الزملاء\n6. الالتزام بالمعايير المهنية\n7. عدم استغلال المرضى\n8. الإبلاغ عن المخالفات",
        "All members are committed to:\n\n1. Respecting patient dignity and privacy\n2. Providing the best possible care\n3. Continuous professional development\n4. Honesty and integrity in practice\n5. Cooperation with colleagues\n6. Adherence to professional standards\n7. Not exploiting patients\n8. Reporting violations"
      ),
    },
    {
      id: "violations",
      title: t("المخالفات والعقوبات", "Violations and Penalties"),
      content: t(
        "في حالة مخالفة اللوائح، قد تتخذ الجمعية الإجراءات التالية:\n\n1. التنبيه الشفهي\n2. الإنذار الكتابي\n3. الإيقاف المؤقت\n4. إلغاء العضوية\n5. الإحالة للجهات المختصة\n\nيحق للعضو الاعتراض على القرارات وفقاً للإجراءات المحددة.",
        "In case of regulation violations, the association may take the following actions:\n\n1. Verbal warning\n2. Written warning\n3. Temporary suspension\n4. Membership cancellation\n5. Referral to competent authorities\n\nMembers have the right to appeal decisions according to specified procedures."
      ),
    },
    {
      id: "amendments",
      title: t("تعديل اللائحة", "Regulation Amendments"),
      content: t(
        "يمكن تعديل هذه اللائحة بقرار من الجمعية العمومية بأغلبية ثلثي الأصوات. يجب أن تتوافق أي تعديلات مع الأنظمة واللوائح المعمول بها في المملكة العربية السعودية.",
        "This regulation can be amended by a decision from the General Assembly with a two-thirds majority vote. Any amendments must comply with the systems and regulations in force in Saudi Arabia."
      ),
    },
  ];

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll("[data-section-id]");
      sectionElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 200) {
          setActiveSidebarItem(el.getAttribute("data-section-id") || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-primary/90 to-primary-dark overflow-hidden">
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
            <ScrollText className="w-16 h-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("اللائحة والسياسات", "Regulations & Policies")}
            </h1>
            <p className="text-xl text-white/80">
              {t(
                "الإطار التنظيمي للجمعية السعودية للعلاج الطبيعي",
                "The regulatory framework for the Saudi Physical Therapy Association"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border border-border/50 p-4">
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={t("بحث...", "Search...")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full ps-10 pe-4 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSidebarItem(section.id);
                        document.querySelector(`[data-section-id="${section.id}"]`)?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }}
                      className={`w-full text-start px-4 py-2 rounded-lg text-sm transition-all ${
                        activeSidebarItem === section.id
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <div className="space-y-6">
                {filteredSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    data-section-id={section.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    className="bg-card rounded-2xl border border-border/50 overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeSection === section.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-border">
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                              {section.content}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {filteredSections.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <List className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t("لا توجد نتائج", "No Results Found")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("جرب البحث بكلمات أخرى", "Try searching with different words")}
                  </p>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PoliciesPage;
