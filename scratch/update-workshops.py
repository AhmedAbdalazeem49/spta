import re
with open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    'Morning Workshops (08:00 AM - 12:00 PM)',
    'Morning Workshops - Saturday 14 November (08:00 AM - 12:00 PM)'
)
content = content.replace(
    'Afternoon Workshops (01:00 PM - 05:00 PM)',
    'Afternoon Workshops - Saturday 14 November (01:00 PM - 05:00 PM)'
)
content = content.replace(
    'Afternoon Workshops (13:00 - 17:00)',
    'Afternoon Workshops - Saturday 14 November (13:00 - 17:00)'
)

with open('src/user/components/Conference2024/Tabs/WorkshopsTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
