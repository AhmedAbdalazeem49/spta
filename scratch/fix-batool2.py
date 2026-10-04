import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

# Find the block for Batool Al Hassan
pattern = r'(name:\s*"Batool Al Hassan",.*?)(photo:\s*null,\s*)'
# We want to remove `photo: null,` from her block
# Let's just find the index of "Batool Al Hassan" and then the next "photo: null"

start_idx = content.find('"Batool Al Hassan"')
if start_idx != -1:
    photo_null_idx = content.find('photo: null', start_idx)
    next_brace_idx = content.find('}', start_idx)
    
    if photo_null_idx != -1 and photo_null_idx < next_brace_idx:
        # replace 'photo: null,' with ''
        # We need to be careful about commas and newlines
        content = content[:photo_null_idx] + content[photo_null_idx:].replace('photo: null,', '', 1)
        print("Removed duplicate photo: null for Batool!")

with codecs.open('src/user/components/Conference2024/Tabs/SpeakersTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
