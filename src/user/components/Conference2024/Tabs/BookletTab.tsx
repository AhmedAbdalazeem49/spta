import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  Car,
  ChevronDown,
  Clock,
  ExternalLink,
  Globe,
  Hotel,
  Landmark,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Mountain,
  Navigation,
  Phone,
  Plane,
  Shirt,
  ShoppingBag,
  Star,
  Sun,
  TrainFront,
  TreePine,
  Umbrella,
  Waves,
} from "lucide-react";
import React, { useState } from "react";

interface AccordionItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

const AccordionItem = ({
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
  accentColor = "blue",
}: AccordionItemProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const colorMap: Record<string, string> = {
    blue: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
    green: "border-[#55AE47] bg-[#55AE47]/5 text-[#55AE47]",
    amber: "border-[#55AE47] bg-[#55AE47]/5 text-[#55AE47]",
    purple: "border-[#6FC4BC] bg-[#6FC4BC]/5 text-[#6FC4BC]",
    rose: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
    teal: "border-[#6FC4BC] bg-[#6FC4BC]/5 text-[#6FC4BC]",
    indigo: "border-[#11517E] bg-[#11517E]/5 text-[#11517E]",
  };
  const accent = colorMap[accentColor] || colorMap["blue"];

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden transition-shadow ${open ? "shadow-md" : "shadow-sm"} ${accent.split(" ")[0]} bg-white`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left"
      >
        <div className={`p-2.5 rounded-xl shrink-0 ${accent}`}>{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#11517E] text-lg leading-tight">
            {title}
          </div>
          {subtitle && (
            <div className="text-sm text-[#11517E]/60 mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-[#6FC4BC]"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-slate-100  pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}
const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-[#11517E]/8 last:border-0">
    <span className="text-sm font-bold text-[#11517E]/60 sm:w-40 shrink-0">
      {label}
    </span>
    <span className="text-slate-700 font-medium flex-1">
      {value}
    </span>
  </div>
);

const MapLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-[#11517E] font-semibold hover:underline text-sm"
  >
    <MapPin className="w-3.5 h-3.5 shrink-0" />
    {label}
    <ExternalLink className="w-3 h-3 opacity-60" />
  </a>
);

export const BookletTab = () => {
  const travelOptions = [
    {
      icon: <Plane className="w-5 h-5" />,
      label: "Al Ahsa International Airport (HOF)",
      desc: "The closest airport to the conference venue. Flight routes may be limited, so check availability before booking.",
      color: "blue",
    },
    {
      icon: <Plane className="w-5 h-5" />,
      label: "King Fahd International Airport, Dammam (DMM)",
      desc: "The main alternative for domestic and international flights. Travel to Al Ahsa by car usually takes around 1.5–2 hours.",
      color: "indigo",
    },
    {
      icon: <TrainFront className="w-5 h-5" />,
      label: "By Train (SAR)",
      desc: "Saudi Arabia Railways connects Hofuf with Riyadh and Dammam. Select Hofuf as the destination and book early.",
      link: { href: "https://www.sar.com.sa/", label: "SAR Website" },
      color: "green",
    },
    {
      icon: <Car className="w-5 h-5" />,
      label: "By Bus or Car",
      desc: "Al Ahsa is accessible by road from Dammam, Khobar, Riyadh, and other Saudi cities. Request the exact venue map pin and parking instructions before arrival.",
      color: "amber",
    },
  ];

  const hotels = [
    {
      name: "Al Ahsa InterContinental",
      area: "Al Malik Khaled Street, Hofuf",
      link: "https://maps.app.goo.gl/i14gcD8cvxE3BqWS7",
      stars: 5,
    },
    {
      name: "Al Ahsa Grand Lili Hotel",
      area: "Dhahran Street, Al-Mubarraz district",
      link: "https://maps.app.goo.gl/TAWRXA3z97eNCrjA9",
      stars: 4,
    },
    {
      name: "Somewhere Hotel Al Ahsa",
      area: "King Saud Rd, Al Mubarraz",
      link: "https://maps.app.goo.gl/WwEULK4TWfEPh3qC7",
      stars: 4,
    },
  ];

  const places = [
    {
      icon: <Mountain className="w-5 h-5" />,
      name: "Al Qarah Mountain",
      desc: "Rock formations, caves, and views of the oasis landscape.",
      link: "https://maps.app.goo.gl/2YccD2kdkwnEaZB98",
      color: "amber",
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      name: "Al Qaisariyah Souq",
      desc: "Traditional market for dates, crafts, perfumes, spices, and souvenirs.",
      link: "https://maps.app.goo.gl/FCKAHFnYLwUa5TQ47",
      color: "rose",
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      name: "Qasr Ibrahim",
      desc: "Historic architecture and an important Al Ahsa landmark.",
      link: "https://maps.app.goo.gl/Ms4pi6rQZdNWvU8v9",
      color: "purple",
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      name: "Handcraft Castle",
      desc: "A vibrant testament to Saudi Arabia's artisanal legacy.",
      link: "https://maps.app.goo.gl/RrZ5N5wELp5Ws7Cd7",
      color: "teal",
    },
    {
      icon: <TreePine className="w-5 h-5" />,
      name: "Al Ahsa Oasis",
      desc: "Palm groves and the cultural landscape recognized by UNESCO.",
      link: null,
      color: "green",
    },
    {
      icon: <Waves className="w-5 h-5" />,
      name: "Al Asfar Lake",
      desc: "One of the largest natural water bodies in the Gulf.",
      link: "https://maps.app.goo.gl/9qJWrjHi3qReXb2TA",
      color: "blue",
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      name: "Jawatha",
      desc: "Historic mosque area and nearby recreational park.",
      link: "https://maps.app.goo.gl/Rdoj38txNz5FWEK828",
      color: "indigo",
    },
  ];

  const venueItems = [
    "Main entrance",
    "Registration desk (Attendee)",
    "Sheikh Hussein bin Abdulrahman Al-Mousa Conference Hall – 15th floor",
    "Exhibition area",
    "E-poster area",
    "Prayer rooms (First Floor)",
    "Elevators and accessible routes",
    "Emergency exits",
    "Parking areas",
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-[#11517E]/10 text-[#11517E]",
    indigo: "bg-[#11517E]/10 text-[#11517E]",
    green: "bg-[#55AE47]/10 text-[#55AE47]",
    amber: "bg-[#55AE47]/10 text-[#55AE47]",
    rose: "bg-[#11517E]/10 text-[#11517E]",
    purple: "bg-[#6FC4BC]/10 text-[#6FC4BC]",
    teal: "bg-[#6FC4BC]/10 text-[#6FC4BC]",
  };

  return (
    <div className="w-full pb-16 space-y-8">
      {/* Section Title */}
      <div className="mb-2">
        <h3 className="text-4xl font-black text-[#11517E] mb-3">
          Visitor Information
        </h3>
        <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full"></div>
      </div>

      {/* ACCORDION SECTIONS */}
      <div className="space-y-4">
        {/* Venue */}
        <AccordionItem
          icon={<Building2 className="w-5 h-5" />}
          title="Conference Venue"
          subtitle="Almoosa Rehabilitation Hospital, Al Ahsa"
          defaultOpen
          accentColor="blue"
        >
          <div className="space-y-4">
            <InfoRow
              label="Full Address"
              value={
                <MapLink
                  href="https://maps.app.goo.gl/nusDsrQV47NfdskRA"
                  label="Dhahran Rd, Al Shuqaiq, Almutayrifi 36322, Al Ahsa, Eastern Province"
                />
              }
            />
            <InfoRow
              label="Parking"
              value={
                <MapLink
                  href="https://maps.app.goo.gl/38wAFss9FECWdHwN8"
                  label="Parking Location"
                />
              }
            />
          </div>
        </AccordionItem>

        {/* Welcome to Al Ahsa */}
        <AccordionItem
          icon={<TreePine className="w-5 h-5" />}
          title="Welcome to Al Ahsa"
          subtitle="UNESCO World Heritage Oasis"
          accentColor="green"
        >
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">
              Al Ahsa is a historic oasis in Saudi Arabia's Eastern Province. It
              is known for its palm groves, traditional markets, historic
              buildings, and Al Qarah Mountain. Al Ahsa Oasis has been a{" "}
              <strong>UNESCO World Heritage Site since 2018</strong> and
              includes more than 2.5 million date palms.
            </p>
            <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/40 rounded-xl p-4">
              <TreePine className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
              <span className="text-green-800 dark:text-green-300 font-semibold text-sm">
                2.5 million+ date palms — a natural wonder recognized worldwide
              </span>
            </div>
          </div>
        </AccordionItem>

        {/* How to Reach */}
        <AccordionItem
          icon={<Navigation className="w-5 h-5" />}
          title="How to Reach Al Ahsa"
          subtitle="Airports, Train, Car & Bus"
          accentColor="blue"
        >
          <div className="space-y-3">
            {travelOptions.map((opt, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-xl p-4 border ${opt.color === "blue" ? "bg-[#f0f8f8] dark:bg-[#11517E]/20 border-blue-100 dark:border-blue-800/30" : opt.color === "indigo" ? "bg-[#f0f8f8] dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/30" : opt.color === "green" ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30" : "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/30"}`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${colorMap[opt.color] || colorMap["blue"]}`}
                >
                  {opt.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900  mb-1">
                    {opt.label}
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {opt.desc}
                  </div>
                  {opt.link && (
                    <div className="mt-2">
                      <a
                        href={opt.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-[#11517E] dark:text-[#6FC4BC] font-semibold hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {opt.link.label}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 bg-slate-50 /50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
              <Car className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-600 font-medium">
                <strong className="text-slate-800 dark:text-slate-200">
                  Within Al Ahsa:
                </strong>{" "}
                Hafilat Al-Ahsa, taxis, and ride-hailing services are available.
              </span>
            </div>
          </div>
        </AccordionItem>

        {/* Hotels */}
        <AccordionItem
          icon={<Hotel className="w-5 h-5" />}
          title="Recommended Hotels"
          subtitle="Nearby accommodation options"
          accentColor="purple"
        >
          <div className="space-y-3">
            {hotels.map((hotel, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 rounded-xl p-4"
              >
                <div className="p-2.5 bg-purple-100 dark:bg-purple-900/40 rounded-xl text-purple-600 dark:text-purple-400 shrink-0">
                  <Hotel className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 ">
                    {hotel.name}
                  </div>
                  <div className="text-sm text-slate-500 mt-0.5 mb-2">
                    {hotel.area}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-0.5">
                      {Array.from({ length: hotel.stars }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <MapLink href={hotel.link} label="View on Maps" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Places to Visit */}
        <AccordionItem
          icon={<Mountain className="w-5 h-5" />}
          title="Places to Visit"
          subtitle="Explore Al Ahsa's hidden gems"
          accentColor="amber"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {places.map((place, i) => (
              <div
                key={i}
                className={`rounded-xl p-4 border ${colorMap[place.color] ? "border-current/10" : ""} bg-slate-50 /50 border-slate-100 dark:border-slate-700`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-xl shrink-0 ${colorMap[place.color] || "bg-slate-100 text-slate-600"}`}
                  >
                    {place.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900  text-sm">
                      {place.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {place.desc}
                    </div>
                    {place.link && (
                      <div className="mt-2">
                        <MapLink href={place.link} label="View on Maps" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <span className="text-xs text-amber-700 dark:text-amber-300 font-medium">
              Opening hours and entry arrangements may change. Check before
              visiting, especially on Fridays.
            </span>
          </div>
        </AccordionItem>

        {/* Useful Info */}
        <AccordionItem
          icon={<AlertCircle className="w-5 h-5" />}
          title="More Information"
          subtitle="Weather, dress code & language"
          accentColor="teal"
        >
          <div className="space-y-3">
            {[
              {
                icon: <Sun className="w-5 h-5" />,
                label: "Weather",
                text: "November is usually warm during the day and cooler in the evening. Bring light clothing, a light jacket, and comfortable shoes.",
                color: "amber",
              },
              {
                icon: <Shirt className="w-5 h-5" />,
                label: "Dress Code",
                text: "Business or smart-casual clothing is suitable for the conference. Modest clothing is recommended in public places.",
                color: "purple",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                label: "Language",
                text: "Arabic is the official language. English is commonly used in hotels, airports, and healthcare settings.",
                color: "blue",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 rounded-xl p-4 border bg-slate-50 /50 border-slate-100 dark:border-slate-700`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${colorMap[item.color] || colorMap["blue"]}`}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="font-bold text-slate-900  mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>
      </div>
    </div>
  );
};
