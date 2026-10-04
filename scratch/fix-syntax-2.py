import codecs

with codecs.open('src/components/ConferenceRegistrationProfileTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace("            )}}", "            )}")

with codecs.open('src/components/ConferenceRegistrationProfileTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
