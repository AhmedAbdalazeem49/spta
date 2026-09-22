import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, User, Mail, Phone, Building, Key, CreditCard, X } from "lucide-react";

export const RegistrationTab = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [type, setType] = useState("student");
  const [showPricing, setShowPricing] = useState(false);
  
  const morningWorkshops = [
    'Clinical Reasoning in Cervicothoracic Disorders',
    'Speaking Up in Elite Sport',
    'From Rehabilitation to Performance: Integrating OPT',
    'Physiotherapy in Chronic Overlapping Pain Conditions',
    'A Practical Approach to Acute Vertigo and BPPV'
  ];

  const afternoonWorkshops = [
    'Aquatic Therapy Beyond the Pool',
    'Using Musculoskeletal Ultrasound',
    'From Physical Stimuli to Biological Adaptation',
    'Better Teams, Better Care',
    'From Risk to Readiness'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClasses = "w-full pl-14 pr-4 py-3 md:py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all dark:text-white font-medium text-lg shadow-sm";
  const iconClasses = "absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none";

  return (
    <div className="w-full h-full min-h-[70vh] flex flex-col pb-10 pt-12 relative">
      <div className="text-center mb-10 flex flex-col items-center">
        <h3 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400 mb-6">
          Conference Registration
        </h3>
        
        <button 
          onClick={() => setShowPricing(true)}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-1"
        >
          <CreditCard className="w-5 h-5" /> View Pricing & Fees
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center w-full mt-6">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(10px)" }}
              onSubmit={handleSubmit}
              className="w-full bg-white dark:bg-slate-900/90 backdrop-blur-xl p-8 md:p-14 lg:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/80"
            >
              <div className="flex justify-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => setType('student')}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${type === 'student' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setType('professional')}
                  className={`px-8 py-3 rounded-full font-bold transition-all ${type === 'professional' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}
                >
                  Professional
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Title *</label>
                  <select required className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white focus:border-blue-500 outline-none text-lg">
                    <option value="">Select Title</option>
                    <option value="Prof">Prof</option>
                    <option value="Dr">Dr</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                  </select>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">First Name *</label>
                  <div className="relative">
                    <User className={iconClasses} />
                    <input required type="text" placeholder="First Name" className={inputClasses} />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Last Name *</label>
                  <div className="relative">
                    <User className={iconClasses} />
                    <input required type="text" placeholder="Last Name" className={inputClasses} />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Email Address *</label>
                  <div className="relative">
                    <Mail className={iconClasses} />
                    <input required type="email" placeholder="Email" className={inputClasses} />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className={iconClasses} />
                    <input required type="tel" placeholder="Phone" className={inputClasses} />
                  </div>
                </div>

                <div className="space-y-3 relative group">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Organization/Affiliate *</label>
                  <div className="relative">
                    <Building className={iconClasses} />
                    <input required type="text" placeholder="Organization" className={inputClasses} />
                  </div>
                </div>

                {type === 'professional' && (
                  <div className="space-y-3 relative group md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">SCFHS Classification Number *</label>
                    <div className="relative">
                      <Key className={iconClasses} />
                      <input required type="text" placeholder="Professional Classification ID" className={inputClasses} />
                    </div>
                  </div>
                )}

                <div className="space-y-3 relative group md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Morning Workshop (Optional, max 1)</label>
                  <select className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white focus:border-blue-500 outline-none text-lg">
                    <option value="">Select Morning Workshop</option>
                    {morningWorkshops.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                <div className="space-y-3 relative group md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 mx-2">Afternoon Workshop (Optional, max 1)</label>
                  <select className="w-full px-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 focus:bg-white focus:border-blue-500 outline-none text-lg">
                    <option value="">Select Afternoon Workshop</option>
                    {afternoonWorkshops.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full md:w-auto min-w-[300px] mx-auto py-5 px-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-black text-xl shadow-lg flex items-center justify-center gap-3"
              >
                <span>Confirm Registration</span>
                <Check className="w-6 h-6" />
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/80 dark:bg-slate-900/80 p-16 rounded-[3rem] shadow-2xl border-4 border-white dark:border-slate-800/80 w-full flex flex-col items-center min-h-[500px] justify-center"
            >
              <div className="w-32 h-32 bg-green-400 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-500/50">
                <Check className="w-16 h-16 text-white" />
              </div>
              <h4 className="text-4xl font-black mb-4 text-slate-900 dark:text-white">Registration Successful!</h4>
              <p className="text-xl text-slate-600 dark:text-slate-400">We have received your request and will contact you shortly with payment details.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PRICING MODAL */}
      <AnimatePresence>
        {showPricing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPricing(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl mx-2 sm:mx-4 max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="sticky top-0 bg-white dark:bg-slate-900 z-20 px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <CreditCard className="text-amber-500" /> Pricing & Fees
                </h2>
                <button 
                  onClick={() => setShowPricing(false)}
                  className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-6 h-6 text-slate-500" />
                </button>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Conference Pricing */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" /> Conference Pass
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Students</h4>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-600 dark:text-slate-400">Early Bird</span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">300 SAR</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-600 dark:text-slate-400">Regular</span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">350 SAR</span>
                        </div>
                        <div className="mt-4 inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                          50% OFF for SPTA Members
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Professionals</h4>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-600 dark:text-slate-400">Early Bird</span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">600 SAR</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-600 dark:text-slate-400">Regular</span>
                          <span className="font-bold text-lg text-slate-900 dark:text-white">650 SAR</span>
                        </div>
                        <div className="mt-4 inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                          50% OFF for SPTA Members
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workshop Pricing */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-500 mb-6 flex items-center gap-2">
                      <Sparkles className="w-6 h-6" /> Workshop Pass
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 bg-white dark:bg-slate-800 p-3 rounded-lg">
                      Note: Maximum 2 workshops per attendee (1 morning + 1 afternoon). No SPTA member discounts apply to workshops.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Students</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">Per Workshop</span>
                          <span className="font-bold text-2xl text-slate-900 dark:text-white">200 SAR</span>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm">
                        <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-4">Professionals</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 dark:text-slate-400">Per Workshop</span>
                          <span className="font-bold text-2xl text-slate-900 dark:text-white">300 SAR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-slate-500 dark:text-slate-400 text-sm">
                  Prices are inclusive of VAT where applicable. For group registrations, please contact support.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
