import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_def = 'const CustomSelect = ({ value, onChange, options, placeholder, timeLabel }) => {'
new_def = 'const CustomSelect = ({ value, onChange, options, placeholder, timeLabel, priceData }) => {'

old_use_m = '''<CustomSelect 
                  value={selectedMorning} 
                  onChange={setSelectedMorning} 
                  options={morningWorkshops} 
                  placeholder="No morning workshop selected" 
                  timeLabel="08:00 - 12:00" 
                />'''
new_use_m = '''<CustomSelect 
                  value={selectedMorning} 
                  onChange={setSelectedMorning} 
                  options={morningWorkshops} 
                  placeholder="No morning workshop selected" 
                  timeLabel="08:00 - 12:00"
                  priceData={priceData}
                />'''

old_use_e = '''<CustomSelect 
                  value={selectedEvening} 
                  onChange={setSelectedEvening} 
                  options={eveningWorkshops} 
                  placeholder="No afternoon workshop selected" 
                  timeLabel="13:00 - 17:00" 
                />'''
new_use_e = '''<CustomSelect 
                  value={selectedEvening} 
                  onChange={setSelectedEvening} 
                  options={eveningWorkshops} 
                  placeholder="No afternoon workshop selected" 
                  timeLabel="13:00 - 17:00"
                  priceData={priceData}
                />'''

content = content.replace(old_def, new_def)
content = content.replace(old_use_m, new_use_m)
content = content.replace(old_use_e, new_use_e)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Fixed props for CustomSelect")
