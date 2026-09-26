import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plane, Train, Car, Navigation, Star, Map, Building, ChevronDown, Compass } from "lucide-react";

export const BookletTab = () => {
  const [activeTransport, setActiveTransport] = useState<string>("Air");

  const transportOptions = [
    { id: "Air", icon: <Plane className="w-5 h-5" />, title: "By Air", desc: "Al-Ahsa International Airport is easily accessible. Alternatively, King Fahd International Airport in Dammam is about a 90-minute drive." },
    { id: "Train", icon: <Train className="w-5 h-5" />, title: "By Train", desc: "Al-Ahsa Railway Station connects major cities like Riyadh and Dammam directly to the region." },
    { id: "Car", icon: <Car className="w-5 h-5" />, title: "By Car", desc: "Ample free parking is available for attendees at the Almoosa Rehabilitation Hospital." },
    { id: "Uber", icon: <Navigation className="w-5 h-5" />, title: "By Uber/Careem", desc: "Dedicated drop-off zones are available at the main hospital entrance." },
  ];

  const hotels = [
    { name: "Al Ahsa InterContinental", stars: 5, distance: "10 mins", price: "$$$$" },
    { name: "Somewhere Hotel Al Ahsa", stars: 5, distance: "8 mins", price: "$$$" },
    { name: "Coral Al Ahsa Hotel", stars: 4, distance: "12 mins", price: "$$$" },
    { name: "Al Muhaidib Residence", stars: 3, distance: "5 mins", price: "$$" }
  ];

  const attractions = [
    { name: "Al Qarah Mountain", desc: "Explore the fascinating natural caves and stunning viewpoints of this iconic mountain.", img: "https://images.unsplash.com/photo-1629815414605-77983c2741d8?auto=format&fit=crop&q=80&w=600" },
    { name: "Al-Ahsa Oasis", desc: "The largest oasis in the world and a UNESCO World Heritage site full of lush palm trees.", img: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=600" },
    { name: "Ibrahim Palace", desc: "A historic fort combining Islamic and military architecture from the Ottoman era.", img: "https://images.unsplash.com/photo-1572093551532-6b94be06225b?auto=format&fit=crop&q=80&w=600" },
    { name: "Qaisariah Souq", desc: "One of the oldest traditional markets in the Kingdom, offering spices, crafts, and heritage.", img: "https://images.unsplash.com/photo-1632349141042-3a56cf9e1d52?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div className="py-12 space-y-24">
      
      {/* WELCOME HEADER */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-2xl h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1610486001099-3665bc751d3b?auto=format&fit=crop&q=80&w=1600" alt="Eastern Province skyline" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90"></div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-4"
          >
            Welcome to Al-Ahsa
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-amber-400 font-light tracking-wide"
          >
            Your guide to the conference city & venue.
          </motion.p>
        </div>
      </section>

      {/* VENUE MAP & GETTING HERE */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Venue Info */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col h-full"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 shrink-0">
            <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">The Venue</h2>
          <h3 className="text-xl font-semibold text-amber-600 dark:text-amber-500 mb-2">Almoosa Rehabilitation Hospital</h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-6">Al-Ahsa, Eastern Province, Saudi Arabia.</p>
          <div className="flex-1 rounded-2xl bg-slate-200 dark:bg-slate-700 w-full overflow-hidden relative min-h-[300px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.840618037648!2d49.574676!3d25.4055268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e37c1d76378e9b1%3A0x6b40e797c27b031b!2sAlmoosa%20Rehabilitation%20Hospital!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </motion.div>

        {/* Getting Here (Accordion) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
            <Map className="w-8 h-8 mr-4 text-amber-500" /> Getting Here
          </h2>
          
          <div className="space-y-4">
            {transportOptions.map((opt) => (
              <div 
                key={opt.id}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${activeTransport === opt.id ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}
              >
                <button 
                  onClick={() => setActiveTransport(activeTransport === opt.id ? "" : opt.id)}
                  className="w-full p-4 sm:p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${activeTransport === opt.id ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      {opt.icon}
                    </div>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">{opt.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeTransport === opt.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeTransport === opt.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 pt-0 ml-14 text-slate-600 dark:text-slate-300">
                        {opt.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* RECOMMENDED HOTELS */}
      <section>
        <div className="mb-10 flex items-center gap-4">
          <Building className="w-8 h-8 text-blue-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Recommended Hotels</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{hotel.name}</h3>
              <div className="flex text-amber-400 mb-4">
                {[...Array(hotel.stars)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="flex justify-between items-center text-sm font-medium border-t border-slate-100 dark:border-slate-700 pt-4 mt-4">
                <span className="text-slate-500 flex items-center"><MapPin className="w-4 h-4 mr-1" /> {hotel.distance}</span>
                <span className="text-green-600 dark:text-green-400 font-bold">{hotel.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPLORE REGION */}
      <section>
        <div className="mb-10 flex items-center gap-4">
          <Compass className="w-8 h-8 text-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Explore Al-Ahsa</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((attr, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={attr.img} alt={attr.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl leading-tight">{attr.name}</h3>
              </div>
              <div className="p-5">
                <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">{attr.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

