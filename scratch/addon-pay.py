import codecs

with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_cb = """            // 🏢 HANDLE CONFERENCE
            if ($transaction->type === 'conference') {
                $this->conferenceService->confirmFromTransaction($transaction);
            }
        }"""

new_cb = """            // 🏢 HANDLE CONFERENCE
            if ($transaction->type === 'conference') {
                $this->conferenceService->confirmFromTransaction($transaction);
            }
            
            // 🏢 HANDLE CONFERENCE ADDON
            if ($transaction->type === 'conference_addon') {
                $parts = explode(':', $transaction->reference_id);
                if (count($parts) == 2) {
                    $regId = $parts[0];
                    $workshops = explode(',', $parts[1]);
                    $reg = \App\Models\ConferenceRegistration::find($regId);
                    if ($reg) {
                        $existing = $reg->selected_workshops ?? [];
                        if (!is_array($existing)) {
                            $existing = json_decode($existing, true) ?? [];
                        }
                        $reg->selected_workshops = array_values(array_unique(array_merge($existing, $workshops)));
                        $reg->save();
                    }
                }
            }
        }"""

if old_cb in content:
    content = content.replace(old_cb, new_cb)
    with codecs.open('backend/app/Http/Controllers/Api/PaymentController.php', 'w', 'utf-8') as f:
        f.write(content)
    print("Updated PaymentController successfully!")
else:
    print("old_cb not found!")
