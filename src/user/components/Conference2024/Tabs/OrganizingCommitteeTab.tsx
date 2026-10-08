import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import React from "react";
import femaleAvatarImg from "@/assets/female-avatar.png";

import imgAlfarhan from "@/assets/organization-committe/Dr. Abdullah Alfarhan.jpg";
import imgNawaf from "@/assets/organization-committe/Dr. Nawaf Alhatim.jpg";
import imgAbdulrahman from "@/assets/organization-committe/Mr. Abdulrahman Alkusayer.jpg";
import imgAlghanim from "@/assets/organization-committe/Mr. Ahmed Alghanim.jpg";
import imgMohammadAlIbrahim from "@/assets/organization-committe/Mr. Mohammad AlIbrahim.jpg";
import imgDalia from "@/assets/organization-committe/Ms. Dalia Binshaye.jpg";
// import imgSarah from "@/assets/organization-committe/Ms. Sarah Alwuthayh.jpg";
import imgShouq from "@/assets/organization-committe/Ms. Shouq Alharbi.jpg";
import imgSujud from "@/assets/organization-committe/Ms. Sujud Al-Thanayyan.jpg";
import imgHiader from "@/assets/organization-committe/hiader-elyame.jpeg";

export const OrganizingCommitteeTab = () => {
  const { language } = useLanguage();

  const members = [
    {
      id: 1,
      name: "Dr. Nawaf Alhatim",
      role: "Chair",
      initials: "NA",
      image: imgNawaf,
    },
    {
      id: 2,
      name: "Mr. Mohammad AlIbrahim",
      role: "Vice Chair",
      initials: "MA",
      image: imgMohammadAlIbrahim,
    },
    {
      id: 3,
      name: "Ms. Dalia Binshaye",
      role: "Master of Ceremonies",
      initials: "DB",
      image: imgDalia,
    },
    {
      id: 4,
      name: "Dr. Hiadr Elyame",
      role: "Poster Presentation Lead",
      initials: "PPL",
      image: imgHiader,
    },
    {
      id: 5,
      name: "Mr. Abdulrahman Alkusayer",
      role: "Volunteer Lead",
      initials: "VL",
      image: imgAbdulrahman,
    },
    {
      id: 6,
      name: "Ms. Sujud Al-Thanayyan",
      role: "Media and Publication lead",
      initials: "ST",
      image: imgSujud,
    },
    {
      id: 7,
      name: "Ms. Shouq Alharbi",
      role: "Media Lead",
      initials: "SA",
      image: imgShouq,
    },
    {
      id: 8,
      name: "Mrs. Areej Almuhsen",
      role: "Media Lead",
      initials: "AA",
      isFemale: true,
      image: null,
    },
    // {
    //   id: 9,
    //   name: "Ms. Sarah Alwuthayh",
    //   role: "Media Team",
    //   initials: "SA",
    //   image: imgSarah,
    // },
    {
      id: 10,
      name: "Dr. Abdullah Alfarhan",
      role: "Speaker & Guest Coordinator",
      initials: "AA",
      image: imgAlfarhan,
    },
    {
      id: 11,
      name: "Mr. Ahmed Alghanim",
      role: "Hospitalisty lead",
      initials: "AA",
      image: imgAlghanim,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-4xl font-black text-[#11517E] mb-3">
          {language === "ar" ? "اللجنة المنظمة" : "Organizing Committee"}
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center bg-gray-50 p-6 sm:p-8 rounded-3xl hover:bg-[#f0f8f8] :bg-gray-800 transition-colors border border-transparent hover:border-blue-100 :border-gray-700 shadow-sm"
          >
            <div className="w-24 h-24 mb-4 bg-gradient-to-br from-[#11517E] to-[#6FC4BC] rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white ">
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (member as any).isFemale ? (
                <img src={femaleAvatarImg} alt="Female Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-extrabold text-white tracking-widest">
                  {member.initials}
                </span>
              )}
            </div>
            <h4 className="font-bold text-base text-gray-800 text-center">
              {member.name}
            </h4>
            <p className="text-sm text-[#11517E] -[#6FC4BC] font-medium text-center mt-1">
              {member.role}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
