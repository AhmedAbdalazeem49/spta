import codecs
import re

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'r', 'utf-8') as f:
    content = f.read()

# 1. Add Mail import at the top
if "use Illuminate\\Support\\Facades\\Mail;" not in content:
    content = content.replace(
        "use Carbon\\Carbon;",
        "use Carbon\\Carbon;\nuse Illuminate\\Support\\Facades\\Mail;\nuse App\\Mail\\ConferenceRegistrationConfirmedMail;"
    )
    print("Added Mail imports")

# 2. Update free registration path to also send email
old_free = """        if ($totalPrice <= 0) {
            return ApiResponse::success('تم التسجيل بنجاح مجاناً', [
                'payment_url' => null
            ]);
        }"""
new_free = """        if ($totalPrice <= 0) {
            $registration->update(['status' => 'paid']);
            Mail::to($user->email)->queue(new ConferenceRegistrationConfirmedMail($registration, $user));
            return ApiResponse::success('تم التسجيل بنجاح مجاناً', [
                'payment_url' => null
            ]);
        }"""
if old_free in content:
    content = content.replace(old_free, new_free)
    print("Updated free registration path")
else:
    print("free path not found - searching for Arabic encoded version")

with codecs.open('backend/app/Http/Controllers/Api/ConferenceRegistrationController.php', 'w', 'utf-8') as f:
    f.write(content)
