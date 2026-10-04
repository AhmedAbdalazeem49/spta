import os
import re

directory = 'src/user/components/Conference2024'

# Tailwind color replacements to brand colors
# Blue -> #11517E (Dark Blue)
# Indigo -> #6FC4BC (Teal)
# Violet/Purple -> #55AE47 (Green)

replacements = {
    'bg-blue-600': 'bg-[#11517E]',
    'bg-blue-500': 'bg-[#11517E]',
    'bg-blue-700': 'bg-[#11517E]',
    'text-blue-600': 'text-[#11517E]',
    'text-blue-500': 'text-[#11517E]',
    'text-blue-700': 'text-[#11517E]',
    'border-blue-600': 'border-[#11517E]',
    'border-blue-500': 'border-[#11517E]',
    'border-blue-200': 'border-[#11517E]/20',
    'ring-blue-500': 'ring-[#11517E]',
    'ring-blue-600': 'ring-[#11517E]',
    'from-blue-600': 'from-[#11517E]',
    'from-blue-500': 'from-[#11517E]',
    'to-blue-600': 'to-[#11517E]',
    'to-blue-500': 'to-[#11517E]',
    'bg-blue-50': 'bg-[#f0f8f8]',
    'bg-blue-100': 'bg-[#e0f2f1]',

    'bg-indigo-600': 'bg-[#6FC4BC]',
    'bg-indigo-500': 'bg-[#6FC4BC]',
    'text-indigo-600': 'text-[#6FC4BC]',
    'text-indigo-500': 'text-[#6FC4BC]',
    'border-indigo-600': 'border-[#6FC4BC]',
    'border-indigo-500': 'border-[#6FC4BC]',
    'border-indigo-200': 'border-[#6FC4BC]/20',
    'from-indigo-600': 'from-[#6FC4BC]',
    'from-indigo-500': 'from-[#6FC4BC]',
    'to-indigo-600': 'to-[#6FC4BC]',
    'to-indigo-500': 'to-[#6FC4BC]',
    'bg-indigo-50': 'bg-[#f0f8f8]',

    'bg-violet-600': 'bg-[#55AE47]',
    'text-violet-600': 'text-[#55AE47]',
    'from-violet-600': 'from-[#55AE47]',
    'to-violet-600': 'to-[#55AE47]',
    
    'bg-emerald-600': 'bg-[#55AE47]',
    'bg-emerald-500': 'bg-[#55AE47]',
    'text-emerald-600': 'text-[#55AE47]',
    'text-emerald-500': 'text-[#55AE47]',
    'from-emerald-600': 'from-[#55AE47]',
    'from-emerald-500': 'from-[#55AE47]',
    'to-emerald-600': 'to-[#55AE47]',
    'to-emerald-500': 'to-[#55AE47]',
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            for old, new in replacements.items():
                content = content.replace(old, new)
            
            if content != original:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {path}")

print("Global replace done.")
