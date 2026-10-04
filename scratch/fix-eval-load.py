import codecs

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_load = "        $evaluations = ConferenceEvaluation::with('user:id,first_name,last_name,email,title')->latest()->get();"
new_load = "        $evaluations = ConferenceEvaluation::with('user:id,name,email,phone')->latest()->get();"

if old_load in content:
    content = content.replace(old_load, new_load)
    with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'w', 'utf-8') as f:
        f.write(content)
    print("Fixed eager loading columns!")
else:
    print("Could not find the eager load line")
