import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# 1. Import PricingSection
if 'import { PricingSection }' not in content:
    content = content.replace('import { toast } from "sonner";', 'import { toast } from "sonner";\nimport { PricingSection } from "../PricingSection";')

# 2. Add PricingSection and remove sidebar
# Find the start of the side-by-side pricing section
sidebar_pattern = r'\{\/\* Pricing Section Displayed Side-by-Side \*\/\}.*?<div className="flex-1 w-full flex items-start justify-center">'
sidebar_match = re.search(sidebar_pattern, content, re.DOTALL)

if sidebar_match:
    # We found the block from sidebar start to form start.
    replacement = '''{/* Full-width Pricing Section */}
          <div className="w-full -mt-16 mb-8">
            <PricingSection />
          </div>

          <div className="flex-1 w-full flex items-start justify-center">'''
    content = content.replace(sidebar_match.group(0), replacement)

    # Let's also adjust the flex layout container
    old_container = '<div className="flex-1 flex flex-col xl:flex-row gap-8 w-full mt-6 max-w-7xl mx-auto items-start">'
    new_container = '<div className="flex-1 flex flex-col gap-8 w-full mt-0 max-w-7xl mx-auto items-center">'
    content = content.replace(old_container, new_container)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
