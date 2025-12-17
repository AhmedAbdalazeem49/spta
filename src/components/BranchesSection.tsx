import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/hero-1.jpg";

interface Branch {
  id: string;
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  phone: string;
  hours: string;
  hoursAr: string;
  lat: number;
  lng: number;
  city: string;
  cityAr: string;
}

const branches: Branch[] = [
  {
    id: "Tiaba",
    name: "Tiaba Branch",
    nameAr: "فرع طيبة",
    address: "Tiaba Branch",
    addressAr: "فرع طيبة",
    phone: "+966920031660",
    hours: "Sun-Thu: 8:00 AM - 6:00 PM",
    hoursAr: "الأحد-الخميس: 8:00 ص - 6:00 م",
    lat: 24.5534967,
    lng: 46.7964087,
    city: "Riyadh",
    cityAr: "الرياض",
  },
  {
    id: "Jeddah",
    name: "Jeddah Branch",
    nameAr: "فرع جدة",
    address: "Jeddah Branch",
    addressAr: "فرع جدة",
    phone: "+966920031660",
    hours: "Sun-Thu: 8:00 AM - 6:00 PM",
    hoursAr: "الأحد-الخميس: 8:00 ص - 6:00 م",
    lat: 21.7856872,
    lng: 39.2071132,
    city: "Jeddah",
    cityAr: "جدة",
  },
  {
    id: "Badr",
    name: "Badr Branch",
    nameAr: "فرع بدر",
    address: "Badr Branch",
    addressAr: "فرع بدر",
    phone: "+966920031660",
    hours: "Sun-Thu: 8:00 AM - 6:00 PM",
    hoursAr: "الأحد-الخميس: 8:00 ص - 6:00 م",
    lat: 24.5039964,
    lng: 46.7404422,
    city: "الرياض",
    cityAr: "الرياض",
  },
  {
    id: "Tuwaiq",
    name: "Tuwaiq Branch",
    nameAr: "فرع طويق",
    address: "Tuwaiq Branch",
    addressAr: "فرع طويق",
    phone: "+966920031660",
    hours: "Sun-Thu: 8:00 AM - 6:00 PM",
    hoursAr: "الأحد-الخميس: 8:00 ص - 6:00 م",
    lat: 24.5545686,
    lng: 46.5479588,
    city: "الرياض",
    cityAr: "الرياض",
  },
];

const BranchesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeBranch, setActiveBranch] = useState<Branch>(branches[0]);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: activeBranch.lat, lng: activeBranch.lng },
        zoom: 15,
      }
    );

    new window.google.maps.Marker({
      position: { lat: activeBranch.lat, lng: activeBranch.lng },
      map,
      title: language === "ar" ? activeBranch.nameAr : activeBranch.name,
      icon: {
        url: Logo,
        scaledSize: new window.google.maps.Size(40, 40), // resize logo
      },
    });
  }, [activeBranch, language]);

  const handleBranchClick = (branch: Branch) => {
    setActiveBranch(branch);
  };

  const getGoogleMapsEmbedUrl = (branch: Branch) => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.22!2d${branch.lng}!3d${branch.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2ssa!4v1600000000000!5m2!1sen!2ssa`;
  };

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${activeBranch.lat},${activeBranch.lng}`;
    window.open(url, "_blank");
  };

  return (
    <section id="branches" className="section-padding bg-gradient-subtle">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {/* {t("branches.title")} */}
            BRANCH
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            {/* {t("branches.subtitle")} */}
            BRANCH
          </p>
          <div className="w-24 h-1 bg-gradient-premium mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Branch Tabs */}
          <div className="lg:col-span-1" data-aos="fade-right">
            <div className="bg-gradient-card rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {/* {t("branches.selectBranch")} */}
                BRANCH SELECTED
              </h3>
              <div className="space-y-2">
                {branches.map((branch, index) => (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchClick(branch)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      activeBranch.id === branch.id
                        ? "bg-gradient-premium text-white shadow-lg scale-105"
                        : "bg-background/50 hover:bg-primary/10 text-foreground hover:scale-102"
                    }`}
                    // data-aos="fade-up"
                    // data-aos-delay={index * 100}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full m-1 ${
                          activeBranch.id === branch.id
                            ? "bg-white"
                            : "bg-primary"
                        }`}
                      ></div>
                      <div>
                        <div className="font-semibold">
                          {language === "ar" ? branch.nameAr : branch.name}
                        </div>
                        <div className="text-sm opacity-80 text-start">
                          {language === "ar" ? branch.cityAr : branch.city}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map and Branch Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-lg group"
              data-aos="fade-left"
            >
              <div
                id="map"
                // src={getGoogleMapsEmbedUrl(activeBranch)}
                // width="100%"
                // height="400"
                // style={{ border: 0, minHeight: "400px" }}
                // allowFullScreen
                // loading="lazy"
                // referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] transition-all duration-500 group-hover:scale-105  relative  rounded-2xl overflow-hidden shadow-lg"
                data-aos="fade-left"
                title={`Map of ${
                  language === "ar" ? activeBranch.nameAr : activeBranch.name
                }`}
              />
              {/* Map Overlay Controls */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <Button
                  onClick={handleGetDirections}
                  size="sm"
                  className="bg-gradient-premium hover:opacity-90 transition-all duration-300 hover:scale-105"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {/* {t("branches.getDirections")} */}
                  DIRECTION
                </Button>
              </div>
              {/* Decorative Elements */}
              <div className="absolute bottom-4 left-4 bg-gradient-premium/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                <span className="text-white text-sm font-semibold">
                  {language === "ar" ? activeBranch.cityAr : activeBranch.city}
                </span>
              </div>
            </div>

            {/* Branch Information */}
            <div
              className="bg-gradient-card rounded-2xl p-6 shadow-lg"
              data-aos="fade-up"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {language === "ar" ? activeBranch.nameAr : activeBranch.name}
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary m-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        {/* {t("branches.address")} */}
                        ADDRESS
                      </div>
                      <div className="text-muted-foreground">
                        {language === "ar"
                          ? activeBranch.addressAr
                          : activeBranch.address}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary m-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        {/* {t("branches.phone")} */}
                        PHONe NUmber
                      </div>
                      <div className="text-muted-foreground">
                        {activeBranch.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary m-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">
                        {/* {t("branches.hours")} */}
                        HOURS
                      </div>
                      <div className="text-muted-foreground">
                        {language === "ar"
                          ? activeBranch.hoursAr
                          : activeBranch.hours}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() =>
                      window.open(`tel:${activeBranch.phone}`, "_self")
                    }
                    className="w-full bg-foreground hover:opacity-90"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    {/* {t("branches.callBranch")} */}
                    call US
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSection;
