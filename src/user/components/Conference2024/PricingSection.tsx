import React from "react";
import { motion } from "framer-motion";
import { Check, Info, Ticket } from "lucide-react";

export const PricingSection = () => {
  const PricingCard = ({ 
    title, 
    type, 
    early, 
    regular, 
    discount, 
    notes,
    featured = false 
  }: {
    title: string;
    type: string;
    early: string;
    regular: string;
    discount: string;
    notes: string;
    featured?: boolean;
  }) => (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative p-8 rounded-[2rem] border-2 transition-all duration-300 flex flex-col h-full bg-white dark:bg-gray-900 ${
        featured 
          ? "border-[#11517E] shadow-2xl shadow-blue-500/20" 
          : "border-gray-200 dark:border-gray-800 shadow-xl"
      }`}
    >
      {featured && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white font-bold rounded-full text-sm whitespace-nowrap shadow-lg">
          Most Popular
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">{title}</h3>
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${type === 'Conference' ? 'bg-[#e0f2f1] text-[#11517E]' : 'bg-orange-100 text-orange-700'}`}>
            {type}
          </span>
        </div>
        <Ticket className={`w-10 h-10 ${type === 'Conference' ? 'text-[#11517E]' : 'text-orange-500'} opacity-20`} />
      </div>

      <div className="space-y-6 flex-1">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">Early Bird</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-gray-900 dark:text-white">{early}</span>
              <span className="text-gray-500 font-bold">SAR</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end border-t border-gray-100 dark:border-gray-800 pt-4">
          <div>
            <p className="text-sm text-gray-500 font-semibold mb-1">Regular</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">{regular}</span>
              <span className="text-gray-500 font-medium text-sm">SAR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
          <span className="text-gray-700 dark:text-gray-300 font-medium">{discount}</span>
        </div>
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#11517E] shrink-0 mt-0.5" />
          <span className="text-gray-600 dark:text-gray-400 text-sm">{notes}</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0f1c]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the right ticket for you. Early bird rates available for a limited time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PricingCard
            title="Students & Interns"
            type="Conference"
            early="300"
            regular="350"
            discount="50% off for SPTA Members"
            notes="Full access to all conference sessions and exhibition area."
          />
          <PricingCard
            title="Professionals"
            type="Conference"
            early="600"
            regular="650"
            discount="50% off for SPTA Members"
            notes="Full access to all conference sessions and exhibition area."
            featured={true}
          />
          <PricingCard
            title="Students & Interns"
            type="Workshop"
            early="200"
            regular="200"
            discount="No SPTA Member discount"
            notes="Maximum 2 workshops allowed per attendee."
          />
          <PricingCard
            title="Professionals"
            type="Workshop"
            early="300"
            regular="300"
            discount="No SPTA Member discount"
            notes="Maximum 2 workshops allowed per attendee."
          />
        </div>
      </div>
    </section>
  );
};
