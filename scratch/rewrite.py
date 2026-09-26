import re

with open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove showPricing state
content = re.sub(r'const \[showPricing, setShowPricing\] = useState\(false\);\n', '', content)

# 2. Remove the 'View Pricing' button
view_pricing_btn = r'<button\s+type="button"\s+onClick=\{[^}]+\}\s+className="flex items-center gap-2[^"]+"[^>]*>\s*<CreditCard[^/]+/>[^<]+</button>'
content = re.sub(view_pricing_btn, '', content)

# 3. Create Pricing component string
pricing_jsx = """
        {/* Pricing Section Displayed Side-by-Side */}
        <div className="w-full xl:w-[35%] flex-shrink-0">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden h-full sticky top-32">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <CreditCard className="text-amber-500 w-7 h-7" /> {t("الأسعار والرسوم", "Pricing & Fees")}
              </h2>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Conference Pricing */}
              <div>
                <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> {t("تذكرة المؤتمر", "Conference Pass")}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الطلاب", "Students")}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المبكر", "Early Bird")}</span>
                        <span className="text-[10px] text-green-600 dark:text-green-400">{t("حتى", "Until")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">300 SAR</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المتأخر", "Late Bird")}</span>
                        <span className="text-[10px] text-red-500 dark:text-red-400">{t("من", "From")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">350 SAR</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الممارسين الصحيين", "Professionals")}</h4>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المبكر", "Early Bird")}</span>
                        <span className="text-[10px] text-green-600 dark:text-green-400">{t("حتى", "Until")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">600 SAR</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex flex-col">
                        <span className="text-slate-600 dark:text-slate-400 font-medium text-sm">{t("التسجيل المتأخر", "Late Bird")}</span>
                        <span className="text-[10px] text-red-500 dark:text-red-400">{t("من", "From")} 01-11-2026</span>
                      </div>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">650 SAR</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50 text-center">
                    {t("خصم 50% لأعضاء الجمعية", "50% OFF for SPTA Members")}
                  </div>
                </div>
              </div>

              {/* Workshop Pricing */}
              <div>
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 mb-4 flex items-center gap-2 mt-8">
                  <Sparkles className="w-5 h-5" /> {t("تذكرة ورش العمل", "Workshop Pass")}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الطلاب", "Students")}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{t("لكل ورشة", "Per Workshop")}</span>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">200 SAR</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mb-4">{t("الممارسين الصحيين", "Professionals")}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400 text-sm">{t("لكل ورشة", "Per Workshop")}</span>
                      <span className="font-bold text-lg text-slate-900 dark:text-white">300 SAR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
"""

# Replace the pricing modal completely
content = re.sub(r'\{\s*/\*\s*PRICING MODAL.*?</AnimatePresence>', '', content, flags=re.DOTALL)

# Find the wrapper div logic:
# <div className="flex-1 flex items-center justify-center w-full mt-6">
target_div = '<div className="flex-1 flex items-center justify-center w-full mt-6">'
replacement_div = f'''<div className="flex-1 flex flex-col xl:flex-row gap-8 w-full mt-6 max-w-7xl mx-auto items-start">
{pricing_jsx}
        <div className="flex-1 w-full flex items-start justify-center">'''

if target_div in content:
    content = content.replace(target_div, replacement_div)
    # We need to add a closing div for the new wrapper before the end of the return statement
    # The original structure:
    #         </motion.form>
    #       )}
    #     </div>
    #   </div>
    # );
    
    # Let's replace the last </div> before ); with </div></div>
    
    # We can use regex to replace the last two </div> 
    # Actually just replacing </div>\n    </div>\n  );\n};
    last_divs = '</div>\n    </div>\n  );\n};'
    new_last_divs = '</div>\n      </div>\n    </div>\n  );\n};'
    if last_divs in content:
        content = content.replace(last_divs, new_last_divs)
    else:
        # fallback
        content = re.sub(r'</div>\s*</div>\s*\);\s*};', '</div></div></div>);};', content)

with open('src/user/components/Conference2024/Tabs/RegistrationTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

