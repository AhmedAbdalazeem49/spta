import codecs

# PricingSection.tsx
with codecs.open('src/user/components/Conference2024/PricingSection.tsx', 'r', 'utf-8') as f:
    ps_content = f.read()

if 'import { BrandPattern }' not in ps_content:
    ps_content = ps_content.replace(
        'import { CheckCircle2, Info } from "lucide-react";',
        'import { CheckCircle2, Info } from "lucide-react";\nimport { BrandPattern } from "./BrandPattern";'
    )
    ps_content = ps_content.replace(
        '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative">',
        '<section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">\n      <BrandPattern position="top-right" variant="secondary" />\n      <BrandPattern position="bottom-left" variant="primary" />'
    )
    with codecs.open('src/user/components/Conference2024/PricingSection.tsx', 'w', 'utf-8') as f:
        f.write(ps_content)

# ReviewsSection.tsx
with codecs.open('src/user/components/Conference2024/ReviewsSection.tsx', 'r', 'utf-8') as f:
    rs_content = f.read()

if 'import { BrandPattern }' not in rs_content:
    rs_content = rs_content.replace(
        'import { Star, MessageSquare, ThumbsUp } from "lucide-react";',
        'import { Star, MessageSquare, ThumbsUp } from "lucide-react";\nimport { BrandPattern } from "./BrandPattern";'
    )
    rs_content = rs_content.replace(
        '<section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-slate-950">',
        '<section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-slate-950 relative overflow-hidden">\n      <BrandPattern position="top-left" variant="primary" />'
    )
    with codecs.open('src/user/components/Conference2024/ReviewsSection.tsx', 'w', 'utf-8') as f:
        f.write(rs_content)

print("Updated Sections with Pattern")
