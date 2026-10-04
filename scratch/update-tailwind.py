import codecs

with codecs.open('tailwind.config.ts', 'r', 'utf-8') as f:
    content = f.read()

old_colors = """        // Brand palette
        mint: "hsl(var(--mint))",
        teal: "hsl(var(--teal))",
        "aqua-teal": "hsl(var(--aqua-teal))",
        "brand-blue": "hsl(var(--brand-blue))",
        "deep-blue": "hsl(var(--deep-blue))",
        "dark-navy": "hsl(var(--dark-navy))",
        midnight: "hsl(var(--midnight))","""

new_colors = """        // Brand palette
        'brand-teal': '#6FC4BC',
        'brand-green': '#55AE47',
        'brand-blue': '#11517E',
        mint: "hsl(var(--mint))",
        teal: "hsl(var(--teal))",
        "aqua-teal": "hsl(var(--aqua-teal))",
        "deep-blue": "hsl(var(--deep-blue))",
        "dark-navy": "hsl(var(--dark-navy))",
        midnight: "hsl(var(--midnight))","""

content = content.replace(old_colors, new_colors)

with codecs.open('tailwind.config.ts', 'w', 'utf-8') as f:
    f.write(content)
print("Updated tailwind.config.ts")
