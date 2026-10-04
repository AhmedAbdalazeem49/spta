import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Extract imports and data
data_match = re.search(r'(import .*?)(?=export const SpeakersTab)', content, re.DOTALL)
if not data_match:
    print("Could not find data!")
    exit(1)

imports_and_data = data_match.group(1)

new_component = '''export const SpeakersTab = () => {
  const [activeTab, setActiveTab] = useState("keynote");
  const [selectedSpeaker, setSelectedSpeaker] = useState<any>(null);

  const tabs = [
    { id: "keynote", label: "Keynote Speakers", icon: <Star className="w-4 h-4" /> },
    { id: "invited", label: "Invited Experts", icon: <Award className="w-4 h-4" /> },
    { id: "panelists", label: "Panelists", icon: <Users className="w-4 h-4" /> },
    { id: "moderators", label: "Moderators", icon: <Mic className="w-4 h-4" /> },
  ];

  const getActiveSpeakers = () => {
    return speakers[activeTab as keyof typeof speakers] || [];
  };

  return (
    <div className="py-4 md:py-8 w-full max-w-[1400px] mx-auto relative">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
          Conference <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Speakers</span>
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
      </div>

      {/* INTERNAL TABS */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105 border border-amber-400/50"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* SPEAKERS GRID */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {getActiveSpeakers().map((speaker: any, i: number) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedSpeaker(speaker)}
              className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col h-full relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
              
              <div className="flex items-center gap-5 relative z-10 mb-5">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-600 group-hover:border-amber-400/50 transition-colors bg-slate-900">
                  {speaker.photo ? (
                    <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover" />
                  ) : (
                    <FallbackAvatar name={speaker.name} isFemale={speaker.isFemale} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1 group-hover:text-amber-400 transition-colors">
                    {speaker.title && <span className="mr-1.5">{speaker.title}</span>}
                    {speaker.name}
                  </h3>
                  {speaker.role ? (
                    <p className="text-sm text-amber-400 font-semibold">{speaker.role}</p>
                  ) : speaker.type ? (
                    <p className="text-sm text-amber-400 font-semibold">{speaker.type}</p>
                  ) : null}
                  {speaker.affiliation && (
                    <p className="text-xs text-slate-400 mt-1">{speaker.affiliation}</p>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3 relative z-10">
                  {speaker.bio || "Biography details..."}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border bg-amber-500/10 text-amber-300 border-amber-500/20 uppercase tracking-wider">
                   {tabs.find(t => t.id === activeTab)?.label}
                </div>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Bio <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* FULL BIO MODAL */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpeaker(null)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 w-full max-w-3xl rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] border border-slate-800"
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 to-orange-600 z-10"></div>
              
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col overflow-y-auto">
                <div className="w-full p-8 sm:p-10 flex flex-col md:flex-row gap-8">
                  <div className="w-40 h-40 shrink-0 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950 mx-auto md:mx-0">
                    {selectedSpeaker.photo ? (
                      <img src={selectedSpeaker.photo} alt={selectedSpeaker.name} className="w-full h-full object-cover" />
                    ) : (
                      <FallbackAvatar name={selectedSpeaker.name} isFemale={selectedSpeaker.isFemale} />
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-4">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-2">
                      {selectedSpeaker.title && <span className="mr-2">{selectedSpeaker.title}</span>}
                      {selectedSpeaker.name}
                    </h2>

                    {(selectedSpeaker.role || selectedSpeaker.department || selectedSpeaker.college) && (
                      <div className="text-slate-300 font-medium mb-4">
                        {selectedSpeaker.role && <span className="block text-amber-400">{selectedSpeaker.role}</span>}
                        {selectedSpeaker.department && <span className="block">{selectedSpeaker.department}</span>}
                        {selectedSpeaker.college && <span className="block text-sm">{selectedSpeaker.college}</span>}
                      </div>
                    )}

                    {selectedSpeaker.credentials && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        {selectedSpeaker.credentials.split(",").map((cred: string, idx: number) => (
                          <span key={idx} className="bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1 rounded-md text-xs font-bold">
                            {cred.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="px-8 sm:px-10 pb-10">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                     Full Biography
                  </h4>
                  <div className="prose prose-lg prose-invert max-w-none text-slate-300">
                    {selectedSpeaker.bio ? (
                      selectedSpeaker.bio.split("\\n").map((paragraph: string, idx: number) => (
                        <p key={idx} className="mb-4 last:mb-0 leading-relaxed text-sm sm:text-base">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="italic text-slate-500">Biography details coming soon.</p>
                    )}
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
'''

# Update imports slightly if needed
if 'ArrowRight' not in imports_and_data:
    imports_and_data = imports_and_data.replace('X } from "lucide-react";', 'X, ArrowRight } from "lucide-react";')

final_content = imports_and_data + new_component

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(final_content)
