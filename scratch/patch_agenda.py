import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

button_code = """        </div>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = agendaPdf;
            link.download = "Scientific Agenda.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setShowDownloadModal(true);
            setTimeout(() => setShowDownloadModal(false), 3000);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#6FC4BC] text-white rounded-xl font-bold hover:bg-[#5dafa7] transition-all shadow-lg shadow-[#6FC4BC]/30 hover:scale-105"
        >
          <Download className="w-5 h-5" />
          {language === "ar" ? "تحميل الجدول العلمي" : "Download Scientific Agenda"}
        </button>
      </div>"""

# Match exactly the end of the header
pattern = r'        </div>\s*</div>\s*\{/\* Day Selector \*/\}'
replacement = button_code + '\n\n      {/* Day Selector */}'

content = re.sub(pattern, replacement, content)

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
