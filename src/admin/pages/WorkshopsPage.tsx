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
  Download,
  Edit,
  FileSpreadsheet,
  Filter,
  GraduationCap,
  MapPin,
  Percent,
  Plus,
  Search,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

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
    setIsRegistrationOpen(true);
  };

  // Delete a workshop by ID
  const deleteWorkshop = async (id: number) => {
    try {
      await api.delete(`/admin/workshops/${id}`);

      // Remove the workshop from state
      setWorkshops(workshops.filter((w) => w.id !== id));

      toast({
        title: t("تم حذف الورشة بنجاح", "Workshop deleted successfully"),
      });
    } catch (error: any) {
      toast({
        title: t("حدث خطأ أثناء الحذف", "Error deleting workshop"),
        description: error?.response?.data?.message || error.message,
      });
    }
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
    const matchesSearch =
      workshop.titleAr.includes(searchQuery) ||
      workshop.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || workshop.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || workshop.status === filterStatus;
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
  const handleRegister = async () => {
    if (!selectedWorkshop) return;
    try {
      // For simplicity, we only increment registeredCount locally
      const updatedCount = selectedWorkshop.registeredCount + 1;
      await api.put(`/admin/workshops/${selectedWorkshop.id}`, {
        ...selectedWorkshop,
        registeredCount: updatedCount,
        status: updatedCount >= selectedWorkshop.seats ? "full" : "open",
      });

      toast({
        title: t("تم التسجيل بنجاح", "Registration Successful"),
        description: t(
          "سيتم إرسال تأكيد على بريدك الإلكتروني",
          "A confirmation will be sent to your email"
        ),
      });

      setSelectedWorkshop(null);
      setIsRegistrationOpen(false);
      setRegistrationData({ name: "", email: "", phone: "", isMember: true });
      fetchWorkshops();
    } catch (err) {
      console.error(err);
      toast({
        title: t("حدث خطأ أثناء التسجيل", "Error during registration"),
        variant: "destructive",
      });
    }
  };

  // 🟢 Create new workshop
  const handleCreateWorkshop = async (data: any) => {
    try {
      await api.post("/admin/workshops", data);
      toast({ title: t("تم إنشاء الورشة", "Workshop Created") });
      setIsCreateOpen(false);
      fetchWorkshops();
    } catch (err) {
      console.error(err);
      toast({
        title: t("حدث خطأ أثناء إنشاء الورشة", "Error creating workshop"),
        variant: "destructive",
      });
    }
  };

  // 🟢 Edit existing workshop
  const handleEditWorkshop = async (id: number, data: any) => {
    try {
      await api.put(`/admin/workshops/${id}`, data);
      toast({ title: t("تم تحديث الورشة", "Workshop Updated") });
      fetchWorkshops();
    } catch (err) {
      console.error(err);
      toast({
        title: t("حدث خطأ أثناء تحديث الورشة", "Error updating workshop"),
        variant: "destructive",
      });
    }
  };

  // 🟢 Delete workshop
  const handleDeleteWorkshop = async (id: number) => {
    if (
      !confirm(
        t(
          "هل أنت متأكد من حذف الورشة؟",
          "Are you sure you want to delete this workshop?"
        )
      )
    )
      return;
    try {
      await api.delete(`/admin/workshops/${id}`);
      toast({ title: t("تم حذف الورشة", "Workshop Deleted") });
      fetchWorkshops();
    } catch (err) {
      console.error(err);
      toast({
        title: t("حدث خطأ أثناء حذف الورشة", "Error deleting workshop"),
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy-dark via-navy to-navy-light py-20 overflow-hidden">
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
                <TabsTrigger
                  value="admin"
                  className="gap-2"
                  onClick={() => setIsAdminMode(true)}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  {t("لوحة الإدارة", "Admin Panel")}
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

            {/* Admin Tab */}
            <TabsContent value="admin" className="space-y-6">
              <Card data-aos="fade-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileSpreadsheet className="w-5 h-5 text-primary" />
                      {t("إدارة ورش العمل", "Workshop Management")}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <Upload className="w-4 h-4" />
                        {t("رفع ملف الحضور", "Upload Attendance")}
                      </Button>
                      <Button className="gap-2 bg-green-accent hover:bg-green-light">
                        <Plus className="w-4 h-4" />
                        {t("ورشة جديدة", "New Workshop")}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-start p-4 font-semibold">
                            {t("الورشة", "Workshop")}
                          </th>
                          <th className="text-start p-4 font-semibold">
                            {t("التاريخ", "Date")}
                          </th>
                          <th className="text-start p-4 font-semibold">
                            {t("المقاعد", "Seats")}
                          </th>
                          <th className="text-start p-4 font-semibold">
                            {t("الحالة", "Status")}
                          </th>
                          <th className="text-start p-4 font-semibold">
                            {t("الإجراءات", "Actions")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {workshops.map((workshop, index) => (
                          <tr
                            key={workshop.id}
                            className="border-t border-border hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-4">
                              <p className="font-medium">
                                {t(workshop.titleAr, workshop.titleEn)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {t(workshop.instructor, workshop.instructorEn)}
                              </p>
                            </td>
                            <td className="p-4 text-muted-foreground">
                              {new Date(workshop.date).toLocaleDateString(
                                isRTL ? "ar-SA" : "en-US"
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={
                                    (workshop.registeredCount /
                                      workshop.seats) *
                                    100
                                  }
                                  className="w-20 h-2"
                                />
                                <span className="text-sm">
                                  {workshop.registeredCount}/{workshop.seats}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              {getStatusBadge(workshop.status)}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-1"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => deleteWorkshop(workshop.id)}
                                  className="gap-1 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {t("التسجيل في الورشة", "Workshop Registration")}
            </DialogTitle>
            <DialogDescription>
              {selectedWorkshop &&
                t(selectedWorkshop.titleAr, selectedWorkshop.titleEn)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>{t("الاسم الكامل", "Full Name")}</Label>
              <Input
                value={registrationData.name}
                onChange={(e) =>
                  setRegistrationData({
                    ...registrationData,
                    name: e.target.value,
                  })
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
                  setRegistrationData({
                    ...registrationData,
                    email: e.target.value,
                  })
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
                  setRegistrationData({
                    ...registrationData,
                    phone: e.target.value,
                  })
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

            {/* Price Summary */}
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
            <Button
              variant="outline"
              onClick={() => setIsRegistrationOpen(false)}
            >
              {t("إلغاء", "Cancel")}
            </Button>
            <Button
              onClick={handleRegister}
              className="bg-green-accent hover:bg-green-light gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {t("تأكيد التسجيل", "Confirm Registration")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WorkshopsPage;
