import os

directory = 'src/user/components/Conference2024'

replacements = {
    'text-blue-400': 'text-[#6FC4BC]',
    'text-blue-300': 'text-[#6FC4BC]',
    'text-blue-800': 'text-[#11517E]',
    'fill-blue-400': 'fill-[#6FC4BC]',
    'bg-indigo-400': 'bg-[#6FC4BC]',
    'bg-blue-900/30': 'bg-[#11517E]/30',
    'bg-blue-900/20': 'bg-[#11517E]/20',
    'dark:text-blue-300': 'dark:text-[#6FC4BC]',
    'dark:text-blue-400': 'dark:text-[#6FC4BC]',
    'dark:border-blue-700': 'dark:border-[#11517E]',
    'border-blue-300': 'border-[#6FC4BC]/50',
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

print("Cleanup colors done.")
