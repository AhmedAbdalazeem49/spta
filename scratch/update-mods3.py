with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''<div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                    {speaker.name}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-snug mb-2 line-clamp-1">
                    {speaker.role}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    {speaker.org}
                  </div>
                </div>'''

replacement = '''<div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                    {speaker.name}
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-semibold leading-snug mb-1">
                    {speaker.role}
                  </p>
                  {speaker.department && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-1">
                      {speaker.department}
                    </p>
                  )}
                  {speaker.college && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug mb-3">
                      {speaker.college}
                    </p>
                  )}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-left leading-tight break-words whitespace-normal">{speaker.org}</span>
                  </div>
                </div>'''

# Try replacing exactly
if target in content:
    content = content.replace(target, replacement)
else:
    # try replacing without exact spacing
    import re
    # Just replace the whole block by finding the start and end of it.
    # The block is inside: {speakersData.moderators.map((speaker, i) => (
    
    # Let's find the string dynamically
    pass

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
