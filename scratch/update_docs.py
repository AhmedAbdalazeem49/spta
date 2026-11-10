import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()

# Page Margins
for section in doc.sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.8)
    section.right_margin = Inches(0.8)

# Colors
C_DARK = RGBColor(17, 81, 126)     # #11517E
C_TEAL = RGBColor(14, 116, 144)    # #0E7490
C_GREEN = RGBColor(85, 174, 71)    # #55AE47
C_GRAY = RGBColor(71, 85, 105)     # #475569

def set_cell_background(cell, fill_hex):
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    cell._tc.get_or_add_tcPr().append(shd)

def style_table(table, col_widths, headers, rows):
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = table.rows[0]
    for i, title in enumerate(headers):
        cell = hdr.cells[i]
        cell.text = title
        set_cell_background(cell, "11517E")
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for run in p.runs:
            run.font.bold = True
            run.font.color.rgb = RGBColor(255, 255, 255)
            run.font.size = Pt(9.5)
            run.font.name = "Segoe UI"

    for r_idx, row_data in enumerate(rows):
        row = table.rows[r_idx + 1]
        bg = "F8FAFC" if r_idx % 2 == 1 else "FFFFFF"
        for c_idx, val in enumerate(row_data):
            cell = row.cells[c_idx]
            cell.text = str(val)
            set_cell_background(cell, bg)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx == 0 or len(str(val)) < 15 else WD_ALIGN_PARAGRAPH.LEFT
            for run in p.runs:
                run.font.size = Pt(9)
                run.font.name = "Segoe UI"

    for row in table.rows:
        for idx, width in enumerate(col_widths):
            row.cells[idx].width = width

def add_heading(doc, text, level=1):
    h = doc.add_heading(text, level=level)
    h.paragraph_format.space_before = Pt(14)
    h.paragraph_format.space_after = Pt(6)
    for run in h.runs:
        run.font.name = "Segoe UI"
        run.font.color.rgb = C_DARK if level == 1 else C_TEAL
    return h

def add_code_block(doc, text):
    table = doc.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.cell(0, 0)
    set_cell_background(cell, "0F172A")
    cell.width = Inches(6.8)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(4)
    p.paragraph_format.space_after = Pt(4)
    run = p.add_run(text.strip())
    run.font.name = "Consolas"
    run.font.size = Pt(8.5)
    run.font.color.rgb = RGBColor(226, 232, 240)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

# ----------------- Cover -----------------
title_p = doc.add_paragraph()
title_p.paragraph_format.space_before = Pt(30)
title_p.paragraph_format.space_after = Pt(6)
run_title = title_p.add_run("SPTA2026 – Conference & Workshop Attendance API")
run_title.font.size = Pt(22)
run_title.font.bold = True
run_title.font.color.rgb = C_DARK

sub_p = doc.add_paragraph()
sub_p.paragraph_format.space_after = Pt(20)
run_sub = sub_p.add_run("توثيق واجهات برمجة التطبيقات لأجهزة المسح وبوابات التحضير (المؤتمر + الورش)")
run_sub.font.size = Pt(13)
run_sub.font.color.rgb = C_TEAL

doc.add_paragraph("The 6th Saudi International Physiotherapy Conference | 12–14 November 2026\nVersion: 1.1.0 | Updated with Participant Professional Data (specialization, employer, title)")
doc.add_paragraph("─" * 60)

# ----------------- Section 1: Overview -----------------
add_heading(doc, "1. Overview & Authentication / نظرة عامة والمصادقة", 1)
doc.add_paragraph(
    "توفر هذه الـ APIs إمكانية تسجيل حضور المشاركين في المؤتمر العام وورش العمل المصاحبة عبر أجهزة المسح الضوئي (QR Scanners) أو الإدخال اليدوي للكود التعريفي (unique_code)."
)
doc.add_paragraph(
    "All Scanner Endpoints require the header:\n"
    "• Header: X-Scan-Key: spta2026-scanner-key\n"
    "• Or Query Param: ?scan_key=spta2026-scanner-key\n"
    "• Base URL: https://api.spta.org.sa/api"
)

# ----------------- Section 2: Participant Data Object -----------------
add_heading(doc, "2. Participant Data Object (Object Response Schema)", 1)
doc.add_paragraph(
    "في كل استجابات الـ Attendance (سواء كان المشترك يسجل لأول مرة أو مسجل مسبقاً)، يُرجع النظام كائن participant كاملاً متضمناً التخصص الوظيفي (specialization) وبيانات العمل:"
)

headers = ["Field", "Type", "Description", "Example"]
widths = [Inches(1.5), Inches(0.8), Inches(2.7), Inches(1.8)]
rows = [
    ["id", "integer", "معرف المستخدم في النظام", "1"],
    ["name", "string", "اسم المشارك بالإنجليزية", "Ahmed Abdalazeem"],
    ["name_ar", "string", "اسم المشارك بالعربية", "أحمد عبدالعظيم"],
    ["email", "string", "البريد الإلكتروني", "ahmed@example.com"],
    ["phone", "string", "رقم الهاتف", "+966500000000"],
    ["title", "string|null", "اللقب المهني (Prof, Dr, Mr, Ms...)", "Prof / Dr"],
    ["user_type", "string|null", "نوع المستخدم (specialist, student, member...)", "specialist"],
    ["specialization", "string|null", "التخصص الفعلي للمشارك (الرئيسي)", "Physical Therapy"],
    ["sub_specialization", "string|null", "التخصص الدقيق", "Sports Physiotherapy"],
    ["employer", "string|null", "جهة العمل / المستشفى / الجامعة", "Almoosa Health Group"],
    ["job_title", "string|null", "المسمى الوظيفي المعتمد", "Physical Therapy"],
    ["unique_code", "string", "الكود الفريد للمشارك", "SPTA26-1"],
    ["is_attended", "boolean", "حالة حضور المؤتمر العام", "true"],
    ["day1_attended_at", "string|null", "توقيت تحضير اليوم الأول (12 نوف)", "2026-11-12 08:30:00"],
    ["day2_attended_at", "string|null", "توقيت تحضير اليوم الثاني (13 نوف)", "2026-11-13 09:15:00"],
]
tbl = doc.add_table(rows=len(rows)+1, cols=len(headers))
style_table(tbl, widths, headers, rows)

# ----------------- Section 3: Conference Scan -----------------
add_heading(doc, "3. Conference Attendance Scan / تسجيل حضور المؤتمر", 1)
doc.add_paragraph("POST /api/scan/conference  أو  POST /api/scan/manual")
doc.add_paragraph("Request Body:")
add_code_block(doc, """
{
  "unique_code": "SPTA26-1",
  "scan_date": "2026-11-12" // اختياري، افتراضياً تاريخ اليوم
}
""")

doc.add_paragraph("Response (سواء مسجل مسبقاً أو مسجل الآن):")
add_code_block(doc, """
{
  "success": true,
  "message": "الزائر سبق تسجيل حضوره لهذا اليوم.",
  "data": {
    "already_attended": true,
    "day_marked": null,
    "participant": {
      "id": 1,
      "name": "Ahmed Abdalazeem",
      "name_ar": "أحمد محمد عبدالعظيم",
      "email": "ahmed@example.com",
      "phone": "+966500000000",
      "title": "Dr",
      "user_type": "specialist",
      "specialization": "Physical Therapy",
      "sub_specialization": "Sports Medicine",
      "employer": "Almoosa Health Group",
      "job_title": "Physical Therapy",
      "unique_code": "SPTA26-1",
      "is_attended": true,
      "day1_attended_at": "2026-11-12 08:44:55",
      "day2_attended_at": "2026-11-13 09:12:14"
    }
  }
}
""")

# ----------------- Section 4: Workshop Scan -----------------
add_heading(doc, "4. Workshop Attendance Scan / تسجيل حضور ورشة العمل", 1)
doc.add_paragraph("POST /api/scan/workshop  أو  POST /api/scan/workshop-manual")
doc.add_paragraph("Request Body (Form A - من رمز QR مباشرة):")
add_code_block(doc, """
{
  "qr_payload": "SPTA26-1:WS:m1"
}
""")
doc.add_paragraph("Request Body (Form B - يدوي عند تعطل الـ Scanner):")
add_code_block(doc, """
{
  "unique_code": "SPTA26-1",
  "workshop_code": "m1"
}
""")

doc.add_paragraph("Response (مسجل جديد أو مسبقاً - متضمن التخصص والوظيفة):")
add_code_block(doc, """
{
  "success": true,
  "message": "تم تسجيل حضور الورشة بنجاح! 🎓",
  "data": {
    "already_attended": false,
    "workshop_code": "m1",
    "workshop_title": "Clinical Reasoning in Cervicothoracic Disorders",
    "participant": {
      "id": 1,
      "name": "Ahmed Abdalazeem",
      "name_ar": "أحمد محمد عبدالعظيم",
      "email": "ahmed@example.com",
      "phone": "+966500000000",
      "title": "Dr",
      "user_type": "specialist",
      "specialization": "Physical Therapy",
      "sub_specialization": "Sports Medicine",
      "employer": "Almoosa Health Group",
      "job_title": "Physical Therapy",
      "unique_code": "SPTA26-1",
      "attended_workshops": ["m1"]
    }
  }
}
""")

# ----------------- Section 5: Workshop Codes -----------------
add_heading(doc, "5. Workshop Codes Reference / جدول أكواد ورش العمل", 1)
ws_headers = ["Code", "Slot", "Time", "Title"]
ws_widths = [Inches(0.8), Inches(1.0), Inches(1.3), Inches(3.7)]
ws_rows = [
    ["m1", "صباحية", "08:00 – 12:00", "Clinical Reasoning in Cervicothoracic Disorders"],
    ["m2", "صباحية", "08:00 – 12:00", "Speaking Up in Elite Sport"],
    ["m3", "صباحية", "08:00 – 12:00", "From Rehabilitation to Performance: Integrating OPT"],
    ["m4", "صباحية", "08:00 – 12:00", "Physiotherapy in Chronic Overlapping Pain Conditions"],
    ["m5", "صباحية", "08:00 – 12:00", "A Practical Approach to Acute Vertigo and BPPV"],
    ["e1", "مسائية", "13:00 – 17:00", "Aquatic Therapy Beyond the Pool"],
    ["e2", "مسائية", "13:00 – 17:00", "Using Musculoskeletal Ultrasound"],
    ["e3", "مسائية", "13:00 – 17:00", "From Physical Stimuli to Biological Adaptation"],
    ["e4", "مسائية", "13:00 – 17:00", "Better Teams, Better Care"],
    ["e5", "مسائية", "13:00 – 17:00", "From Risk to Readiness"],
]
ws_tbl = doc.add_table(rows=len(ws_rows)+1, cols=len(ws_headers))
style_table(ws_tbl, ws_widths, ws_headers, ws_rows)

doc.save(r"d:\Programmings\Front End\Freelance\spta\SPTA2026_Attendance_API_Documentation.docx")
print("Updated docx successfully!")
