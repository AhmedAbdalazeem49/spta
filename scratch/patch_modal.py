import codecs

# ===== PATCH SpeakersTab.tsx - FULL BIO MODAL =====
with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

old_modal = '''      {/* FULL BIO MODAL */}
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
                <X className="w-5 h-5 text-slate-900" />
              </button>

              <div className="flex flex-col overflow-y-auto">
                <div className="w-full p-8 sm:p-10 flex flex-col md:flex-row gap-8">
                  <div className="w-40 h-40 shrink-0 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-950 mx-auto md:mx-0">
                    {selectedSpeaker.photo ? (
                      <img
                        src={selectedSpeaker.photo}
                        alt={selectedSpeaker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FallbackAvatar
                        name={selectedSpeaker.name}
                        isFemale={selectedSpeaker.isFemale}
                      />
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-[#55AE47] border border-amber-500/20 text-xs font-bold uppercase tracking-wider mb-4">
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-2">
                      {selectedSpeaker.title && (
                        <span className="mr-2">{selectedSpeaker.title}</span>
                      )}
                      {selectedSpeaker.name}
                    </h2>

                    {(selectedSpeaker.role ||
                      selectedSpeaker.department ||
                      selectedSpeaker.college ||
                      selectedSpeaker.affiliation ||
                      selectedSpeaker.org) && (
                      <div className="text-slate-600 font-medium mb-4">
                        {selectedSpeaker.role && (
                          <span className="block text-[#55AE47]">
                            {selectedSpeaker.role}
                          </span>
                        )}
                        {selectedSpeaker.department && (
                          <span className="block">
                            {selectedSpeaker.department}
                          </span>
                        )}
                        {selectedSpeaker.college && (
                          <span className="block text-sm">
                            {selectedSpeaker.college}
                          </span>
                        )}
                        {selectedSpeaker.affiliation && (
                          <span className="block text-sm text-slate-500 mt-1">
                            {selectedSpeaker.affiliation}
                          </span>
                        )}
                        {selectedSpeaker.org && (
                          <span className="block text-sm text-slate-500">
                            {selectedSpeaker.org}
                          </span>
                        )}
                      </div>
                    )}

                    {selectedSpeaker.credentials && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                        {selectedSpeaker.credentials
                          .split(",")
                          .map((cred: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-md text-xs font-bold"
                            >
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
                  <div className="prose prose-lg prose-invert max-w-none text-slate-600">
                    {selectedSpeaker.bio ? (
                      selectedSpeaker.bio
                        .split("\\n")
                        .map((paragraph: string, idx: number) => (
                          <p
                            key={idx}
                            className="mb-4 last:mb-0 leading-relaxed text-sm sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))
                    ) : (
                      <p className="italic text-slate-500"></p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>'''

new_modal = '''      {/* FULL BIO MODAL */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSpeaker(null)}
            className="fixed inset-0 bg-[#11517E]/70 backdrop-blur-sm z-[200] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] border border-[#11517E]/10"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#11517E] via-[#6FC4BC] to-[#55AE47] z-10"></div>

              {/* Close button */}
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 bg-[#11517E]/10 hover:bg-[#11517E]/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-[#11517E]" />
              </button>

              <div className="flex flex-col overflow-y-auto">
                {/* Header */}
                <div className="w-full p-8 sm:p-10 flex flex-col md:flex-row gap-8 border-b border-slate-100">
                  {/* Photo */}
                  <div className="w-36 h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-[#6FC4BC]/30 shadow-md mx-auto md:mx-0">
                    {selectedSpeaker.photo ? (
                      <img
                        src={selectedSpeaker.photo}
                        alt={selectedSpeaker.name}
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <FallbackAvatar
                        name={selectedSpeaker.name}
                        isFemale={selectedSpeaker.isFemale}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Category badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#11517E]/8 text-[#11517E] border border-[#11517E]/15 text-xs font-bold uppercase tracking-wider mb-3">
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl sm:text-3xl font-black text-[#11517E] leading-tight mb-2">
                      {selectedSpeaker.title && (
                        <span className="mr-2">{selectedSpeaker.title}</span>
                      )}
                      {selectedSpeaker.name}
                    </h2>

                    {/* Role / Affiliation */}
                    {(selectedSpeaker.role ||
                      selectedSpeaker.department ||
                      selectedSpeaker.college ||
                      selectedSpeaker.affiliation ||
                      selectedSpeaker.org) && (
                      <div className="font-medium mb-4 space-y-0.5">
                        {selectedSpeaker.role && (
                          <span className="block text-[#55AE47] font-semibold">
                            {selectedSpeaker.role}
                          </span>
                        )}
                        {selectedSpeaker.department && (
                          <span className="block text-slate-700">
                            {selectedSpeaker.department}
                          </span>
                        )}
                        {selectedSpeaker.college && (
                          <span className="block text-sm text-slate-600">
                            {selectedSpeaker.college}
                          </span>
                        )}
                        {selectedSpeaker.affiliation && (
                          <span className="block text-sm text-slate-500 mt-1">
                            {selectedSpeaker.affiliation}
                          </span>
                        )}
                        {selectedSpeaker.org && (
                          <span className="block text-sm text-slate-500">
                            {selectedSpeaker.org}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Credentials */}
                    {selectedSpeaker.credentials && (
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                        {selectedSpeaker.credentials
                          .split(",")
                          .map((cred: string, idx: number) => (
                            <span
                              key={idx}
                              className="bg-[#6FC4BC]/10 border border-[#6FC4BC]/30 text-[#11517E] px-3 py-1 rounded-md text-xs font-bold"
                            >
                              {cred.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bio section */}
                <div className="px-8 sm:px-10 py-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-5 bg-[#55AE47] rounded-full"></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#11517E]">
                      Full Biography
                    </h4>
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    {selectedSpeaker.bio ? (
                      selectedSpeaker.bio
                        .split("\\n")
                        .map((paragraph: string, idx: number) => (
                          <p
                            key={idx}
                            className="mb-4 last:mb-0 leading-relaxed text-sm sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))
                    ) : (
                      <p className="italic text-slate-400">No biography available.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>'''

if old_modal in content:
    content = content.replace(old_modal, new_modal)
    print("SpeakersTab modal: replaced successfully")
else:
    print("SpeakersTab modal: NOT FOUND - trying CRLF")
    old_crlf = old_modal.replace('\n', '\r\n')
    new_crlf = new_modal.replace('\n', '\r\n')
    if old_crlf in content:
        content = content.replace(old_crlf, new_crlf)
        print("SpeakersTab modal: replaced with CRLF")
    else:
        print("SpeakersTab modal: FAILED")

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
