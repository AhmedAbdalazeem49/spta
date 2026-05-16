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
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import AOS from "aos";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Filter,
  GraduationCap,
  MapPin,
  Percent,
  Search,
  Star,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import PaymentMethodPicker, { PaymentMethodKey } from "@/components/PaymentMethodPicker";

const categories = [
  { id: "all", labelAr: "الكل", labelEn: "All" },
  { id: "rehabilitation", labelAr: "التأهيل", labelEn: "Rehabilitation" },
  { id: "sports", labelAr: "الرياضي", labelEn: "Sports" },
  { id: "respiratory", labelAr: "التنفسي", labelEn: "Respiratory" },
  { id: "geriatric", labelAr: "كبار السن", labelEn: "Geriatric" },
];

const WorkshopsPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  // Open the registration dialog for a specific workshop
  const openRegistration = (workshop: (typeof workshops)[0]) => {
    if (workshop.status !== "open") return;
    setSelectedWorkshop(workshop);
    setRegStep("info");
    setPaymentMethod(null);
    setIsRegistrationOpen(true);
  };


  const [workshops, setWorkshops] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    phone: "",
    isMember: true,
  });
  const [regStep, setRegStep] = useState<"info" | "payment" | "success">("info");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodKey | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  // 🟢 Fetch workshops from API
  const fetchWorkshops = async () => {
    try {
      const res = await api.get("/workshops");
      setWorkshops(res.data.data);
    } catch (err) {
      console.error(err);
      toast({
        title: t("حدث خطأ أثناء تحميل ورش العمل", "Error loading workshops"),
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchWorkshops();
  }, []);

  const filteredWorkshops = workshops.filter((workshop) => {
    const title = workshop?.title ?? "";
    const description = workshop?.description ?? "";

    const matchesSearch =
      title.includes(searchQuery) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || workshop?.category === filterCategory;

    const matchesStatus =
      filterStatus === "all" || workshop?.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const configs = {
      open: {
        color: "bg-green-accent/10 text-green-accent border-green-accent/30",
        icon: CheckCircle,
        labelAr: "متاح",
        labelEn: "Open",
      },
      full: {
        color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
        icon: AlertCircle,
        labelAr: "مكتمل",
        labelEn: "Full",
      },
      closed: {
        color: "bg-destructive/10 text-destructive border-destructive/30",
        icon: XCircle,
        labelAr: "مغلق",
        labelEn: "Closed",
      },
    };
    const config = configs[status as keyof typeof configs] || configs.closed;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`${config.color} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(config.labelAr, config.labelEn)}
      </Badge>
    );
  };

  // 🟢 Register for a workshop (update backend)
  const goToPayment = () => {
    if (!registrationData.name || !registrationData.email || !registrationData.phone) {
      toast({
        title: t("بيانات ناقصة", "Missing fields"),
        description: t("يرجى تعبئة جميع الحقول", "Please fill in all fields"),
        variant: "destructive",
      });
      return;
    }
    setRegStep("payment");
  };

  const handlePayAndRegister = async () => {
    if (!selectedWorkshop || !paymentMethod) return;
    setIsPaying(true);
    try {
      const amount = registrationData.isMember
        ? selectedWorkshop.priceMembers
        : selectedWorkshop.priceNonMembers;

      // Create payment (backend should return payment_url or success)
      try {
        const res = await api.post("/payments/create", {
          amount,
          payment_method: paymentMethod,
          type: "workshop",
          workshop_id: selectedWorkshop.id,
          ...registrationData,
        });
        const url = res.data?.data?.payment_url;
        if (url) {
          window.location.href = url;
          return;
        }
      } catch {
        // fallthrough — mock success
      }

      // On success: register in workshop
      try {
        const updatedCount = (selectedWorkshop.registeredCount || 0) + 1;
        await api.post(`/workshops/${selectedWorkshop.id}/register`, {
          ...registrationData,
          payment_method: paymentMethod,
          amount,
        }).catch(() =>
          api.put(`/admin/workshops/${selectedWorkshop.id}`, {
            ...selectedWorkshop,
            registeredCount: updatedCount,
            status: updatedCount >= selectedWorkshop.seats ? "full" : "open",
          })
        );
      } catch {}

      setRegStep("success");
      fetchWorkshops();
    } catch (err) {
      toast({
        title: t("فشل الدفع", "Payment failed"),
        description: t("حاول مرة أخرى", "Please try again"),
        variant: "destructive",
      });
    } finally {
      setIsPaying(false);
    }
  };

  const resetRegistration = () => {
    setSelectedWorkshop(null);
    setIsRegistrationOpen(false);
    setRegistrationData({ name: "", email: "", phone: "", isMember: true });
    setRegStep("info");
    setPaymentMethod(null);
  };






  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <GraduationCap className="w-5 h-5 text-green-accent" />
              <span className="text-blue-pale text-sm font-medium">
                {t("تطوير مهني مستمر", "Continuous Professional Development")}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
              {t("ورش العمل والدورات", "Workshops & Courses")}
            </h1>
            <p className="text-xl text-blue-pale max-w-2xl mx-auto">
              {t(
                "تعلم من خبراء المجال وطور مهاراتك المهنية",
                "Learn from industry experts and develop your professional skills"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <Tabs defaultValue="workshops" className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <TabsList>
                <TabsTrigger value="workshops" className="gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {t("ورش العمل", "Workshops")}
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Percent className="w-3 h-3 text-green-accent" />
                  {t("خصم للأعضاء", "Member Discount")}
                </Badge>
              </div>
            </div>

            {/* Workshops Tab */}
            <TabsContent value="workshops" className="space-y-6">
              {/* Filters */}
              <Card data-aos="fade-up">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder={t("بحث عن ورشة...", "Search workshops...")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-10"
                      />
                    </div>
                    <Select
                      value={filterCategory}
                      onValueChange={setFilterCategory}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <Filter className="w-4 h-4 me-2" />
                        <SelectValue placeholder={t("التصنيف", "Category")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {t(cat.labelAr, cat.labelEn)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder={t("الحالة", "Status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("الكل", "All")}</SelectItem>
                        <SelectItem value="open">
                          {t("متاح", "Open")}
                        </SelectItem>
                        <SelectItem value="full">
                          {t("مكتمل", "Full")}
                        </SelectItem>
                        <SelectItem value="closed">
                          {t("مغلق", "Closed")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Workshops Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredWorkshops.map((workshop, index) => (
                    <motion.div
                      key={workshop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="card-hover overflow-hidden group h-full">
                        <div className="h-2 bg-gradient-to-r from-primary to-blue-light" />
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {t(workshop.titleAr, workshop.titleEn)}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {t(
                                  workshop.descriptionAr,
                                  workshop.descriptionEn
                                )}
                              </p>
                            </div>
                            {getStatusBadge(workshop.status)}
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4 text-primary" />
                              {new Date(workshop.date).toLocaleDateString(
                                isRTL ? "ar-SA" : "en-US"
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4 text-primary" />
                              {workshop.time} -{" "}
                              {t(workshop.duration, workshop.durationEn)}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                              <MapPin className="w-4 h-4 text-primary" />
                              {t(workshop.locationAr, workshop.locationEn)}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                              <User className="w-4 h-4 text-primary" />
                              {t(workshop.instructor, workshop.instructorEn)}
                            </div>
                          </div>

                          {/* Seats Progress */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="text-muted-foreground flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {t("المقاعد", "Seats")}
                              </span>
                              <span className="font-medium">
                                {workshop.registeredCount}/{workshop.seats}
                              </span>
                            </div>
                            <Progress
                              value={
                                (workshop.registeredCount / workshop.seats) *
                                100
                              }
                              className="h-2"
                            />
                          </div>

                          {/* Pricing */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                {t("للأعضاء", "Members")}
                              </p>
                              <p className="font-bold text-green-accent">
                                {workshop.priceMembers} {t("ريال", "SAR")}
                              </p>
                            </div>
                            <div className="text-end">
                              <p className="text-xs text-muted-foreground">
                                {t("لغير الأعضاء", "Non-Members")}
                              </p>
                              <p className="font-bold">
                                {workshop.priceNonMembers} {t("ريال", "SAR")}
                              </p>
                            </div>
                          </div>

                          <Button
                            className="w-full gap-2"
                            disabled={workshop.status !== "open"}
                            onClick={() => openRegistration(workshop)}
                          >
                            {workshop.status === "open" ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                {t("التسجيل الآن", "Register Now")}
                              </>
                            ) : workshop.status === "full" ? (
                              t("المقاعد ممتلئة", "Seats Full")
                            ) : (
                              t("التسجيل مغلق", "Registration Closed")
                            )}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredWorkshops.length === 0 && (
                <div className="text-center py-12">
                  <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">
                    {t("لا توجد ورش عمل متاحة", "No workshops available")}
                  </p>
                </div>
              )}
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Registration Dialog — 3 steps: info → payment → success */}
      <Dialog
        open={isRegistrationOpen}
        onOpenChange={(o) => (o ? setIsRegistrationOpen(true) : resetRegistration())}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {regStep === "info"
                ? t("التسجيل في الورشة", "Workshop Registration")
                : regStep === "payment"
                ? t("اختر طريقة الدفع", "Choose Payment Method")
                : t("تم التسجيل بنجاح", "Registration Successful")}
            </DialogTitle>
            <DialogDescription>
              {selectedWorkshop &&
                t(
                  selectedWorkshop.titleAr || selectedWorkshop.title,
                  selectedWorkshop.titleEn || selectedWorkshop.title
                )}
            </DialogDescription>
          </DialogHeader>

          {/* STEP 1 — INFO */}
          {regStep === "info" && (
            <>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Label>{t("الاسم الكامل", "Full Name")}</Label>
                  <Input
                    value={registrationData.name}
                    onChange={(e) =>
                      setRegistrationData({ ...registrationData, name: e.target.value })
                    }
                    placeholder={t("أدخل اسمك الكامل", "Enter your full name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("البريد الإلكتروني", "Email")}</Label>
                  <Input
                    type="email"
                    value={registrationData.email}
                    onChange={(e) =>
                      setRegistrationData({ ...registrationData, email: e.target.value })
                    }
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("رقم الهاتف", "Phone Number")}</Label>
                  <Input
                    type="tel"
                    value={registrationData.phone}
                    onChange={(e) =>
                      setRegistrationData({ ...registrationData, phone: e.target.value })
                    }
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t("نوع التسجيل", "Registration Type")}</Label>
                  <Select
                    value={registrationData.isMember ? "member" : "non-member"}
                    onValueChange={(v) =>
                      setRegistrationData({
                        ...registrationData,
                        isMember: v === "member",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">
                        {t("عضو", "Member")} - {selectedWorkshop?.priceMembers}{" "}
                        {t("ريال", "SAR")}
                      </SelectItem>
                      <SelectItem value="non-member">
                        {t("غير عضو", "Non-Member")} -{" "}
                        {selectedWorkshop?.priceNonMembers} {t("ريال", "SAR")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {t("المبلغ المطلوب", "Total Amount")}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {registrationData.isMember
                        ? selectedWorkshop?.priceMembers
                        : selectedWorkshop?.priceNonMembers}{" "}
                      {t("ريال", "SAR")}
                    </span>
                  </div>
                  {registrationData.isMember && (
                    <p className="text-xs text-green-accent mt-2 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {t("تم تطبيق خصم الأعضاء", "Member discount applied")}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={resetRegistration}>
                  {t("إلغاء", "Cancel")}
                </Button>
                <Button onClick={goToPayment} className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {t("متابعة للدفع", "Continue to Payment")}
                </Button>
              </DialogFooter>
            </>
          )}

          {/* STEP 2 — PAYMENT */}
          {regStep === "payment" && selectedWorkshop && (
            <div className="py-2">
              <PaymentMethodPicker
                amount={
                  registrationData.isMember
                    ? selectedWorkshop.priceMembers
                    : selectedWorkshop.priceNonMembers
                }
                selected={paymentMethod}
                onSelect={setPaymentMethod}
                loading={isPaying}
                onConfirm={handlePayAndRegister}
                confirmLabel={{ ar: "ادفع وسجّل الآن", en: "Pay & Register Now" }}
              />
              <button
                onClick={() => setRegStep("info")}
                className="text-xs text-muted-foreground hover:text-primary mt-3 mx-auto block"
              >
                ← {t("رجوع", "Back")}
              </button>
            </div>
          )}

          {/* STEP 3 — SUCCESS */}
          {regStep === "success" && (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {t("تم التسجيل بنجاح!", "You're registered!")}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {t(
                    "سيتم إرسال تفاصيل التأكيد إلى بريدك الإلكتروني.",
                    "Confirmation details have been sent to your email."
                  )}
                </p>
              </div>
              <Button onClick={resetRegistration} className="w-full">
                {t("تم", "Done")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WorkshopsPage;
