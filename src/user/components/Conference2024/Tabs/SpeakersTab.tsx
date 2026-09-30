import { AnimatePresence, motion } from "framer-motion";
import { Award, Eye, Mic, Star, User, Users, X } from "lucide-react";
import React, { useState } from "react";

// Keynote Images
import ImgAlnashri from "@/assets/keynote-speakers/Dr Alnashri - Ahmad Alnashri.jpg";
import ImgFaisal from "@/assets/keynote-speakers/Dr. Faisal Al-Dahmashi.jpeg";
import ImgMashael from "@/assets/keynote-speakers/Dr. Mashael Alsobhi.jpeg";
import ImgLorimer from "@/assets/keynote-speakers/LorimerMoseley2020ByCathLeo-21 - Lorimer.jpg";
import ImgTurki from "@/assets/keynote-speakers/TA-Photo-BSL - Turki Abualait.jpg";

// Invited Images
import ImgAlbarrati from "@/assets/invited-speakers/Ali Albarrati.png";
import ImgAlshami from "@/assets/invited-speakers/Dr Ali M Alshami.jpg";
import ImgEmbaby from "@/assets/invited-speakers/heba embaby.jpg";
import ImgRafferty from "@/assets/invited-speakers/MiriamRafferty_colorHighRes - Miriam Rafferty.jpg";
import ImgMuaidi from "@/assets/invited-speakers/Prof. Qassim Muaidi.jpg";
import ImgHinman from "@/assets/invited-speakers/Rana Hinman.jpg";
import ImgHarries from "@/assets/invited-speakers/sian harries.jpg";
import ImgMcGee from "@/assets/invited-speakers/Terrence_McGee - Terrence McGee.png";
import ImgVasilcova from "@/assets/invited-speakers/Vero Vas.jpg";

// Panelist Images
import ImgAlqahtani from "@/assets/panalist/A Alqahtani.jpg";
import ImgBarhameen from "@/assets/panalist/A B.jpg";
import ImgFaisalMubarak from "@/assets/panalist/Faisal Mubarak M. Al Mubarak.jpeg";
import ImgLamia from "@/assets/panalist/Lamia Alfaleh.jpeg";
import ImgManar from "@/assets/panalist/manar almukairish.jpeg";
import ImgAlhaizan from "@/assets/panalist/Muhammad Al-Heizan.jpg";
import ImgTahany from "@/assets/panalist/Tahany Alhamad.png";
import ImgWalid from "@/assets/panalist/Walid Ouanes.jpeg";

// Moderator Images
import ImgAsma from "@/assets/moderators/Dr. Asma_ Personal Photo.png";
import ImgHani from "@/assets/moderators/Dr. Hani Alkhawajah_ personal photo.jpg";
import ImgMishal from "@/assets/moderators/Dr. Mishal_ Personal Photo.jpg";
import ImgSara from "@/assets/moderators/Dr. Sara_ Personal photo.jpg";
import ImgAbdulaziz from "@/assets/moderators/Dr.Abdulazi_ Personal_ Photo.jpg";
import ImgAhmad from "@/assets/moderators/Dr.Ahmad_personal_picture.jpg";
import ImgSattam from "@/assets/moderators/Dr.Sattam_ Personal_ Photo.jpg";

const speakersData = {
  keynote: [
    {
      title: "Dr.",
      name: "Faisal Al-Dahmashi",
      bio: "Dr. Faisal Al-Dahmashi is Vice President for Healthcare Delivery at Health Holding Company in Saudi Arabia and a senior healthcare leader with more than 20 years of experience in healthcare delivery, hospital operations, performance improvement, and health system transformation.\nHe previously held senior leadership positions at the Saudi Ministry of Health, including Assistant Deputy Minister for Hospitals Services and Assistant Deputy for Medical Support Services, where he contributed to the development and oversight of healthcare services at a national level.\nDr. Al-Dahmashi holds a PhD in Biomechanics and Motion Analysis from the University of Salford and an MSc in Sports Injuries from Cardiff University. He has published peer-reviewed research in biomechanics and human movement, with academic and professional interests in motion analysis, rehabilitation, sports injury prevention, clinical performance, and healthcare innovation.\nHis career combines a strong academic foundation in biomechanics with extensive executive leadership experience in transforming and improving healthcare delivery systems.",
      photo: ImgFaisal,
    },
    {
      title: "Dr.",
      name: "Ahmad Ali Alnashri",
      bio: "Clinician with dual specialization in Family and Geriatric Medicine, bringing a unique blend of clinical expertise and strategic leadership to the healthcare sector. With experience across Saudi Arabia and Australia, has provided care in diverse health systems, gaining insight into both local and international best practices.\nCurrently serves as Care Delivery Director for Extended Care at the first national state-owned health holding company, a key pillar of the Saudi National Health Transformation Program, leading the integration and advancement of long-term care, rehabilitation, and home healthcare services across the continuum of care.\nPreviously serves as Head of Home Healthcare and lead for Home Healthcare Enhancement Programs within the Ministry of Defense Health Services, driving initiatives to expand and improve care delivery models, particularly for older adults.\nHolds a Master's degree in Health Leadership and Management from one of the world's top universities, and has actively contributed to national healthcare committees focused on system improvement, ageing, and home-based services.\nDriven by a commitment to value-based care, patient-centered models, and healthy longevity, with a strong focus on advancing care for older adults through innovation, policy development, and system redesign.",
      photo: ImgAlnashri,
    },
    {
      title: "Prof.",
      name: "Graham Lorimer Moseley",
      bio: "Lorimer is a neuroscientist, science communicator and physiotherapist. He has authored over 440 scientific articles, 8 books and has an h-index of 113. He is internationally recognised for his contributions to pain science and management, professional and public education and science communication.",
      photo: ImgLorimer,
    },
    {
      title: "Dr.",
      name: "Turki Saeed Abualait",
      bio: "Turki Abualait is an Associate Professor at the Department of Physical Therapy, College of Applied Medical Sciences at Imam Abdulrahman Bin Faisal University, Dammam, Saudi Arabia. Abualait is a consultant and clinical researcher in cognitive neuroscience and neurorehabilitation, interested in investigating the motor recovery after neurological disorders. Additionally, he has an interest in using brain imaging and utilizing non-invasive brain stimulation (NIBS) as neuromodulation techniques to investigate the potential therapeutic applications on the functional recovery on patients with neurological disorders or cortical lesions.",
      photo: ImgTurki,
    },
    {
      title: "Dr.",
      name: "Mashael Ghazi Alsobhi",
      bio: "Dr. Mashael Alsobhi, PT, MPT, PP-DPT, PhD, is a Consultant Musculoskeletal Physical Therapist from Saudi Arabia and an Associate Professor at King Abdulaziz University, Jeddah, Saudi Arabia. She earned her PhD in Health Sciences from Seton Hall University, with a focus on orthopedics and movement sciences in adults with arthritis. Dr. Alsobhi currently serves as the Director of the Physical Therapy Bridging Program, where she contributes to academic leadership, curriculum development, and the advancement of physical therapy education. Her clinical and research expertise focuses on musculoskeletal rehabilitation, arthritis, musculoskeletal pain, and innovative approaches to physical therapy practice. She has an active research profile with publications in international peer-reviewed journals and continues to contribute to research exploring the application of artificial intelligence in physical therapy and healthcare. Her work aims to advance evidence-based clinical practice, education, and the integration of emerging technologies in rehabilitation.",
      photo: ImgMashael,
    },
  ],
  invited: [
    {
      title: "Prof.",
      name: "Qassim Ibrahim Muaidi",
      bio: "Prof. Qassim Ibrahim Muaidi is a Professor and Consultant Physical Therapist in Sports Medicine, and former Dean of the College of Applied Medical Sciences at Imam Abdulrahman Bin Faisal University. He previously served as President of the Saudi Federation of Sports Medicine, Board Member of the Asian Federation of Sports Medicine, and Member of the Development Commission at the International Federation of Sports Medicine. He holds a PhD in Sports Physiotherapy from the University of Sydney and has published over 80 scientific papers in sports medicine and rehabilitation.",
      photo: ImgMuaidi,
    },
    {
      title: "Dr.",
      name: "Sian Elin Harries (Knott)",
      bio: "Sian completed her Professional Doctorate in 2025, her research focused on the experiences of physiotherapists working in elite sport and the challenges of speaking up in these environments. Currently holding multiple roles, combining her position as Lead Physiotherapist for Welsh Gymnastics and Lecturer at Cardiff University and programme lead for MSc Sports & Exercise Medicine. Qualifying in 1995, her sport experience spans both elite and grassroots, giving her a broad perspective on the profession. Sian has extensive multisport experience, beginning with her selection for Team Wales at the Manchester 2002 Commonwealth Games. She has since been selected for six Commonwealth Games, serving as Head Physiotherapist at three. Her international experience also includes four Summer Olympic Games and two Winter Olympic Games, where she held the role of Chief Physiotherapist and deputy chief physiotherapist for Team GB.",
      photo: ImgHarries,
    },
    {
      title: "Prof.",
      name: "Ali Alshami",
      bio: "Professor Ali Alshami is a distinguished Professor and Consultant of Physical Therapy at Imam Abdulrahman Bin Faisal University, Saudi Arabia, specializing in musculoskeletal pain syndromes and manual therapy. He holds a PhD, Master of Physiotherapy, and Graduate Certificate in Manipulative Therapy from Australia, and an Executive MBA from Saudi Arabia. With three decades of experience, he has held senior leadership positions including Vice-Dean and Dean of the College of Applied Medical Sciences. Professor Alshami has authored more than 45 peer-reviewed publications focusing on musculoskeletal disorders, pain mechanisms, neural mobilization, and manual therapy interventions. As Chairperson of the Saudi Musculoskeletal Physical Therapy Group, he actively shapes physical therapy practice and education across the Kingdom through specialized courses, workshops, and clinical practice. His commitment to innovation is demonstrated by one granted United States patent for a diagnostic and therapeutic system for manual therapy and three additional patents currently under review.",
      photo: ImgAlshami,
    },
    {
      title: "Prof.",
      name: "Ali Albarrati",
      bio: "A distinguished Full Professor, nationally recognised clinician, and prolific innovator with over 25 years of combined academic, clinical, and administrative experience in cardiopulmonary rehabilitation. Holder of four international patents, author of 100+ peer-reviewed publications cited over 1,000 times (Google Scholar), and Director of Saudi Arabia's National Cardiac Rehabilitation Program. Demonstrated leadership at the highest levels of healthcare governance through roles with the Saudi Health Council, King Saud University, and King Fahad Cardiac Center. Passionate advocate for evidence-based rehabilitation, Saudi Vision 2030 health goals, and global health equity through humanitarian service.",
      photo: ImgAlbarrati,
    },
    {
      title: "Dr.",
      name: "Maha Almarwani",
      bio: "Dr. Maha Almarwani is an Associate Professor in the Department of Health Rehabilitation Sciences, College of Applied Medical Sciences at King Saud University. Her research focuses on healthy aging, fall prevention, rehabilitation, physical activity, ageism, and geriatric physical therapy. She has led and collaborated on several national and international research projects related to geriatrics, physical therapy, and public health, including healthy aging initiatives in Saudi Arabia. Dr. Almarwani also serves as a research collaborator and academic supervisor for graduate students in rehabilitation sciences and aging research.",
      photo: null,
    },
    {
      title: "Prof.",
      name: "Heba Mohamed Embabi",
      bio: "Prof. Heba Mohamed Aly Sayed Embaby is a Professor of Women’s Health Physical Therapy at Cairo University and an Assistant Professor at King Abdulaziz University, Saudi Arabia. She obtained her B.Sc., M.Sc., and Ph.D. in Physical Therapy from Cairo University. With over 20 years of academic, clinical, and research experience, she has specialized in women’s health rehabilitation, obstetrics and gynecology, pelvic floor dysfunction, pregnancy-related disorders, and therapeutic exercise. Prof. Embaby has published numerous research articles in international peer-reviewed journals and has supervised undergraduate and postgraduate research projects. She has extensive experience in teaching, curriculum development, quality assurance, and clinical training. Her research focuses on evidence-based interventions that improve women’s health, functional outcomes, and quality of life. She actively contributes to academic committees and professional development initiatives in physical therapy education and practice.",
      photo: ImgEmbaby,
    },
    {
      title: "Dr.",
      name: "Veronika Vasilcova",
      bio: "Dr. Veronika Vasilcová is a successful graduate of the Masaryk University in Brno and University of Prešov.\nSince 2014, she has been working as a clinical specialist in physiotherapy at the King Abdullah Children's Specialized Hospital in Riyadh. She is the incharge of the outpatient department. She participates in the education of students, residents, new therapists and doctors in the practical and theoretical part of rehabilitation.",
      photo: ImgVasilcova,
    },
    {
      title: "Dr.",
      name: "Miriam Rafferty",
      bio: "Miriam Rafferty, DPT, PhD is the Director of Implementation Science and a Parkinson’s Physical Therapist at the Shirley Ryan AbilityLab. She directs the Parkinson’s Disease and Movement Disorders rehabilitation research program and has academic appointments as an Assistant Professor at Northwestern University’s Feinberg School of Medicine in the Departments of Physical Medicine & Rehabilitation; Medical Social Sciences; and Psychiatry & Behavioral Science. Dr. Rafferty’s research focuses on health services delivery models for people with Parkinson’s disease, particularly examining how proactive rehabilitation can facilitate long-term community exercise participation. She also uses implementation science methodology to improve adoption of evidence-based practices and conducts research to inform the implementation of novel technologies into real-world rehabilitation settings.",
      photo: ImgRafferty,
    },
    {
      title: "Dr.",
      name: "Terrence Gerald McGee",
      bio: "Dr. McGee is an Assistant Professor and Director of Strategic Operations in the Department of Physical Therapy at the University of Delaware. He is a Fellow of the American Academy of Orthopaedic Manual Physical Therapists, a board-certified clinical specialist in orthopaedic physical therapy, and a graduate of the APTA Academy of Education Fellowship in Higher Education Leadership. A strong advocate for formal post-professional education, Dr. McGee has been actively involved in residency and fellowship education since 2011, contributing to the development and accreditation of physical therapy, occupational therapy, and speech-language pathology programs. His leadership in advancing residency and fellowship education led to his appointment to the American Board of Physical Therapy Residency and Fellowship Education (ABPTRFE), where he currently serves as Chair Emeritus.",
      photo: ImgMcGee,
    },
    {
      title: "Prof.",
      name: "Rana S Hinman",
      bio: "Rana is a research physiotherapist, Professor and academic at the Centre for Health, Exercise & Sports Medicine at the University of Melbourne. Her research focuses on clinical trials of non-drug non-surgical treatment strategies for osteoarthritis, in particular exercise, rehabilitation and biomechanical interventions. She has a strong interest in developing and implementing methods to increase access to care, including telerehabilitation and digital health strategies. Rana has published over >400 peer-reviewed papers, been awarded >$50M in research grant funds and is an Editorial Board member for Journal of Physiotherapy and an Academic Editor for PLOS Medicine.",
      photo: ImgHinman,
    },
  ],
  panelists: [
    {
      title: "Dr.",
      name: "Faisal Al-Dahmashi",
      bio: "Dr. Faisal Al-Dahmashi is Vice President for Healthcare Delivery at Health Holding Company in Saudi Arabia and a senior healthcare leader with more than 20 years of experience in healthcare delivery, hospital operations, performance improvement, and health system transformation.\nHe previously held senior leadership positions at the Saudi Ministry of Health, including Assistant Deputy Minister for Hospitals Services and Assistant Deputy for Medical Support Services, where he contributed to the development and oversight of healthcare services at a national level.\nDr. Al-Dahmashi holds a PhD in Biomechanics and Motion Analysis from the University of Salford and an MSc in Sports Injuries from Cardiff University. He has published peer-reviewed research in biomechanics and human movement, with academic and professional interests in motion analysis, rehabilitation, sports injury prevention, clinical performance, and healthcare innovation.\nHis career combines a strong academic foundation in biomechanics with extensive executive leadership experience in transforming and improving healthcare delivery systems.",
      photo: ImgFaisal,
    },
    {
      title: "Dr.",
      name: "Hanan Sulaiman Alsaif",
      bio: "Dr. Hanan Suliman Al Saif is a dedicated Senior Musculoskeletal Physiotherapist and currently serves as Deputy Director of the Physical Therapy Department at King Fahad Military Medical Complex in Dhahran, Kingdom of Saudi Arabia. She also holds the position of Clinical Assistant Professor at Prince Sultan Military College.\nDr. Al Saif earned her Doctor of Philosophy (PhD) in Musculoskeletal Physiotherapy from the University of Manchester, United Kingdom (2023), following a Master's degree with merit from Manchester Metropolitan University. Her clinical career spans over 25 years at KFMMC, where she has also served as Acting Deputy Director of Physiotherapy.\nAn active researcher, Dr. Al Saif has published her work in BMC Musculoskeletal Disorders and Musculoskeletal Science & Practice on lumbar discectomy rehabilitation. She serves on the Research Ethics Committee at KFMMC. Her innovation 'Step Free' earned her a Silver Medal at the Geneva International Invention Exhibition (2026).",
      photo: null,
    },
    {
      title: "",
      name: "Talal Alghamdi",
      bio: "Biography and photo coming soon.",
      photo: null,
    },
    {
      title: "Dr.",
      name: "Noora Abdullah Alshoweir",
      bio: "A Consultant Musculoskeletal Physiotherapist with over 30 years of clinical, educational, and leadership experience in the field of physical therapy. Throughout my career, I have demonstrated a strong commitment to advancing musculoskeletal rehabilitation, evidence-based practice, and the development of healthcare professionals.\nIn addition to my extensive clinical expertise, I served as the Chairman of the Physical Therapy Residency Program, where I lead curriculum development, quality improvement initiatives, competency-based education, and trainee assessment. I was actively involved in mentoring residents, promoting clinical excellence, and supporting the advancement of postgraduate physical therapy education.\nMy professional interest include musculoskeletal disorders, clinical reasoning, residency training, healthcare education, and the integration of best evidence into clinical practice. Through the leadership and dedication, I continue to contribute to the growth of the physical therapy profession and the delivery of high-quality patient care.",
      photo: null,
    },
    {
      title: "Dr.",
      name: "Walid Ouanes",
      bio: "Sports Medicine and PMR consultant – Almoosa Rehabilitation Hospital- KSA\nAssociate Professor - Department of physical medicine and rehabilitation – Sousse University – Sahloul Hospital-Tunisia\nDirector of « football Medecine diploma » - Sousse University - Tunisia\nWas in charge of medical department with professional clubs in Tunisia and Saudia Arabia:\nTeam doctor of Football Team (Etoile Sportive du Sahel) – Tunisian National League\nWinner of Tunisian football league- professional league- 2022-2023\nHead of medical department at AL AHLY Jeddah -Saudi Arabia, 2014-2017:\n-Winner of Saudi professional football league 2015-2016\n-Winner of Saudi King Cup 2015-2016\n-Winner of Saudi Super Cup 2015-2016\n-Winner of Saudi Prince Cup 2014-2015",
      photo: ImgWalid,
    },
    {
      title: "Dr.",
      name: "Tahany Mohanna Alhamad",
      bio: "Dr. Tahani Mahna Alhamad, PhD\nSenior Specialist in Counseling and Rehabilitation\nSaudi Commission for Health Specialties (SCFHS) Certified\nDr. Tahani earned her PhD in Rehabilitation and Counseling from Southern Illinois University, USA, in 2021, and her Master’s degree in Social Work, specializing in Child, Youth, and Family Counseling, from the same university in 2015.\nShe has extensive clinical and professional experience in psychological counseling and rehabilitation, including eight years of academic and professional experience in the United States. She currently works at Almoosa Rehabilitation Hospital and has provided over 4,000 hours of individual counseling to clients across all age groups, from children to older adults.",
      photo: ImgTahany,
    },
    {
      title: "Dr.",
      name: "Mohammed Osama Alhaizan",
      bio: "I have a PhD in Occupational Science and I specialize in cognitive neurorehabilitation and have an interest in the assessment of cognitive ability and the impact of cognitive deficits on daily life activities.",
      photo: ImgAlhaizan,
    },
    {
      title: "Dr.",
      name: "Faisal Al Mubarak",
      bio: "Dr. Faisal Mubarak Al Mubarak is a senior healthcare leader and Consultant Physical Therapist with more than 20 years of experience in rehabilitation, clinical operations, hospital leadership, residency education, and national physical therapy strategy. He currently serves as National Leader of Physical Therapy at the Ministry of Health, leading strategic initiatives across 20 healthcare clusters, and as Consultant Physical Therapist at Aseer Central Hospital. He is also Program Director of the Saudi Board Musculoskeletal Physical Therapy Residency and Founder and Chairman of the Society of Vertigo and Balance Disorders “Thbat.” Dr. Faisal holds a Doctor of Science in Physical Therapy from Loma Linda University, a Master’s degree in Health Services Administration from the University of Evansville, and a Bachelor’s degree in Physical Therapy from King Saud University. His expertise includes vestibular rehabilitation, balance disorders, musculoskeletal rehabilitation, clinical governance, workforce development, and evidence-based service transformation.",
      photo: ImgFaisalMubarak,
    },
    {
      title: "Ms.",
      name: "Lamia Faleh AlFaleh",
      bio: "Lamia Alfaleh is a healthcare leader with over 20 years of experience in rehabilitation, healthcare operations, and service transformation. She serves as Director of Rehabilitation Programs & Services at Sultan Bin Abdulaziz Humanitarian City, leading strategic initiatives in rehabilitation, quality improvement, and patient-centered care.\nShe holds a Bachelor of Science in Physical Therapy from King Saud University and a Master of Science in Neuroscience from Brunel University London. Lamia has contributed to healthcare development through advisory and collaborative roles with the World Health Organization, Council of Health Insurance, and King Saud University. Her work focuses on advancing accessible, evidence-based healthcare that improves patient outcomes and quality of life.",
      photo: ImgLamia,
    },
    {
      title: "Dr.",
      name: "Abdulfattah Saeed Alqahtani",
      bio: "Dr. Abdulfattah Alqahtani is a visionary healthcare leader, consultant, and academic with a distinguished focus on advancing cardiopulmonary and cardiac rehabilitation services, physical therapy practice, and healthcare governance. He currently serves as an Associate Professor and Consultant of Cardiopulmonary Rehabilitation, where his work is centered on translating evidence-based practice into high-impact clinical programs that improve functional capacity, quality of life, and long-term outcomes for patients with cardiovascular and pulmonary diseases.\nAs President of the Saudi Physical Therapy Association (SPTA), Dr. Alqahtani leads national initiatives aimed at elevating professional standards, strengthening governance structures, and advancing the role of physical therapy within the healthcare system. His leadership has focused on policy development, professional regulation, capacity building, and fostering collaboration across healthcare sectors to ensure safe, effective, and patient-centered rehabilitation services.",
      photo: ImgAlqahtani,
    },
    {
      title: "Ms.",
      name: "Manar Mohammed Almkirsh",
      bio: "I am a healthcare strategist and rehabilitation leader in health policy, strategic planning, and healthcare transformation. I currently serve within Healthcare Delivery Department at the Health Holding Company (HHC), where I lead initiatives focused on rehabilitation service development, system integration, performance improvement, and value-based care across Saudi Arabia. My experience spans national policy development, rehabilitation system redesign, digital health initiatives, virtual rehabilitation services, and international benchmarking aligned with Saudi Vision 2030. I have contributed to several national transformation projects through collaboration with the Ministry of Health, SEHA Virtual Hospital, and leading rehabilitation organizations. Passionate about innovation and patient-centered care, I advocate for integrated, outcome-driven rehabilitation systems that enhance accessibility, quality, and long-term health outcomes while supporting sustainable healthcare delivery and advancing the future of rehabilitation services.",
      photo: ImgManar,
    },
    {
      title: "Dr.",
      name: "Ahamd Yaseen Barhameen",
      bio: "Board-facing senior executive with more than two decades of leadership across complex organizations and founder-influenced growth environments. Track record of restoring performance, incubating new ventures, institutionalizing governance, strengthening management systems, and building accountable executive teams. Known for turning strategic direction into disciplined execution through tighter financial control, quality-led operating rigor, and clearer performance oversight. Experience spans multi-entity operations, education services, asset development, service-platform growth, and public-private leadership mandates.",
      photo: ImgBarhameen,
    },
  ],
  moderators: [
    {
      title: "Dr.",
      name: "Abdulaziz Alomereni",
      credentials: "PhD, PT",
      role: "Assistant Professor of Musculoskeletal Physical Therapy",
      department:
        "Department of Medical Rehabilitation Sciences - Physical Therapy Program",
      college: "College of Applied Medical Sciences",
      org: "Najran University",
      isFemale: false,
      photo: ImgAbdulaziz,
    },
    {
      title: "Dr.",
      name: "Ahmad Alghamdi",
      credentials: "PhD, PT",
      role: "Assistant Professor; Chair of the Physical Therapy Department",
      department: "Department of Physical Therapy",
      college: "College of Applied Medical Sciences",
      org: "Imam Abdulrahman Bin Faisal University",
      isFemale: false,
      photo: ImgAhmad,
    },
    {
      title: "Dr.",
      name: "Hani Alkhawajah",
      credentials: "BSc PT, MSc, PhD",
      role: "Senior Staff Physiotherapist; Chairman of the Physical Therapy Department",
      department: "Department of Physical Therapy",
      college: "King Fahad Hospital of the University",
      org: "Imam Abdulrahman Bin Faisal University",
      isFemale: false,
      photo: ImgHani,
    },
    {
      title: "Dr.",
      name: "Sara Almansouri",
      credentials: "PhD",
      role: "Assistant Professor",
      department: "",
      college: "Faculty of Medical Rehabilitation Sciences",
      org: "King Abdulaziz University",
      isFemale: true,
      photo: ImgSara,
    },
    {
      title: "Dr.",
      name: "Batool Al Hassan",
      credentials: "PharmD",
      role: "Group Inpatient Pharmacy Services Director; Chairman of the Pharmacy & Therapeutics Committee",
      department: "",
      college: "",
      org: "Almoosa Health Group",
      isFemale: true,
      photo: null,
    },
    {
      title: "Dr.",
      name: "Mishal Aldaihan",
      credentials: "PT, DPT, MPT, Ph.D",
      role: "Associate Professor of Physical Therapy",
      department: "Department of Rehabilitation Health Sciences",
      college: "College of Applied Medical Sciences",
      org: "King Saud University",
      isFemale: false,
      photo: ImgMishal,
    },
    {
      title: "Dr.",
      name: "Asma Alderaa",
      credentials: "BSc, MSc, Ph.D",
      role: "Assistant Professor and Consultant Physical Therapist",
      department: "Rehabilitation Department",
      college: "College of Applied Medical Sciences",
      org: "King Saud University",
      isFemale: true,
      photo: ImgAsma,
    },
    {
      title: "Dr.",
      name: "Sattam Almutairi",
      credentials: "PT, DPT, MPT, Ph.D",
      role: "Associate Professor and Consultant Physical Therapy",
      department: "Department of Physical Therapy",
      college: "College of Applied Medical Science",
      org: "Qassim University",
      isFemale: false,
      photo: ImgSattam,
    },
  ],
};

const FallbackAvatar = ({
  name,
  isFemale,
}: {
  name: string;
  isFemale?: boolean;
}) => {
  if (isFemale) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-pink-100 to-rose-50 dark:from-pink-900/40 dark:to-rose-900/20 flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 100 100"
          className="w-3/4 h-3/4 opacity-70"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="100"
            r="60"
            fill="currentColor"
            className="text-pink-200 dark:text-pink-800"
          />
          <ellipse
            cx="50"
            cy="30"
            rx="20"
            ry="22"
            fill="currentColor"
            className="text-pink-300 dark:text-pink-700"
          />
          <path
            d="M 20 40 Q 50 65 80 40 Q 75 20 50 18 Q 25 20 20 40Z"
            fill="currentColor"
            className="text-pink-400 dark:text-pink-600"
          />
          <path
            d="M 25 75 Q 50 65 75 75 L 80 100 L 20 100Z"
            fill="currentColor"
            className="text-pink-300 dark:text-pink-700"
          />
        </svg>
      </div>
    );
  }

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
      <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-400 dark:text-slate-500">
        {initials}
      </span>
    </div>
  );
};

export const SpeakersTab = () => {
  const [activeTab, setActiveTab] = useState("keynote");
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

  const tabs = [
    {
      id: "keynote",
      label: "Keynote Speakers",
      icon: <Star className="w-4 h-4" />,
    },
    {
      id: "invited",
      label: "Invited Experts",
      icon: <Award className="w-4 h-4" />,
    },
    {
      id: "panelists",
      label: "Panelists",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "moderators",
      label: "Moderators",
      icon: <Mic className="w-4 h-4" />,
    },
  ];

  return (
    <div className="py-4 md:py-8 w-full max-w-[1400px] mx-auto relative">
      {/* INTERNAL TABS - Improved contrast and active state */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105"
                : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* KEYNOTE SPEAKERS - Big Featured Cards, Left/Right alternating */}
        {activeTab === "keynote" && (
          <motion.div
            key="keynote"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-12"
          >
            {speakersData.keynote.map((speaker, i) => (
              <div
                key={i}
                className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/5 dark:shadow-none border border-slate-100 dark:border-slate-800 group`}
              >
                <div className="lg:w-2/5 xl:w-1/3 relative min-h-[350px] lg:min-h-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {speaker.photo ? (
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <FallbackAvatar name={speaker.name} />
                  )}
                </div>

                <div className="lg:w-3/5 xl:w-2/3 p-8 sm:p-10 lg:p-14 flex flex-col justify-center relative z-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold tracking-widest uppercase w-max mb-6">
                    <Star className="w-3.5 h-3.5" />
                    Keynote Speaker
                  </div>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                    {speaker.title && (
                      <span className="block text-xl sm:text-2xl text-slate-500 dark:text-slate-400 font-bold mb-2">
                        {speaker.title}
                      </span>
                    )}
                    {speaker.name}
                  </h3>

                  <div className="w-16 h-1 bg-blue-500 rounded-full mb-8"></div>

                  <div className="prose prose-lg prose-slate dark:prose-invert max-w-none line-clamp-4 text-slate-600 dark:text-slate-300">
                    {speaker.bio}
                  </div>

                  <button
                    onClick={() =>
                      setSelectedSpeaker({ ...speaker, type: "Keynote" })
                    }
                    className="mt-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 transition-colors w-max"
                  >
                    <Eye className="w-5 h-5" /> View Full Bio
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* INVITED EXPERTS - Vertical Cards Grid */}
        {activeTab === "invited" && (
          <motion.div
            key="invited"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {speakersData.invited.map((speaker, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col group relative"
              >
                <div className="h-64 sm:h-72 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  {speaker.photo ? (
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <FallbackAvatar name={speaker.name} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-xl font-bold text-white leading-tight">
                      {speaker.title && (
                        <span className="block text-blue-300 text-sm font-semibold mb-0.5">
                          {speaker.title}
                        </span>
                      )}
                      {speaker.name}
                    </h4>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 bg-slate-50 dark:bg-slate-800/30">
                  <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-4 flex-1 mb-6">
                    {speaker.bio}
                  </div>
                  <button
                    onClick={() =>
                      setSelectedSpeaker({ ...speaker, type: "Invited Expert" })
                    }
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Eye className="w-4 h-4" /> Full Bio
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* PANELISTS - Horizontal Detailed List */}
        {activeTab === "panelists" && (
          <motion.div
            key="panelists"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-4 max-w-4xl mx-auto"
          >
            {speakersData.panelists.map((speaker, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-5 w-full sm:w-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 shadow-md bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-800">
                    {speaker.photo ? (
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <FallbackAvatar name={speaker.name} />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {speaker.title && (
                        <span className="inline-block text-amber-600 dark:text-amber-500 text-xs font-semibold mr-1">
                          {speaker.title}
                        </span>
                      )}
                      {speaker.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1 max-w-[250px] sm:max-w-xs">
                      {speaker.bio}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedSpeaker({ ...speaker, type: "Panelist" })
                  }
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto justify-center"
                >
                  <Eye className="w-4 h-4" /> View Bio
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* MODERATORS - Minimalist Pill Grid */}
        {activeTab === "moderators" && (
          <motion.div
            key="moderators"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {speakersData.moderators.map((speaker, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 shadow-sm hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-700 ring-4 ring-white dark:ring-slate-900">
                  {speaker.photo ? (
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <FallbackAvatar
                      name={speaker.name}
                      isFemale={speaker.isFemale}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {speaker.title && (
                      <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">
                        {speaker.title}
                      </span>
                    )}
                    {speaker.name}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold leading-snug mb-1">
                    {speaker.role}
                  </p>
                  {speaker.department && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-1">
                      {speaker.department}
                    </p>
                  )}
                  {speaker.college && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-3">
                      {speaker.college}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-left leading-tight break-words whitespace-normal">
                      {speaker.org}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL BIO MODAL */}
      <AnimatePresence>
        {selectedSpeaker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpeaker(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                >
                  <X className="w-5 h-5 text-slate-800 dark:text-white" />
                </button>

                <div className="flex flex-col overflow-y-auto">
                  {/* Image Container - Full display */}
                  <div className="w-full relative bg-slate-100 dark:bg-slate-950 flex justify-center pt-8 pb-4">
                    {selectedSpeaker.photo ? (
                      <img
                        src={selectedSpeaker.photo}
                        alt={selectedSpeaker.name}
                        className="w-full h-auto max-h-[65vh] object-contain drop-shadow-xl"
                      />
                    ) : (
                      <div className="w-full h-80 flex items-center justify-center">
                        <FallbackAvatar
                          name={selectedSpeaker.name}
                          isFemale={selectedSpeaker.isFemale}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content Side (Bottom) */}
                  <div className="w-full p-8 sm:p-10 flex flex-col bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 w-max shadow-sm">
                      {selectedSpeaker.type}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-3">
                      {selectedSpeaker.title && (
                        <span className="text-amber-600 dark:text-amber-500 font-bold mr-2">
                          {selectedSpeaker.title}
                        </span>
                      )}
                      {selectedSpeaker.name}
                    </h2>

                    {selectedSpeaker.credentials && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedSpeaker.credentials
                          .split(",")
                          .map((cred: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-md text-sm font-bold shadow-sm"
                            >
                              {cred.trim()}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* Optional Info display for moderators/panelists if selected from there */}
                    {(selectedSpeaker.role ||
                      selectedSpeaker.department ||
                      selectedSpeaker.college ||
                      selectedSpeaker.org) && (
                      <div className="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                        {selectedSpeaker.role && (
                          <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                            {selectedSpeaker.role}
                          </p>
                        )}
                        {selectedSpeaker.department && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                            {selectedSpeaker.department}
                          </p>
                        )}
                        {selectedSpeaker.college && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                            {selectedSpeaker.college}
                          </p>
                        )}
                        {selectedSpeaker.org && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                            {selectedSpeaker.org}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mt-2">
                      {selectedSpeaker.bio ? (
                        selectedSpeaker.bio
                          .split("\n")
                          .map((paragraph: string, idx: number) => (
                            <p
                              key={idx}
                              className="mb-4 last:mb-0 leading-relaxed"
                            >
                              {paragraph}
                            </p>
                          ))
                      ) : (
                        <p className="italic text-slate-400">
                          Bio coming soon.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
