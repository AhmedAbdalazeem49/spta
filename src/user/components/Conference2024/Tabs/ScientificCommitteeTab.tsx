import React, { useState } from "react";
import femaleAvatarImg from "@/assets/female-avatar.png";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Star, Users, BookOpen, Award } from "lucide-react";

// Member photos
import ImgAlshami from "@/assets/scientific-commiette/Dr Ali M Alshami.jpeg";
import ImgAlfayyadh from "@/assets/scientific-commiette/Abdulmajeed Alfayyadh.jpeg";
import ImgAlmansouri from "@/assets/scientific-commiette/Sara Almansouri.jpg";
import ImgGhina from "@/assets/scientific-commiette/Ghina.jpeg";
import ImgAlomereni from "@/assets/scientific-commiette/abdulaziz alomereni.jpg";
import ImgHaya from "@/assets/scientific-commiette/Haya Aldossary.png";
import ImgAljehani from "@/assets/scientific-commiette/moeaied-eljehaney.jpeg";
import ImgNoran from "@/assets/scientific-commiette/Noran Felemban.png";
import ImgSuhail from "@/assets/scientific-commiette/Dr-Suhail.JPG";

// ─── Types ────────────────────────────────────────────────────────────────────
type MemberRole = "chair" | "vice-chair" | "member" | "support";

interface Member {
  id: number;
  name: string;
  title: string;
  role: MemberRole;
  affiliation: string;
  bio: string;
  photo?: string;
  isFemale?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Prof. Ali M. Alshami",
    title: "Prof.",
    role: "chair",
    affiliation: "Imam Abdulrahman Bin Faisal University, Saudi Arabia",
    photo: ImgAlshami,
    bio: "Professor Ali Alshami is a distinguished Professor and Consultant of Physical Therapy at Imam Abdulrahman Bin Faisal University, specializing in musculoskeletal pain syndromes and manual therapy. He holds a PhD, Master of Physiotherapy, and Graduate Certificate in Manipulative Therapy from Australia, and an Executive MBA from Saudi Arabia. With three decades of experience, he has held senior leadership positions including Vice-Dean and Dean of the College of Applied Medical Sciences. Professor Alshami has authored more than 45 peer-reviewed publications focusing on musculoskeletal disorders, pain mechanisms, neural mobilization, and manual therapy interventions. He is Chairperson of the Saudi Musculoskeletal Physical Therapy Group, and holds one granted US patent for a diagnostic and therapeutic system for manual therapy, with three additional patents under review.",
  },
  {
    id: 2,
    name: "Dr. Asma Saad Alrushud",
    title: "Dr.",
    role: "vice-chair",
    affiliation: "King Saud University, Saudi Arabia",
    isFemale: true,
    bio: "Dr. Asma Alrushud is a Consultant in Physical Therapy and Associate Professor at King Saud University. She holds a PhD in Physical Therapy from the University of Birmingham, UK. She has academic, clinical, teaching, and research experience in musculoskeletal rehabilitation and evidence-based physical therapy practice. Dr. Alrushud currently serves as Assistant to the Vice Dean for Development and Quality at the College of Applied Medical Sciences and as a consultant for the accreditation of the MSc in physical therapy program. Her dedication to innovation is reflected in two United States patents granted for devices designed to support individuals with impaired handgrip strength.",
  },
  {
    id: 3,
    name: "Dr. Abdulmajeed Barakat Alfayyadh",
    title: "Dr.",
    role: "member",
    affiliation: "Jouf University, Saudi Arabia",
    photo: ImgAlfayyadh,
    bio: "Dr. Abdulmajeed Alfayyadh is an Assistant Professor and senior physical therapist at Jouf University. He holds a PhD in Biomechanics and Movement Science from the University of Delaware and an MSc in Biomechanics from the University of Tennessee. His research focuses on ACL reconstruction, knee biomechanics, muscle co-contraction, cartilage health, and osteoarthritis prevention. He has a strong passion for intelligent rehabilitation devices and AI integration in clinical practice, exemplified by his Australian-patented Knee Extensor Activation (KEA) Device.",
  },
  {
    id: 4,
    name: "Dr. Sara Yasir Almansouri",
    title: "Dr.",
    role: "member",
    affiliation: "King Abdulaziz University, Jeddah",
    photo: ImgAlmansouri,
    bio: "Dr. Sara Almansouri is an assistant professor and senior physical therapist at King Abdulaziz University. She obtained her PhD and master's degrees in Biokinesiology from the University of Southern California. Her research, conducted in the Human Performance Laboratory at USC, focuses on typical and pathological lower limb biomechanics as they relate to orthopedic musculoskeletal injuries, including tissue and biomechanical adaptations following ACL reconstruction.",
  },
  {
    id: 5,
    name: "Dr. Ghina AbedAlkarim Al Arab",
    title: "Dr.",
    role: "member",
    affiliation: "Almoosa Rehabilitation Hospital",
    photo: ImgGhina,
    bio: "Dr. Ghina Al Arab, DNP, RN, LSSBB, FPCC, holds a Doctor of Nursing Practice in Educational Leadership and over 15 years of experience in clinical nursing and healthcare leadership. She currently serves as Continuing Professional Development Department Manager and Patient Education Manager at Almoosa Rehabilitation Hospital. She led the design and accreditation of the first SCFHS-approved Specialized Professional Program in Rehabilitation Nursing and Pediatric Physical Therapy.",
  },
  {
    id: 6,
    name: "Dr. Abdulaziz Abdullah Alomereni",
    title: "Dr.",
    role: "member",
    affiliation: "Najran University, Saudi Arabia",
    photo: ImgAlomereni,
    bio: "Dr. Abdulaziz Alomereni is an Assistant Professor of Musculoskeletal Physiotherapy at Najran University, and Vice Dean of Student Affairs. He earned his PhD from the University of Miami and his MS in Musculoskeletal Physical Therapy from the University of Pittsburgh. His expertise focuses on musculoskeletal rehabilitation, sports injuries, functional ankle instability, and sports-related concussion. He leads student engagement initiatives and serves on university research committees.",
  },
  {
    id: 7,
    name: "Mrs. Haya Jassem Aldossary",
    title: "Mrs.",
    role: "member",
    affiliation: "SPTA – Eastern Province Chapter",
    photo: ImgHaya,
    bio: "Haya Aldossary is a Pediatric Physical Therapy Specialist with over 16 years of experience treating neurological, orthopedic, and developmental conditions. She holds an MSc in Healthcare Management from Swiss Business School and serves as Manager of the SPTA Eastern Province Chapter and Quality Ambassador. She is certified in NDT/Bobath, TheraSuit Method, and ISST-Schroth Technique, and has contributed to numerous conferences as an organizing and scientific committee member.",
  },
  {
    id: 8,
    name: "Dr. Moiyad Saleh Aljehani",
    title: "Dr.",
    role: "member",
    affiliation: "Umm Al-Qura University, Saudi Arabia",
    photo: ImgAljehani,
    bio: "Dr. Moiyad Aljehani is a Consultant Physical Therapist and Assistant Professor at Umm Al-Qura University. He earned his PhD in Biomechanics and Movement Sciences from the University of Delaware, where his dissertation received the prestigious Dissertation Award. His research focuses on biomechanics, physical activity, healthy aging, sports performance, and AI integration in rehabilitation. He chaired the Scientific Committee of the 5th Saudi International Physiotherapy Conference.",
  },
  {
    id: 9,
    name: "Dr. Suhail Esam Yaghmor",
    title: "Dr.",
    role: "member",
    affiliation: "Almoosa Rehabilitation Hospital, Al-Ahsa",
    photo: ImgSuhail,
    bio: "Dr. Suhail Esam Yaghmor is a Consultant in Physical Medicine and Rehabilitation with extensive experience in rehabilitation medicine, healthcare leadership, and quality improvement. He completed his specialist training in Physical Medicine and Rehabilitation at Paris Descartes University in France and is licensed as a consultant by the Saudi Commission for Health Specialties. He has held several senior leadership positions, including Chief Medical Officer at Almoosa Rehabilitation Hospital and Medical Director at Cambridge Medical & Rehabilitation Hospital. He has also led healthcare teams through major accreditation programs, including CARF and CBAHI, and serves as a certified surveyor for the Saudi Commission for Health Specialties. Dr. Yaghmor is also involved in medical education, professional examinations, rehabilitation service development, and national professional organizations. His clinical interests include neurorehabilitation, musculoskeletal rehabilitation, spinal cord injury, and interventional rehabilitation medicine.",
  },
  {
    id: 10,
    name: "Ms. Noran Abdulkhaliq Felemban",
    title: "Ms.",
    role: "support",
    affiliation: "Makkah Medical Center, Saudi Arabia",
    photo: ImgNoran,
    bio: "Noran A. Felemban, PT, is a Physical Therapist at Makkah Medical Center. She earned her Bachelor's degree in Physical Therapy from Umm Al-Qura University with First-Class Honors, ranking first on the Dean's List. Her professional interests include evidence-based physiotherapy, biomechanics, movement analysis, and neurological rehabilitation. She has served on the Scientific Committee of the 4th, 5th, and 6th Saudi International Physiotherapy Conferences.",
  },
];

// ─── Role Config ──────────────────────────────────────────────────────────────
const ROLE_CONFIG = {
  "chair": {
    label: "Committee Chair",
    bg: "from-amber-500 to-yellow-400",
    badge: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
    ring: "ring-4 ring-amber-400/50",
    icon: <Crown className="w-3.5 h-3.5" />,
    order: 0,
  },
  "vice-chair": {
    label: "Vice Chair",
    bg: "from-[#11517E] to-[#6FC4BC]",
    badge: "bg-[#e0f2f1] dark:bg-[#11517E]/30 text-[#11517E] dark:text-[#6FC4BC] border-[#6FC4BC]/50 dark:border-[#11517E]",
    ring: "ring-4 ring-blue-400/50",
    icon: <Star className="w-3.5 h-3.5" />,
    order: 1,
  },
  "member": {
    label: "Member",
    bg: "from-slate-500 to-gray-600",
    badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
    ring: "ring-2 ring-gray-200 dark:ring-gray-700",
    icon: <Users className="w-3.5 h-3.5" />,
    order: 2,
  },
  "support": {
    label: "Coordination & Support",
    bg: "from-[#55AE47] to-teal-500",
    badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
    ring: "ring-2 ring-emerald-300/50",
    icon: <Award className="w-3.5 h-3.5" />,
    order: 3,
  },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────
const Avatar = ({ member, size = "lg" }: { member: Member; size?: "sm" | "lg" }) => {
  const dim = size === "lg" ? "w-24 h-24 sm:w-28 sm:h-28" : "w-14 h-14";
  const cfg = ROLE_CONFIG[member.role];
  const initials = member.name
    .split(" ")
    .filter((w) => !["Prof.", "Dr.", "Mr.", "Mrs.", "Ms."].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  // If a real photo is available, use it
  if (member.photo) {
    return (
      <div className={`${dim} rounded-full ${cfg.ring} shadow-xl overflow-hidden shrink-0`}>
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
    );
  }

  // Female icon (no photo) — only Dr. Asma
    // Female icon (no photo)
  if (member.isFemale) {
    return (
      <div className={`${dim} rounded-full flex items-center justify-center ${cfg.ring} shadow-xl overflow-hidden shrink-0 bg-[#eef8f7]`}>
        <img src={femaleAvatarImg} alt="Female Avatar" className="w-full h-full object-cover" />
      </div>
    );
  }

  // Fallback: initials
  return (
    <div className={`${dim} rounded-full bg-gradient-to-br ${cfg.bg} flex items-center justify-center ${cfg.ring} shadow-xl shrink-0`}>
      <span className="text-white font-black text-xl sm:text-2xl tracking-tight">{initials}</span>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const ScientificCommitteeTab = () => {
  const [selected, setSelected] = useState<Member | null>(null);

  const sorted = [...MEMBERS].sort(
    (a, b) => ROLE_CONFIG[a.role].order - ROLE_CONFIG[b.role].order
  );

  const chair = sorted.find((m) => m.role === "chair");
  const viceChair = sorted.find((m) => m.role === "vice-chair");
  const members = sorted.filter((m) => m.role === "member");
  const support = sorted.filter((m) => m.role === "support");

  const MemberCard = ({ member, featured = false }: { member: Member; featured?: boolean }) => {
    const cfg = ROLE_CONFIG[member.role];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -4, scale: 1.01 }}
        onClick={() => setSelected(member)}
        className={`relative bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden group ${
          featured ? "sm:col-span-2 lg:col-span-1" : ""
        }`}
      >
        {/* top gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.bg}`} />

        <div className="p-5 sm:p-6 flex gap-4 items-start">
          <Avatar member={member} size="sm" />

          <div className="flex-1 min-w-0">
            {/* role badge */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border mb-2 ${cfg.badge}`}>
              {cfg.icon} {cfg.label}
            </span>
            <h4 className="font-black text-gray-900 dark:text-white text-sm sm:text-base leading-tight mb-0.5">
              {member.name}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-snug line-clamp-2">
              {member.affiliation}
            </p>
          </div>
        </div>

        {/* Bio teaser */}
        <div className="px-5 sm:px-6 pb-5">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {member.bio}
          </p>
          <button className="mt-3 text-xs font-bold text-[#11517E] dark:text-[#6FC4BC] flex items-center gap-1 group-hover:gap-2 transition-all">
            <BookOpen className="w-3.5 h-3.5" /> Full Bio
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="pb-10 space-y-10 w-full">
      {/* Section Title */}
      <div className="mb-2">
        <h3 className="text-4xl font-black text-[#11517E] mb-3">
          Scientific Committee
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full"></div>
      </div>

      {/* Chair + Vice Chair — featured row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {chair && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(chair)}
            className="relative bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border-2 border-amber-200 dark:border-amber-800/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
            <div className="flex items-center gap-5 relative z-10">
              <Avatar member={chair} size="lg" />
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700 mb-3">
                  <Crown className="w-3.5 h-3.5" /> Committee Chair
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-1">
                  {chair.name}
                </h3>
                <p className="text-sm text-amber-700 dark:text-amber-400 font-semibold">{chair.affiliation}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 relative z-10">
              {chair.bio}
            </p>
            <button className="mt-3 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:gap-2 transition-all relative z-10">
              <BookOpen className="w-3.5 h-3.5" /> Read Full Bio
            </button>
          </motion.div>
        )}

        {viceChair && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(viceChair)}
            className="relative bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 border-2 border-[#11517E]/20 dark:border-blue-800/50 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
            <div className="flex items-center gap-5 relative z-10">
              <Avatar member={viceChair} size="lg" />
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border bg-[#e0f2f1] dark:bg-blue-900/40 text-[#11517E] dark:text-[#6FC4BC] border-[#6FC4BC]/50 dark:border-[#11517E] mb-3">
                  <Star className="w-3.5 h-3.5" /> Vice Chair
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-1">
                  {viceChair.name}
                </h3>
                <p className="text-sm text-[#11517E] dark:text-[#6FC4BC] font-semibold">{viceChair.affiliation}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 relative z-10">
              {viceChair.bio}
            </p>
            <button className="mt-3 text-xs font-bold text-[#11517E] dark:text-[#6FC4BC] flex items-center gap-1 group-hover:gap-2 transition-all relative z-10">
              <BookOpen className="w-3.5 h-3.5" /> Read Full Bio
            </button>
          </motion.div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
          <Users className="w-4 h-4" /> Committee Members
        </span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m, i) => (
          <motion.div key={m.id} transition={{ delay: i * 0.05 }}>
            <MemberCard member={m} />
          </motion.div>
        ))}
      </div>

      {/* Support divider */}
      {support.length > 0 && (
        <>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <span className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <Award className="w-4 h-4" /> Coordination & Support
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {support.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.88, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden max-h-[90vh] flex flex-col mx-2"
            >
              {/* Modal top gradient header */}
              <div className={`h-2 w-full bg-gradient-to-r ${ROLE_CONFIG[selected.role].bg} shrink-0`} />

              {/* Scrollable content */}
              <div className="overflow-y-auto">
                <div className="p-6 sm:p-8">
                  {/* Close button */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-5 right-5 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
                  >
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </button>

                  {/* Profile header */}
                  <div className="flex items-center gap-5 mb-6">
                    <Avatar member={selected} size="lg" />
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border mb-3 ${ROLE_CONFIG[selected.role].badge}`}>
                        {ROLE_CONFIG[selected.role].icon} {ROLE_CONFIG[selected.role].label}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight mb-1">
                        {selected.name}
                      </h3>
                      <p className={`text-sm font-semibold`}
                        style={{ color: selected.role === "chair" ? "#b45309" : selected.role === "vice-chair" ? "#1d4ed8" : "#6b7280" }}>
                        {selected.affiliation}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${ROLE_CONFIG[selected.role].bg} mb-6 rounded-full opacity-40`} />

                  {/* Full Bio */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> Full Biography
                    </h4>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {selected.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
