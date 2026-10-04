import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_func = '''      setIsSubmitting(true);
            try {
      const res = await api.post("/conference/register", {
        morning_workshop_id: selectedMorning || null,
        afternoon_workshop_id: selectedEvening || null,
        selected_workshops: [selectedMorning, selectedEvening].filter(Boolean),
        promo_code: promoCode || null,
        payment_method: "creditcard"
      });
      const paymentUrl = res.data?.data?.payment_url || res.data?.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        setShowSuccessModal(true);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }'''

new_func = '''      setIsSubmitting(true);
      try {
        const workshopsArray = [selectedMorning, selectedEvening].filter(Boolean);
        const finalAmount = calculateTotal();
        
        const res = await api.post("/conference/register", {
          morning_workshop_id: selectedMorning || null,
          afternoon_workshop_id: selectedEvening || null,
          selected_workshops: workshopsArray,
          workshops: workshopsArray,
          amount: finalAmount,
          total_amount: finalAmount,
          promo_code: promoCode || null,
          payment_method: "creditcard"
        });
        
        const paymentUrl = res.data?.data?.payment_url || res.data?.payment_url;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        } else {
          setShowSuccessModal(true);
        }
      } catch (error: any) {
        if (error?.response?.status === 409 || error?.response?.data?.message?.includes("مسبقاً") || error?.response?.data?.message?.includes("already registered")) {
          setShowAlreadyRegisteredModal(true);
        } else {
          toast.error(error?.response?.data?.message || "Registration failed");
        }
      } finally {
        setIsSubmitting(false);
      }'''

import re
# Sometimes indentation varies, so we use regex for safety
# Let's just do a string replacement with careful whitespace handling
content = re.sub(
    r'setIsSubmitting\(true\);\s*try \{\s*const res = await api\.post\("/conference/register", \{.*?\n\s*\}\);\s*const paymentUrl = res\.data\?\.data\?\.payment_url \|\| res\.data\?\.payment_url;\s*if \(paymentUrl\) \{\s*window\.location\.href = paymentUrl;\s*\} else \{\s*setShowSuccessModal\(true\);\s*\}\s*\} catch \(error: any\) \{\s*toast\.error\(error\?\.response\?\.data\?\.message \|\| "Registration failed"\);\s*\} finally \{\s*setIsSubmitting\(false\);\s*\}',
    new_func,
    content,
    flags=re.DOTALL
)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated handleRegister with correct catch and payload")
