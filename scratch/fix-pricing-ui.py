import codecs

with codecs.open('src/user/components/Conference2024/PricingSection.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Change the section wrapping
content = content.replace('<section className="py-24 bg-gray-50 dark:bg-[#0a0f1c]">', '<section className="py-4 w-full">')
# Change the title since it's already inside RegistrationTab
content = content.replace('<h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">', '<h2 className="hidden">')

with codecs.open('src/user/components/Conference2024/PricingSection.tsx', 'w', 'utf-8') as f:
    f.write(content)
