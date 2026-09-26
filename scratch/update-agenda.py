import re

with open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

new_days = '''const DAYS = [
  { label: "Day 1", date: "Nov 12, 2026", subtitle: "Conference Day 1", icon: <Mic2 className="w-5 h-5" /> },
  { label: "Day 2", date: "Nov 13, 2026", subtitle: "Conference Day 2", icon: <Trophy className="w-5 h-5" /> },
];'''

new_schedule = '''const SCHEDULE: Session[] = [
  // DAY 1
  { id: 1, day: 1, time: "07:30", endTime: "08:00", type: "break", title: "Registration", desc: "Participant check-in and badge collection." },
  { id: 2, day: 1, time: "08:00", endTime: "08:10", type: "ceremony", title: "Opening remarks", desc: "Welcome and opening remarks." },
  
  // Session 1
  { id: 3, day: 1, time: "08:10", endTime: "08:40", type: "keynote", title: "Physiotherapy’s Role in Saudi Health System Transformation", speaker: "Dr. Faisal Aldahmashi OR Dr. Ahmad Nashry", role: "Session 1: Strategic Leadership & Health System Integration", room: "Moderator: Dr. Ahmad Alghamdi", desc: "" },
  { id: 4, day: 1, time: "08:40", endTime: "09:45", type: "panel", title: "Focused symposium: Direct Access Implementation", speaker: "Dr. Asma Alrushud, Dr. Hani Alabbad, Dr. Hosam Alzahrani", desc: "Opening & Framing, Evidence Presentation, Saudi Experience Case Study, Implementation Framework." },
  { id: 5, day: 1, time: "09:45", endTime: "10:00", type: "panel", title: "Q&A", desc: "" },
  
  { id: 6, day: 1, time: "10:00", endTime: "10:15", type: "break", title: "Break", desc: "" },
  { id: 7, day: 1, time: "10:15", endTime: "11:00", type: "ceremony", title: "Opening ceremony", desc: "Official conference opening ceremony." },
  
  { id: 8, day: 1, time: "11:00", endTime: "11:40", type: "panel", title: "Panel (1): Rehabilitation Governance & National Standards: Building a Unified Physiotherapy Framework", speaker: "Dr. Hanan Alsaif, Mr. Talal Alghamdi, Dr. Noora Alshoweir", room: "Moderator: Dr. Mishal Aldaihan", desc: "" },
  { id: 9, day: 1, time: "11:40", endTime: "11:50", type: "panel", title: "Q&A", desc: "" },
  { id: 10, day: 1, time: "11:50", endTime: "13:00", type: "break", title: "Lunch", desc: "" },

  // Session 2
  { id: 11, day: 1, time: "13:00", endTime: "13:30", type: "keynote", title: "Redefining Chronic Pain Care: Integrating Biopsychosocial & Value-Based Physiotherapy Models", speaker: "Prof. Lorimer Moseley", role: "Session 2: Advanced Musculoskeletal & Sports Rehabilitation", room: "Moderator: Dr. Abdulaziz Alomereni", desc: "" },
  { id: 12, day: 1, time: "13:30", endTime: "13:50", type: "keynote", title: "Evidence-Based Return-to-Sport Decision-Making in Modern Rehabilitation", speaker: "Prof. Qassim Muaidi", desc: "Invited Lecture" },
  { id: 13, day: 1, time: "13:50", endTime: "14:10", type: "keynote", title: "Speaking Up in Elite Sport - Barriers and Enablers Faced by Physiotherapists", speaker: "Dr. Sian Knott", desc: "Invited Lecture" },
  { id: 14, day: 1, time: "14:10", endTime: "14:30", type: "keynote", title: "Integrating Evidence, Experience & Patient Context: Advanced Decision Making in Musculoskeletal Physiotherapy", speaker: "Prof. Ali Alshami", desc: "Invited Lecture" },
  { id: 15, day: 1, time: "14:30", endTime: "14:40", type: "workshop", title: "Platform (1): Effects of Nigella sativa Supplementation with Combined Exercise...", speaker: "Dr. Hiedar Alyami", desc: "Platform presentation" },
  { id: 16, day: 1, time: "14:40", endTime: "14:50", type: "workshop", title: "Platform (2): The Impact of Autonomic Nervous System Modulation...", speaker: "Dr. Hani Alkhawajah", desc: "Platform presentation" },
  { id: 17, day: 1, time: "14:50", endTime: "15:00", type: "workshop", title: "Platform (3): Comparative Effectiveness of Cognitive Functional Therapy...", speaker: "Mr. Abdullah Alessa", desc: "Platform presentation" },
  { id: 18, day: 1, time: "15:00", endTime: "15:10", type: "panel", title: "Q&A", desc: "" },
  
  { id: 19, day: 1, time: "15:10", endTime: "15:40", type: "break", title: "Break / Exhibition", desc: "" },

  // Session 3
  { id: 20, day: 1, time: "15:40", endTime: "16:00", type: "keynote", title: "Redefining Cardiopulmonary & ICU Rehabilitation in Modern Healthcare", speaker: "Prof. Ali Albarrari", role: "Session 3: Advanced Rehabilitation Across Specialties", room: "Moderator: Dr. Batool Alhassan", desc: "Invited Lecture" },
  { id: 21, day: 1, time: "16:00", endTime: "16:20", type: "keynote", title: "Reversing Frailty: Strategic Physiotherapy Interventions for Healthy Aging in Saudi Arabia", speaker: "Dr. Maha Almarwani", desc: "Invited Lecture" },
  { id: 22, day: 1, time: "16:20", endTime: "16:40", type: "keynote", title: "Pelvic Health & Beyond: Evidence-Based Physiotherapy for Women", speaker: "Prof. Heba Embabi", desc: "Invited Lecture" },
  { id: 23, day: 1, time: "16:40", endTime: "16:50", type: "workshop", title: "Platform (4): Effects of High-Intensity Interval Training...", speaker: "Mr. Mahdi Al Ghannam", desc: "Platform presentation" },
  { id: 24, day: 1, time: "16:50", endTime: "17:00", type: "workshop", title: "Platform (5): Effect of Pulsed High-Intensity Laser Therapy...", speaker: "Ms. Saeeda Alhashmi Alamir", desc: "Platform presentation" },
  { id: 25, day: 1, time: "17:00", endTime: "17:10", type: "workshop", title: "Platform (6): The Effect of Vitamin D Supplementation...", speaker: "Mr. Naif Bin-Talha", desc: "Platform presentation" },
  { id: 26, day: 1, time: "17:10", endTime: "17:20", type: "panel", title: "Q&A", desc: "" },
  { id: 27, day: 1, time: "17:20", endTime: "17:50", type: "panel", title: "Panel (2): Integrated & Interdisciplinary Models of Care", speaker: "Dr. Walid Ouanes, Dr. Tahany Alhamad, Dr. Mohammed Alhaizan, Dr. Faisal Al Mubarak, Ms. Lamia AlFaleh", room: "Moderator: Dr. Sara Almansouri", desc: "" },
  { id: 28, day: 1, time: "17:50", endTime: "18:00", type: "panel", title: "Q&A", desc: "End of Day 1" },

  // DAY 2
  // Session 4
  { id: 29, day: 2, time: "13:30", endTime: "14:00", type: "keynote", title: "Neuroplasticity in Action: Translating Brain Science into High-Impact Stroke Rehabilitation", speaker: "Dr. Turki Abualait", role: "Session 4: Neurological Rehabilitation Across the Lifespan", room: "Moderator: Dr. Sattam Almutairi", desc: "" },
  { id: 30, day: 2, time: "14:00", endTime: "14:20", type: "keynote", title: "Optimizing Neurodevelopment: Advancing Pediatric Neurorehabilitation Through Early, Intensive & Family-Centered Care", speaker: "Dr. Veronika Vasilcova", desc: "Invited Lecture" },
  { id: 31, day: 2, time: "14:20", endTime: "14:40", type: "keynote", title: "Rehabilitation Strategies for Neurodegenerative Disorders", speaker: "Dr. Miriam Rafferty", desc: "Virtual Lecture" },
  { id: 32, day: 2, time: "14:40", endTime: "14:50", type: "workshop", title: "Platform (7): The effects of trunk rehabilitation...", speaker: "Ms. Shatha Mukhtar", desc: "Platform presentation" },
  { id: 33, day: 2, time: "14:50", endTime: "15:00", type: "workshop", title: "Platform (8): Using Transcranial Direct Current Stimulation...", speaker: "Dr. Mohammed Alshehri", desc: "Platform presentation" },
  { id: 34, day: 2, time: "15:00", endTime: "15:10", type: "workshop", title: "Platform (9): Effects of Thoracic Spinal Manipulation...", speaker: "Dr. Murdi Alanazi", desc: "Platform presentation" },
  { id: 35, day: 2, time: "15:10", endTime: "15:20", type: "panel", title: "Q&A", desc: "" },
  { id: 36, day: 2, time: "15:20", endTime: "15:50", type: "break", title: "Break / Exhibition", desc: "" },

  // Session 5
  { id: 37, day: 2, time: "15:50", endTime: "16:20", type: "keynote", title: "AI-Assisted Assessment and Treatment in Physiotherapy Practice", speaker: "Dr. Mashael Alsobhi", role: "Session 5: Digital Rehabilitation and Workforce Development", room: "Moderator: Dr. Hani Alkhawajah", desc: "" },
  { id: 38, day: 2, time: "16:20", endTime: "16:40", type: "keynote", title: "Residency, Specialization, & Competency Frameworks", speaker: "Dr. Terrence McGee", desc: "Invited Lecture" },
  { id: 39, day: 2, time: "16:40", endTime: "17:00", type: "keynote", title: "Challenges with Telehealth and How To Overcome Them", speaker: "Prof. Rana Hinman", desc: "Virtual Lecture" },
  { id: 40, day: 2, time: "17:00", endTime: "17:10", type: "workshop", title: "Platform (10): Integrating AI and IoT-Enabled Assistive Technologies...", speaker: "Dr. Fayez Namnaqani", desc: "Platform presentation" },
  { id: 41, day: 2, time: "17:10", endTime: "17:20", type: "workshop", title: "Platform (11): Bridging the Cognitive Gap...", speaker: "Ms. Noor Alzahri", desc: "Platform presentation" },
  { id: 42, day: 2, time: "17:20", endTime: "17:30", type: "workshop", title: "Platform (12): A Virtual Reality Physiotherapy Toolkit...", speaker: "Dr. Alhanouf Almutairi", desc: "Platform presentation" },
  { id: 43, day: 2, time: "17:30", endTime: "17:40", type: "panel", title: "Q&A", desc: "" },
  { id: 44, day: 2, time: "17:40", endTime: "18:10", type: "panel", title: "Panel (3): The Future of Physiotherapy in Saudi Arabia: 2030 Vision Roadmap", speaker: "Dr. Abdulfattah Alqahtani, Dr. Terrence McGee, Ms. Manar Almkirsh, Dr. Ahamd Barhameen", room: "Moderator: Dr. Asma Alderaa", desc: "" },
  { id: 45, day: 2, time: "18:10", endTime: "18:20", type: "panel", title: "Q&A", desc: "" },
  { id: 46, day: 2, time: "18:20", endTime: "19:00", type: "closing", title: "Closing Remarks & Awards Ceremony", desc: "End of Day 2" }
];'''

# Replace DAYS array
content = re.sub(r'const DAYS = \[.*?\];', new_days, content, flags=re.DOTALL)

# Replace SCHEDULE array
content = re.sub(r'const SCHEDULE: Session\[\] = \[.*?\];', new_schedule, content, flags=re.DOTALL)

# Replace the heading text
content = content.replace('November 11-13, 2026', 'November 12-13, 2026')
# Also there was a weird character from utf8 conversion in the previous file like ?"
content = content.replace('November 11?"13', 'November 12-13')

# We need to change activeDay state default from 1 to 1 (it's fine)
# And the day toggle buttons should only show 2 days instead of 3. That is automatically handled by the DAYS array mapping.

with open('src/user/components/Conference2024/Tabs/AgendaTab.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
