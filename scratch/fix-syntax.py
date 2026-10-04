import codecs
import re

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'r', 'utf-8') as f:
    content = f.read()

# First, let's remove everything from the first processAddon to the end of the file
index = content.find("    private function processAddon")
if index != -1:
    content = content[:index]

# Wait! Does that cut off other methods like checkPrice?
