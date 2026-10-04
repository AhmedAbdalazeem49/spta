import codecs

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_state = 'const [showSuccessModal, setShowSuccessModal] = useState(false);'
new_state = '''const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAlreadyRegisteredModal, setShowAlreadyRegisteredModal] = useState(false);
  const navigate = require('react-router-dom').useNavigate();'''

old_catch = '''} catch (error: any) {
        toast.error(error?.response?.data?.message || "Registration failed");
      }'''
new_catch = '''} catch (error: any) {
        if (error?.response?.status === 409 || error?.response?.data?.message?.includes("مسبقاً")) {
          setShowAlreadyRegisteredModal(true);
        } else {
          toast.error(error?.response?.data?.message || "Registration failed");
        }
      }'''

old_modal = '''{/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && ('''
new_modal = '''{/* Already Registered Modal */}
      <AnimatePresence>
        {showAlreadyRegisteredModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Info className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                {language === "ar" ? "مسجل مسبقاً!" : "Already Registered!"}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {language === "ar" 
                  ? "لقد قمت بالتسجيل في هذا المؤتمر مسبقاً. يمكنك متابعة حالة تسجيلك وتفاصيل الورش من خلال ملفك الشخصي." 
                  : "You have already registered for this conference. You can track your registration status and workshop details from your profile."}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAlreadyRegisteredModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl font-bold border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  {language === "ar" ? "إغلاق" : "Close"}
                </button>
                <button
                  onClick={() => navigate('/profile?tab=conferences')}
                  className="flex-1 py-3 px-4 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {language === "ar" ? "ملفي الشخصي" : "My Profile"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && ('''

content = content.replace(old_state, new_state)
content = content.replace(old_catch, new_catch)
content = content.replace(old_modal, new_modal)

with codecs.open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', 'utf-8') as f:
    f.write(content)
print("Updated RegistrationTab for 409 handling")
