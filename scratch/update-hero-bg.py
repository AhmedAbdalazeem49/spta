import re

with open('src/user/components/Conference2024/HeroSection.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add the import at the top
if 'conference-hero.jpeg' not in content:
    content = content.replace('import { Calendar, MapPin, Sparkles } from "lucide-react";', 'import { Calendar, MapPin, Sparkles } from "lucide-react";\nimport HeroBg from "@/assets/conference-hero.jpeg";')

# Now inject the image into the background
bg_image_html = '''        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={HeroBg} alt="Conference Hero" className="w-full h-full object-cover opacity-30 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/80 to-transparent"></div>
        </div>
        
        {/* Elegant background gradients */}'''

content = content.replace('{/* Elegant background gradients */}', bg_image_html)

with open('src/user/components/Conference2024/HeroSection.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
