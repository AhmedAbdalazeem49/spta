import codecs

with codecs.open('src/components/layout/ConferenceNavbar.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Fix the sections array
content = content.replace(
    "const sections = ['top', 'scientific', 'agenda', 'workshops', 'organizing', 'booklet', 'registration'];",
    "const sections = ['top', 'scientific', 'speakers', 'agenda', 'workshops', 'organizing', 'booklet', 'registration'];"
)

# Fix mobile button touch area and add standard touch classes
old_mobile_btn = '''className={`px-4 py-3 text-right rtl:text-right ltr:text-left font-semibold rounded-xl transition-all ${'''
new_mobile_btn = '''className={`block w-full text-start px-4 py-3 rtl:text-right ltr:text-left font-semibold rounded-xl transition-all active:scale-95 ${'''
content = content.replace(old_mobile_btn, new_mobile_btn)

with codecs.open('src/components/layout/ConferenceNavbar.tsx', 'w', 'utf-8') as f:
    f.write(content)
