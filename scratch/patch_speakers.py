import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Fix Title
title_search = r'''        \{/\* Section Title \*/\}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-md">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              Speakers
            </span>
          </h2>
          <div className="w-24 h-1\.5 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full"></div>
        </div>'''

title_replace = '''        {/* Section Title */}
        <div className="mb-2">
          <h3 className="text-4xl font-black text-[#11517E] mb-3">
            Speakers
          </h3>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full"></div>
        </div>'''
        
content = re.sub(title_search, title_replace, content)

# Fix tabs
tabs_search = r'''className=\{\`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 \$\{
              activeTab === tab\.id
                \? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-\[0_0_20px_rgba\(245,158,11,0\.3\)\] scale-105 border border-amber-400/50"
                : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
            \}\`\}'''

tabs_replace = '''className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-[#11517E] text-white scale-105 shadow-md"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}'''
            
content = re.sub(tabs_search, tabs_replace, content)

# Replace dark colors
content = content.replace('bg-[#131b2c]', 'bg-white')
content = content.replace('bg-slate-800', 'bg-slate-50')
content = content.replace('border-slate-700', 'border-slate-200')
content = content.replace('text-slate-300', 'text-slate-600')
content = content.replace('text-slate-400', 'text-slate-500')
content = content.replace('text-amber-400', 'text-[#55AE47]')
content = content.replace('text-orange-400', 'text-[#6FC4BC]')
content = content.replace('from-[#0f172a]', 'from-white')
content = content.replace('to-[#1e293b]', 'to-slate-50')
content = content.replace('text-white', 'text-slate-900')

# Restore some texts that should be white
content = content.replace('text-slate-900 scale-105 shadow-md', 'text-white scale-105 shadow-md')

# Make the title dark
content = content.replace('text-slate-900 mb-4', 'text-[#11517E] mb-4')


with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
