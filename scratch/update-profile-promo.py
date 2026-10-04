import codecs

with codecs.open('src/components/ConferenceRegistrationProfileTab.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_import = 'import { Loader2, Ticket, Calendar, CreditCard, CheckCircle, Clock, MapPin, Award, ExternalLink, Activity, Info } from "lucide-react";'
new_import = 'import { Loader2, Ticket, Calendar, CreditCard, CheckCircle, Clock, MapPin, Award, ExternalLink, Activity, Info, Sparkles, ArrowRight } from "lucide-react";'
content = content.replace(old_import, new_import)

old_div = """            ) : (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 border-dashed text-center">
                <Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-500 font-medium">
                  {t("لم تقم بالتسجيل في أي ورش عمل إضافية.", "You have not registered for any additional workshops.")}
                </p>
              </div>
            )}"""

new_div = """            ) : (
              <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-900/40 rounded-3xl p-8 border border-blue-100 dark:border-blue-800/50 text-center flex flex-col items-center justify-center">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm mb-4 relative z-10">
                  <Sparkles className="w-8 h-8 text-blue-500" />
                </div>
                
                <h4 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white mb-2 relative z-10">
                  {t("عزز تجربتك في المؤتمر!", "Enhance Your Conference Experience!")}
                </h4>
                
                <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-6 relative z-10">
                  {t(
                    "لم تقم بالتسجيل في أي ورش عمل بعد. أضف ورش عمل متخصصة الآن واحصل على المزيد من الساعات المعتمدة (CME).", 
                    "You haven't registered for any workshops yet. Add specialized workshops now to gain more CME hours and practical skills."
                  )}
                </p>

                <Link to="/conference-2026?tab=workshops" className="relative z-10 group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                  {t("استعرض ورش العمل", "Explore Workshops")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}"""

# Because of arabic characters encoding issue, let's just use regex for replacing the old_div
import re
content = re.sub(
    r'\) : \(\s*<div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 border-dashed text-center">\s*<Info className="w-10 h-10 text-slate-400 mx-auto mb-3" />\s*<p className="text-slate-500 font-medium">.*?<\/p>\s*<\/div>\s*\)',
    new_div,
    content,
    flags=re.DOTALL
)


with codecs.open('src/components/ConferenceRegistrationProfileTab.tsx', 'w', 'utf-8') as f:
    f.write(content)

print("Updated Profile Tab with Promotional Banner")
