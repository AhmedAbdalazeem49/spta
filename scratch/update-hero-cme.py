import codecs

with codecs.open('src/user/components/Conference2024/HeroSection.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Make sure we add 'Award' to the lucide-react imports
if 'Award' not in content:
    content = content.replace('Calendar, MapPin, Sparkles', 'Calendar, MapPin, Sparkles, Award')

cme_html = '''          </div>

          {/* ─── CME HOURS BLOCK ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto mb-16 relative group"
          >
            {/* Glow effect behind the cards */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl opacity-70"></div>
            
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-lg shadow-orange-500/20 text-white">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 text-center">
                  Continuing Medical Education (CME)
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Conference CME */}
                <div className="bg-black/20 border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:bg-black/30 transition-colors">
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 mb-2">13</div>
                  <div className="text-lg font-bold text-white mb-1">CME Hours</div>
                  <div className="text-sm text-slate-300 font-medium">Conference Only</div>
                  <div className="text-xs text-slate-400 mt-1">12 - 13 Nov 2026</div>
                </div>

                {/* Workshops CME */}
                <div className="bg-black/20 border border-white/10 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:bg-black/30 transition-colors">
                  <div className="text-4xl sm:text-5xl font-black text-orange-400 mb-2">40</div>
                  <div className="text-lg font-bold text-white mb-1">CME Hours</div>
                  <div className="text-sm text-slate-300 font-medium">Workshops Only</div>
                  <div className="text-xs text-slate-400 mt-1">14 Nov 2026</div>
                </div>

                {/* Total CME */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-5 text-center flex flex-col items-center justify-center hover:from-white/15 hover:to-white/10 transition-colors shadow-lg shadow-black/20 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-500/30 rounded-full blur-xl"></div>
                  <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-amber-500/30 rounded-full blur-xl"></div>
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-300 to-rose-400 mb-2 drop-shadow-md relative z-10">
                    53
                  </div>
                  <div className="text-lg font-bold text-white mb-1 relative z-10">CME Hours</div>
                  <div className="text-sm text-slate-200 font-medium relative z-10">Conference + Workshops</div>
                  <div className="text-xs text-slate-300 mt-1 relative z-10">12 - 14 Nov 2026</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ones Image */}'''

content = content.replace('''          </div>

          {/* Ones Image */}''', cme_html)

with codecs.open('src/user/components/Conference2024/HeroSection.tsx', 'w', 'utf-8') as f:
    f.write(content)
