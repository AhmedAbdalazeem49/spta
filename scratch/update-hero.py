import re

with open('src/user/components/Conference2024/HeroSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the heading 'Annual Conference 2026'
# It has this block:
'''            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-sm">
              {language === "ar"
                ? "المؤتمر السنوي 2026"
                : "Annual Conference 2026"}
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-gray-300/90 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
              {language === "ar"
                ? "تجمع استثنائي لنخبة من العقول والخبراء لرسم معالم المستقبل الطبي."
                : "An exceptional gathering of elite minds and experts to shape the medical future."}
            </p>'''

new_heading = '''            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400 drop-shadow-sm leading-tight">
              {language === "ar"
                ? "المؤتمر السعودي الدولي السادس للعلاج الطبيعي"
                : "The 6th Saudi International Physiotherapy Conference"}
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-amber-400 mb-12 max-w-4xl mx-auto font-bold leading-relaxed tracking-wide drop-shadow-md">
              {language === "ar"
                ? "الارتقاء بالعلاج الطبيعي في المملكة العربية السعودية: القيادة والابتكار والأثر القائم على القيمة"
                : "Advancing Physiotherapy in Saudi Arabia: Leadership, Innovation & Value-Based Impact"}
            </p>'''

content = re.sub(
    r'<h1 className="[^"]*font-extrabold[^"]*">.*?</h1>\s*<p className="[^"]*text-gray-300[^"]*">.*?</p>',
    new_heading,
    content,
    flags=re.DOTALL
)

# Fix the dates and location
content = content.replace('"November 15-17, 2026"', '"November 12-14, 2026"')
content = content.replace('15 - 17 نوفمبر 2026', '12 - 14 نوفمبر 2026')
content = content.replace('Almoosa Rehabilitation Hospital - Al-Ahsa City', 'Almoosa Health Group - Al-Ahsa')
content = content.replace('مستشفى الموسى للتأهيل - مدينة الأحساء', 'مجموعة الموسى الصحية - الأحساء')

# Replace background image import and usage
content = content.replace("import HeroImg from '@/assets/hero-1.jpg';", "import HeroImg from '@/assets/conference-hero.jpeg';")

with open('src/user/components/Conference2024/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
