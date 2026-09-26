import re

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''<h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                      {speaker.name}
                    </h4>'''

replacement = '''<h4 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {speaker.title && <span className="text-slate-500 dark:text-slate-400 text-sm mr-1">{speaker.title}</span>}
                      {speaker.name}
                    </h4>
                    {speaker.credentials && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {speaker.credentials.split(',').map((cred: string, idx: number) => (
                          <span key={idx} className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {cred.trim()}
                          </span>
                        ))}
                      </div>
                    )}'''

if target in content:
    content = content.replace(target, replacement)

with open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
