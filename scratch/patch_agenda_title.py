import codecs

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

old = '          <h3 className="text-4xl font-black text-gray-900 dark:text-white mb-3">\r\n            {language === "ar"\r\n              ? "الاجندة العلمية للمؤتمر"\r\n              : "Conference Scientific Agenda"}\r\n          </h3>\r\n          <p className="text-[#11517E] dark:text-[#6FC4BC] font-bold text-lg mb-1">\r\n            November 12-14, 2026 | Sheikh Hussein bin Abdulrahman Al-Mousa\r\n            Conference Hall\r\n          </p>'

new = '          <h3 className="text-4xl font-black text-[#11517E] mb-3">\r\n            {language === "ar"\r\n              ? "الاجندة العلمية للمؤتمر"\r\n              : "Conference Scientific Agenda"}\r\n          </h3>\r\n          <div className="w-20 h-1.5 bg-gradient-to-r from-[#11517E] to-[#6FC4BC] rounded-full mb-2"></div>\r\n          <p className="text-[#11517E] font-bold text-lg mb-1">\r\n            November 12-14, 2026 | Sheikh Hussein bin Abdulrahman Al-Mousa\r\n            Conference Hall\r\n          </p>'

if old in content:
    content = content.replace(old, new)
    print("Replaced successfully")
else:
    print("NOT FOUND - checking alternatives")
    # try with \n instead of \r\n
    old2 = old.replace('\r\n', '\n')
    if old2 in content:
        content = content.replace(old2, new.replace('\r\n', '\n'))
        print("Replaced with LF")
    else:
        print("Still not found")

with codecs.open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
