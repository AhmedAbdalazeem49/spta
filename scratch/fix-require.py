import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_require = "const navigate = require('react-router-dom').useNavigate();"
new_require = "const navigate = useNavigate();"

content = content.replace(old_require, new_require)

# Make sure useNavigate is imported
if 'useNavigate' not in content[:1500] and 'import { useNavigate' not in content:
    # Let's add it near other react-router-dom imports if any, or near the top
    if 'import { Link' in content:
        content = content.replace('import { Link', 'import { Link, useNavigate }')
    else:
        # Just add it to the top
        content = 'import { useNavigate } from "react-router-dom";\n' + content

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Fixed require issue")
