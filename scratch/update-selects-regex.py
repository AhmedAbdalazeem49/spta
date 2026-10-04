import codecs
import re

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

# Use regex to find and replace both selects
new_morning = '''<CustomSelect 
                  value={selectedMorning} 
                  onChange={setSelectedMorning} 
                  options={morningWorkshops} 
                  placeholder="No morning workshop selected" 
                  timeLabel="08:00 - 12:00" 
                />'''

new_evening = '''<CustomSelect 
                  value={selectedEvening} 
                  onChange={setSelectedEvening} 
                  options={eveningWorkshops} 
                  placeholder="No afternoon workshop selected" 
                  timeLabel="13:00 - 17:00" 
                />'''

content = re.sub(
    r'<select value=\{selectedMorning\}(.*?)</select>',
    new_morning,
    content,
    flags=re.DOTALL
)

content = re.sub(
    r'<select value=\{selectedEvening\}(.*?)</select>',
    new_evening,
    content,
    flags=re.DOTALL
)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Replaced selects using regex")
