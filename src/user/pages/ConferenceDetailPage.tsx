import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import AOS from "aos";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Handshake,
  HelpCircle,
  Image as ImageIcon,
  Loader2,
  MapPin,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import sptaAward1 from "@/assets/spta-award-1.jpg";
import sptaCeremony1 from "@/assets/spta-ceremony-1.jpg";
import sptaConference1 from "@/assets/spta-conference-1.jpg";
import sptaConference2 from "@/assets/spta-conference-2.jpg";
import sptaEvent1 from "@/assets/spta-event-1.jpg";
import sptaExhibition1 from "@/assets/spta-exhibition-1.jpg";
import sptaSpeaker1 from "@/assets/spta-speaker-1.jpeg";
import sptaSponsors1 from "@/assets/spta-sponsors-1.jpg";

// Mock conference data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conferencesData: Record<string, any> = {
  "conf-5": {
    titleAr: "المؤتمر السعودي الدولي الخامس للعلاج الطبيعي",
    titleEn: "5th Saudi International Physical Therapy Conference",
    descAr:
      "المؤتمر الأكبر والأهم في مجال العلاج الطبيعي على مستوى المملكة العربية السعودية. يجمع خبراء ومتخصصين من جميع أنحاء العالم لمناقشة أحدث الأبحاث والممارسات في العلاج الطبيعي.",
    descEn:
      "The largest and most important physical therapy conference in Saudi Arabia. Bringing together experts and specialists from around the world to discuss the latest research and practices in physical therapy.",
    date: "2026-09-15",
    endDate: "2026-09-17",
    locationAr: "مركز الملك عبدالله المالي، الرياض",
    locationEn: "King Abdullah Financial District, Riyadh",
    banner: sptaConference1,
    status: "upcoming",
    price: 500,
    earlyBird: 350,
    gallery: [
      sptaConference1,
      sptaConference2,
      sptaEvent1,
      sptaCeremony1,
      sptaExhibition1,
      sptaAward1,
    ],
    schedule: [
      {
        dayAr: "اليوم الأول - 15 سبتمبر",
        dayEn: "Day 1 - September 15",
        sessions: [
          {
            timeAr: "٨:٠٠ - ٩:٠٠",
            timeEn: "8:00 - 9:00",
            titleAr: "التسجيل والاستقبال",
            titleEn: "Registration & Welcome",
          },
          {
            timeAr: "٩:٠٠ - ١٠:٣٠",
            timeEn: "9:00 - 10:30",
            titleAr: "الجلسة الافتتاحية",
            titleEn: "Opening Ceremony",
            speakerAr: "د. عبدالفتاح القحطاني",
            speakerEn: "Dr. Abdulfattah Al-Qahtani",
          },
          {
            timeAr: "١١:٠٠ - ١٢:٣٠",
            timeEn: "11:00 - 12:30",
            titleAr: "ورشة: تقنيات العلاج الطبيعي الحديثة",
            titleEn: "Workshop: Modern PT Techniques",
            speakerAr: "د. فيصل الحذيفي",
            speakerEn: "Dr. Faisal Al-Hudhaifi",
          },
          {
            timeAr: "٢:٠٠ - ٣:٣٠",
            timeEn: "2:00 - 3:30",
            titleAr: "جلسة بحثية: العلاج الطبيعي العصبي",
            titleEn: "Research Session: Neurological PT",
            speakerAr: "د. مشعل الديحان",
            speakerEn: "Dr. Mishal Al-Daihan",
          },
        ],
      },
      {
        dayAr: "اليوم الثاني - 16 سبتمبر",
        dayEn: "Day 2 - September 16",
        sessions: [
          {
            timeAr: "٩:٠٠ - ١٠:٣٠",
            timeEn: "9:00 - 10:30",
            titleAr: "جلسة: صحة المرأة والعلاج الطبيعي",
            titleEn: "Session: Women's Health & PT",
            speakerAr: "د. غادة القديري",
            speakerEn: "Dr. Ghada Al-Qudairi",
          },
          {
            timeAr: "١١:٠٠ - ١٢:٣٠",
            timeEn: "11:00 - 12:30",
            titleAr: "ورشة: علاج الأطفال",
            titleEn: "Workshop: Pediatric PT",
            speakerAr: "د. مشاري الغدير",
            speakerEn: "Dr. Mishari Al-Ghadir",
          },
          {
            timeAr: "٢:٠٠ - ٣:٣٠",
            timeEn: "2:00 - 3:30",
            titleAr: "جلسة: الطب الرياضي",
            titleEn: "Session: Sports Medicine",
            speakerAr: "د. مساعد الزهراني",
            speakerEn: "Dr. Musaed Al-Zahrani",
          },
        ],
      },
      {
        dayAr: "اليوم الثالث - 17 سبتمبر",
        dayEn: "Day 3 - September 17",
        sessions: [
          {
            timeAr: "٩:٠٠ - ١٠:٣٠",
            timeEn: "9:00 - 10:30",
            titleAr: "جلسة: علم الألم",
            titleEn: "Session: Pain Science",
            speakerAr: "د. فارس العضيبي",
            speakerEn: "Dr. Fares Al-Adhibi",
          },
          {
            timeAr: "١١:٠٠ - ١٢:٠٠",
            timeEn: "11:00 - 12:00",
            titleAr: "الجلسة الختامية وتوزيع الشهادات",
            titleEn: "Closing Ceremony & Certificates",
          },
        ],
      },
    ],
    committees: [
      {
        nameAr: "د. عبدالفتاح القحطاني",
        nameEn: "Dr. Abdulfattah Al-Qahtani",
        roleAr: "رئيس اللجنة العلمية",
        roleEn: "Scientific Committee Chair",
        image: sptaSpeaker1,
      },
      {
        nameAr: "أ. محمد منشي",
        nameEn: "Mr. Mohammed Menshi",
        roleAr: "رئيس اللجنة التنظيمية",
        roleEn: "Organizing Committee Chair",
        image: sptaSpeaker1,
      },
      {
        nameAr: "د. رشا الغفيلي",
        nameEn: "Dr. Rasha Al-Ghufaili",
        roleAr: "عضو اللجنة العلمية",
        roleEn: "Scientific Committee Member",
        image: sptaSpeaker1,
      },
      {
        nameAr: "د. آلاء البيشي",
        nameEn: "Dr. Alaa Al-Bishi",
        roleAr: "عضو اللجنة التنظيمية",
        roleEn: "Organizing Committee Member",
        image: sptaSpeaker1,
      },
    ],
    sponsors: [
      {
        nameAr: "جامعة الملك سعود",
        nameEn: "King Saud University",
        image: sptaSponsors1,
      },
      {
        nameAr: "المجلس الصحي السعودي",
        nameEn: "Saudi Health Council",
        image: sptaSponsors1,
      },
      {
        nameAr: "World Physiotherapy",
        nameEn: "World Physiotherapy",
        image: sptaSponsors1,
      },
    ],
    faqAr: [
      {
        q: "ما هي تكلفة التسجيل؟",
        a: "رسوم التسجيل 500 ريال، والتسجيل المبكر 350 ريال",
      },
      {
        q: "هل يمكنني الحصول على شهادة حضور؟",
        a: "نعم، سيتم إصدار شهادة حضور معتمدة لجميع المشاركين",
      },
      {
        q: "هل يوجد خصم لأعضاء الجمعية؟",
        a: "نعم، يحصل أعضاء الجمعية على خصم خاص",
      },
    ],
    faqEn: [
      {
        q: "What is the registration fee?",
        a: "Registration fee is 500 SAR, early bird is 350 SAR",
      },
      {
        q: "Will I receive an attendance certificate?",
        a: "Yes, accredited certificates will be issued to all participants",
      },
      {
        q: "Is there a discount for SPTA members?",
        a: "Yes, SPTA members get a special discount",
      },
    ],
  },
  "conf-lymph-2": {
    titleAr: "المؤتمر الثاني للوذمة اللمفاوية",
    titleEn: "2nd Lymphedema Conference",
    descAr:
      "مؤتمر متخصص يجمع أبرز الخبراء في مجال الوذمة اللمفاوية لمناقشة أحدث الأبحاث والتقنيات العلاجية.",
    descEn:
      "A specialized conference bringing together leading experts in lymphedema to discuss the latest research and therapeutic techniques.",
    date: "2026-11-20",
    endDate: "2026-11-21",
    locationAr: "فندق حياة، جدة",
    locationEn: "Hyatt Hotel, Jeddah",
    banner: sptaConference2,
    status: "upcoming",
    price: 400,
    earlyBird: 300,
    gallery: [sptaConference2, sptaEvent1, sptaCeremony1],
    schedule: [
      {
        dayAr: "اليوم الأول",
        dayEn: "Day 1",
        sessions: [
          {
            timeAr: "٩:٠٠ - ١٠:٠٠",
            timeEn: "9:00 - 10:00",
            titleAr: "الافتتاح",
            titleEn: "Opening",
          },
          {
            timeAr: "١٠:٠٠ - ١٢:٠٠",
            timeEn: "10:00 - 12:00",
            titleAr: "أبحاث الوذمة اللمفاوية",
            titleEn: "Lymphedema Research",
            speakerAr: "د. أسماء الدرع",
            speakerEn: "Dr. Asma Al-Dera",
          },
        ],
      },
    ],
    committees: [
      {
        nameAr: "د. أسماء الدرع",
        nameEn: "Dr. Asma Al-Dera",
        roleAr: "رئيسة المؤتمر",
        roleEn: "Conference Chair",
        image: sptaSpeaker1,
      },
    ],
    sponsors: [
      {
        nameAr: "جامعة الملك سعود",
        nameEn: "King Saud University",
        image: sptaSponsors1,
      },
    ],
    faqAr: [
      {
        q: "هل المؤتمر مخصص للمتخصصين فقط؟",
        a: "المؤتمر مفتوح لجميع المهتمين",
      },
    ],
    faqEn: [
      {
        q: "Is the conference for specialists only?",
        a: "The conference is open to all interested",
      },
    ],
  },
};

// Fallback for unknown conferences
const defaultConf = conferencesData["conf-5"];

const ConferenceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const conf = conferencesData[id || ""] || defaultConf;

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleRegister = () => {
    if (!regForm.name || !regForm.email || !regForm.phone) {
      toast({
        title: t("يرجى ملء جميع الحقول", "Please fill all fields"),
        variant: "destructive",
      });
      return;
    }
    setIsRegOpen(false);
    setIsPayOpen(true);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast({
        title: t("اختر طريقة الدفع", "Select payment method"),
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={conf.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-3 bg-accent text-accent-foreground">
                {conf.status === "upcoming"
                  ? t("قادم", "Upcoming")
                  : t("منتهي", "Past")}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                {t(conf.titleAr, conf.titleEn)}
              </h1>
              <div className="flex flex-wrap gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(conf.date).toLocaleDateString(
                    isRTL ? "ar-SA" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                  {conf.endDate &&
                    ` — ${new Date(conf.endDate).toLocaleDateString(isRTL ? "ar-SA" : "en-US", { month: "long", day: "numeric" })}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {t(conf.locationAr, conf.locationEn)}
                </span>
              </div>
              {conf.status === "upcoming" && (
                <Button
                  onClick={() => setIsRegOpen(true)}
                  size="lg"
                  className="mt-5 gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {t("سجل الآن", "Register Now")}
                  <Arrow className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="flex flex-wrap gap-1">
            <TabsTrigger value="about" className="gap-1.5">
              <FileText className="w-4 h-4" />
              {t("عن المؤتمر", "About")}
            </TabsTrigger>
            <TabsTrigger value="program" className="gap-1.5">
              <Clock className="w-4 h-4" />
              {t("البرنامج", "Program")}
            </TabsTrigger>
            <TabsTrigger value="committees" className="gap-1.5">
              <Users className="w-4 h-4" />
              {t("اللجان", "Committees")}
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-1.5">
              <ImageIcon className="w-4 h-4" />
              {t("المعرض", "Gallery")}
            </TabsTrigger>
            <TabsTrigger value="sponsors" className="gap-1.5">
              <Handshake className="w-4 h-4" />
              {t("الرعاة", "Sponsors")}
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-1.5">
              <HelpCircle className="w-4 h-4" />
              {t("أسئلة", "FAQ")}
            </TabsTrigger>
          </TabsList>

          {/* About */}
          <TabsContent value="about">
            <Card data-aos="fade-up">
              <CardContent className="p-6 md:p-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t(conf.descAr, conf.descEn)}
                </p>
                {conf.status === "upcoming" && (
                  <div className="mt-6 grid sm:grid-cols-2 gap-4">
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          {t("التسجيل المبكر", "Early Bird")}
                        </p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {conf.earlyBird} {t("ريال", "SAR")}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-accent/20 bg-accent/5">
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          {t("السعر العادي", "Regular Price")}
                        </p>
                        <p className="text-2xl font-bold text-accent mt-1">
                          {conf.price} {t("ريال", "SAR")}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Program */}
          <TabsContent value="program" className="space-y-6">
            {conf.schedule?.map((day: any, di: number) => (
              <Card key={di} data-aos="fade-up" data-aos-delay={di * 100}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    {t(day.dayAr, day.dayEn)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {day.sessions.map((s: any, si: number) => (
                    <div
                      key={si}
                      className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors border-s-4 border-primary/30"
                    >
                      <div className="text-sm font-mono text-primary whitespace-nowrap min-w-[100px]">
                        {t(s.timeAr, s.timeEn)}
                      </div>
                      <div>
                        <p className="font-medium">{t(s.titleAr, s.titleEn)}</p>
                        {s.speakerAr && (
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {t(s.speakerAr, s.speakerEn)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Committees */}
          <TabsContent value="committees">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {conf.committees?.map((m: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
                        {t(m.nameAr, m.nameEn).charAt(0)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-sm">
                        {t(m.nameAr, m.nameEn)}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(m.roleAr, m.roleEn)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery */}
          <TabsContent value="gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {conf.gallery?.map((img: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="cursor-pointer group"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="rounded-xl overflow-hidden aspect-video">
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Sponsors */}
          <TabsContent value="sponsors">
            <div className="grid sm:grid-cols-3 gap-6">
              {conf.sponsors?.map((s: any, i: number) => (
                <Card
                  key={i}
                  data-aos="zoom-in"
                  data-aos-delay={i * 100}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-3">
                      <Handshake className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold">{t(s.nameAr, s.nameEn)}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq" className="space-y-4">
            {(isRTL ? conf.faqAr : conf.faqEn)?.map((f: any, i: number) => (
              <Card key={i} data-aos="fade-up" data-aos-delay={i * 50}>
                <CardContent className="p-5">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    {f.q}
                  </h4>
                  <p className="text-sm text-muted-foreground ps-6">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isRegOpen} onOpenChange={setIsRegOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("التسجيل في المؤتمر", "Conference Registration")}
            </DialogTitle>
            <DialogDescription>
              {t("أدخل بياناتك للتسجيل", "Enter your details to register")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t("الاسم الكامل", "Full Name")}</Label>
              <Input
                value={regForm.name}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder={t("أدخل اسمك", "Enter your name")}
              />
            </div>
            <div>
              <Label>{t("البريد الإلكتروني", "Email")}</Label>
              <Input
                type="email"
                value={regForm.email}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label>{t("رقم الهاتف", "Phone")}</Label>
              <Input
                type="tel"
                value={regForm.phone}
                onChange={(e) =>
                  setRegForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+966"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleRegister} className="w-full gap-2">
              {t("متابعة الدفع", "Continue to Payment")}
              <Arrow className="w-4 h-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog
        open={isPayOpen}
        onOpenChange={(v) => {
          if (!isSubmitting) setIsPayOpen(v);
        }}
      >
        <DialogContent className="sm:max-w-md">
          {paymentSuccess ? (
            <div className="text-center py-8 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-accent" />
              </motion.div>
              <h3 className="text-xl font-bold">
                {t("تم التسجيل بنجاح!", "Registration Successful!")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(
                  "ستصلك رسالة تأكيد على بريدك الإلكتروني",
                  "A confirmation email will be sent to you",
                )}
              </p>
              <Button
                onClick={() => {
                  setIsPayOpen(false);
                  setPaymentSuccess(false);
                }}
                className="mt-4"
              >
                {t("إغلاق", "Close")}
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>
                  {t("اختر طريقة الدفع", "Select Payment Method")}
                </DialogTitle>
                <DialogDescription>
                  {t("المبلغ المطلوب", "Amount due")}: {conf.earlyBird}{" "}
                  {t("ريال", "SAR")}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
                  { id: "google_pay", label: "Google Pay", icon: "🔵" },
                  { id: "mada", label: "مدى / Mada", icon: "💳" },
                  { id: "moyasar", label: "Moyasar", icon: "💰" },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center hover:shadow-md ${paymentMethod === pm.id ? "border-primary bg-primary/5 shadow-md" : "border-border"}`}
                  >
                    <div className="text-2xl mb-1">{pm.icon}</div>
                    <p className="text-xs font-medium">{pm.label}</p>
                  </button>
                ))}
              </div>
              <DialogFooter>
                <Button
                  onClick={handlePayment}
                  disabled={isSubmitting || !paymentMethod}
                  className="w-full gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CreditCard className="w-4 h-4" />
                  )}
                  {isSubmitting
                    ? t("جاري المعالجة...", "Processing...")
                    : t("ادفع الآن", "Pay Now")}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Lightbox */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="sm:max-w-3xl p-0 overflow-hidden">
          {selectedImage && (
            <img src={selectedImage} alt="" className="w-full h-auto" />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default ConferenceDetailPage;
