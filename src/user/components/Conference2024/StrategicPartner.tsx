import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import Almossa from "@/assets/almossa.png";

export const StrategicPartner = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section className="py-32 bg-gray-900 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <div className="w-16 h-16 rounded-full border-t-2 border-r-2 border-blue-400"></div>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
            Strategic Partner
          </h2>
          <div className="w-40 h-2 bg-gradient-to-r from-blue-400 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            style={{ y, scale }}
            className="group relative bg-gray-800/50 backdrop-blur-3xl p-6 sm:p-10 md:p-16 rounded-2xl md:rounded-[3rem] shadow-2xl shadow-blue-900/40 border border-gray-700 w-full max-w-4xl flex flex-col items-center justify-center cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-white rounded-full flex items-center justify-center mb-12 shadow-[0_0_100px_rgba(59,130,246,0.3)] border-8 border-gray-800 transition-all duration-700 overflow-hidden"
            >
              <img
                src={Almossa}
                alt="Almoosa Health Group"
                className="w-full h-full object-contain p-8"
              />

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-indigo-500 p-4 rounded-full shadow-2xl">
                <Award className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Almoosa Health Group
            </h3>
            <p className="text-gray-400 text-center text-xl md:text-2xl leading-relaxed max-w-2xl">
              Driving the future of physiotherapy and healthcare in Saudi Arabia
              through innovation, leadership, and excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
