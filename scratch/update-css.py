import codecs

with codecs.open('src/index.css', 'r', 'utf-8') as f:
    content = f.read()

# Replace the LTR font-family and add root variables for the brand colors
if '--brand-teal' not in content:
    old_root = ':root {'
    new_root = ':root {\n    /* Brand Identity Colors */\n    --brand-teal: #6FC4BC;\n    --brand-green: #55AE47;\n    --brand-blue: #11517E;\n'
    content = content.replace(old_root, new_root)

old_ltr_font = """  [dir="ltr"], [dir="ltr"] body {
    font-family: 'LamaSans', 'Inter', sans-serif;
  }"""
new_ltr_font = """  [dir="ltr"], [dir="ltr"] body {
    font-family: 'Myriad Variable Concept', 'Myriad Pro', 'LamaSans', sans-serif;
  }"""
content = content.replace(old_ltr_font, new_ltr_font)

old_gradients = """    /* Gradients */
    --gradient-brand: linear-gradient(90deg, hsl(162 55% 67%) 0%, hsl(168 49% 47%) 25%, hsl(204 70% 41%) 60%, hsl(204 67% 21%) 100%);
    --gradient-navy: linear-gradient(135deg, hsl(204 65% 16%) 0%, hsl(204 67% 21%) 50%, hsl(204 66% 33%) 100%);
    --gradient-blue: linear-gradient(135deg, hsl(204 70% 41%) 0%, hsl(168 49% 47%) 100%);"""
new_gradients = """    /* Gradients */
    --gradient-brand: linear-gradient(90deg, var(--brand-teal) 0%, var(--brand-blue) 100%);
    --gradient-navy: linear-gradient(135deg, var(--brand-blue) 0%, #0d3d5f 100%);
    --gradient-blue: linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-green) 100%);"""
content = content.replace(old_gradients, new_gradients)

with codecs.open('src/index.css', 'w', 'utf-8') as f:
    f.write(content)
print("Updated index.css")
