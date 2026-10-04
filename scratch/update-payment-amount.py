import codecs

with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_addon = """                          if (!is_array($existing)) {
                              $existing = json_decode($existing, true) ?? [];
                          }
                          $reg->selected_workshops = array_values(array_unique(array_merge($existing, $workshops)));
                          $reg->save();"""

new_addon = """                          if (!is_array($existing)) {
                              $existing = json_decode($existing, true) ?? [];
                          }
                          $reg->selected_workshops = array_values(array_unique(array_merge($existing, $workshops)));
                          $reg->amount = $reg->amount + $transaction->amount;
                          $reg->save();"""

if old_addon in content:
    content = content.replace(old_addon, new_addon)
    with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'w', 'utf-8') as f:
        f.write(content)
    print("Updated PaymentController to add transaction amount to registration amount.")
else:
    print("Not found")

