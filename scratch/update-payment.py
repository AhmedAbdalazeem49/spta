import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old = '''      try {
      await api.post("/conference/register", {
        morning_workshop_id: selectedMorning || null,
        afternoon_workshop_id: selectedEvening || null,
        promo_code: promoCode
      });
      setShowSuccessModal(true);
    } catch (error: any) {'''

new = '''      try {
      const res = await api.post("/conference/register", {
        morning_workshop_id: selectedMorning || null,
        afternoon_workshop_id: selectedEvening || null,
        promo_code: promoCode || null,
        payment_method: "creditcard"
      });
      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        setShowSuccessModal(true);
      }
    } catch (error: any) {'''

import re
content = re.sub(
    r'try \{\s*await api\.post\("/conference/register", \{\s*morning_workshop_id: selectedMorning \|\| null,\s*afternoon_workshop_id: selectedEvening \|\| null,\s*promo_code: promoCode\s*\}\);\s*setShowSuccessModal\(true\);\s*\} catch \(error: any\) \{',
    new,
    content
)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated payment method")
