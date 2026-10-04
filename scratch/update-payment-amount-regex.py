import codecs
import re

with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'r', 'utf-8') as f:
    content = f.read()

content = re.sub(
    r'\$reg->selected_workshops = array_values\(array_unique\(array_merge\(\$existing, \$workshops\)\)\);\s*\$reg->save\(\);',
    r'$reg->selected_workshops = array_values(array_unique(array_merge($existing, $workshops)));\n                          $reg->amount = $reg->amount + $transaction->amount;\n                          $reg->save();',
    content
)

with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'w', 'utf-8') as f:
    f.write(content)
print("Updated successfully")
