import re

with open('src/components/layout/ConferenceNavbar.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add activeSection state
content = content.replace('const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);', "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [activeSection, setActiveSection] = useState('top');")

# 2. Add scroll spy logic inside useEffect
old_use_effect = '''  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);'''

new_use_effect = '''  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['top', 'scientific', 'agenda', 'workshops', 'organizing', 'booklet', 'registration'];
      let current = 'top';
      
      if (window.scrollY < 100) {
        setActiveSection('top');
        return;
      }

      for (const s of sections) {
        if (s === 'top') continue;
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 4) {
             current = s;
             break; // Found the active one
          }
        }
      }
      setActiveSection(current);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);'''

content = content.replace(old_use_effect, new_use_effect)

# 3. Update the Desktop nav items rendering to highlight active item
old_desktop_button = '''className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all"'''
new_desktop_button = '''className={`px-4 py-2 text-sm font-semibold rounded-full transition-all ${
                  activeSection === item.id 
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }`}'''
content = content.replace(old_desktop_button, new_desktop_button)

# 4. Update Mobile nav items
old_mobile_button = '''className="px-4 py-3 text-right rtl:text-right ltr:text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all"'''
new_mobile_button = '''className={`px-4 py-3 text-right rtl:text-right ltr:text-left font-semibold rounded-xl transition-all ${
                  activeSection === item.id 
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30" 
                    : "text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                }`}'''
content = content.replace(old_mobile_button, new_mobile_button)


with open('src/components/layout/ConferenceNavbar.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
