import codecs

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

old_block = '''<div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] scale-105 border border-amber-400/50"
                : "bg-white/5 text-slate-600 hover:bg-white/10 hover:text-slate-900 border border-white/10"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>'''

new_block = '''<div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#11517E] to-[#6FC4BC] text-white shadow-[0_4px_20px_rgba(17,81,126,0.25)] scale-105 border border-[#6FC4BC]/50"
                : "bg-[#11517E]/5 text-[#11517E]/70 hover:bg-[#11517E]/10 hover:text-[#11517E] border border-[#11517E]/15"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>'''

if old_block in content:
    content = content.replace(old_block, new_block)
    print("Replaced with LF")
else:
    old_block_crlf = old_block.replace('\n', '\r\n')
    new_block_crlf = new_block.replace('\n', '\r\n')
    if old_block_crlf in content:
        content = content.replace(old_block_crlf, new_block_crlf)
        print("Replaced with CRLF")
    else:
        print("Could not find the block to replace!")

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
