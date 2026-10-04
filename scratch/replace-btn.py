import codecs

with codecs.open('src/user/components/Conference2024/ReviewsSection.tsx', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('\r\n', '\n')

old_btn = """              <motion.button
                whileHover={canSubmit ? { scale: 1.02, y: -2 } : {}}
                whileTap={canSubmit ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-4 sm:py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                  canSubmit
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 cursor-pointer"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                <Send className={`w-5 h-5 ${canSubmit ? "text-white" : ""}`} />
                {canSubmit ? "Submit My Feedback" : "Please rate at least Overall Experience"}
              </motion.button>"""

new_btn = """              <motion.button
                whileHover={canSubmit && !isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={canSubmit && !isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className={`w-full py-4 sm:py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
                  canSubmit && !isSubmitting
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 cursor-pointer"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className={`w-5 h-5 ${canSubmit ? "text-white" : ""}`} />
                    {canSubmit ? "Submit My Feedback" : "Please rate at least Overall Experience"}
                  </>
                )}
              </motion.button>"""

if old_btn in content:
    content = content.replace(old_btn, new_btn)
    with codecs.open('src/user/components/Conference2024/ReviewsSection.tsx', 'w', 'utf-8') as f:
        f.write(content)
    print("Replaced!")
else:
    print("Not found")
