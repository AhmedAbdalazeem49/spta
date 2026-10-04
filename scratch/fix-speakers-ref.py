import codecs

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('speakers[activeTab as keyof typeof speakers]', 'speakersData[activeTab as keyof typeof speakersData]')

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
