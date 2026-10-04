import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old = '''      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        setShowSuccessModal(true);
      }'''

new = '''      const paymentUrl = res.data?.data?.payment_url || res.data?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setShowSuccessModal(true);
      }'''

content = content.replace(old, new)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated payment redirect logic")
