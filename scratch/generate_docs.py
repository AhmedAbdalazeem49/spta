"""
SPTA2026 - API Documentation Generator
Generates a professional bilingual (Arabic + English) Word document
for the conference attendance scanner system.
"""

from docx import Document
from docx.shared import Pt, RGBColor, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import copy

OUTPUT_PATH = r"d:\Programmings\Front End\Freelance\spta\SPTA2026_Attendance_API_Documentation.docx"

# ── colour palette ──────────────────────────────────────────────
COLOR_HEADING     = RGBColor(0x1A, 0x53, 0x76)   # dark teal-blue
COLOR_SUBHEADING  = RGBColor(0x2E, 0x86, 0xAB)   # medium blue
COLOR_TABLE_HDR   = RGBColor(0x1A, 0x53, 0x76)   # same as heading
COLOR_CODE_BG     = RGBColor(0xF5, 0xF5, 0xF5)
COLOR_GREEN       = RGBColor(0x27, 0x7A, 0x40)
COLOR_RED         = RGBColor(0xC0, 0x39, 0x2B)
COLOR_ORANGE      = RGBColor(0xD3, 0x54, 0x00)

# ── helpers ──────────────────────────────────────────────────────

def set_cell_bg(cell, hex_color: str):
    """Apply a solid background colour to a table cell."""
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd  = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  hex_color)
    tcPr.append(shd)


def set_cell_border(cell, **kwargs):
    """Set cell borders. kwargs: top, bottom, left, right each = dict(sz, color, val)."""
    tc   = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for side in ("top", "left", "bottom", "right", "insideH", "insideV"):
        if side in kwargs:
            border = OxmlElement(f"w:{side}")
            for k, v in kwargs[side].items():
                border.set(qn(f"w:{k}"), str(v))
            tcBorders.append(border)
    tcPr.append(tcBorders)


def add_page_break(doc):
    doc.add_page_break()


def para_rtl(paragraph):
    """Mark a paragraph as right-to-left."""
    pPr = paragraph._p.get_or_add_pPr()
    bidi = OxmlElement("w:bidi")
    pPr.append(bidi)
    jc = OxmlElement("w:jc")
    jc.set(qn("w:val"), "right")
    pPr.append(jc)


def add_heading(doc, text: str, level: int = 1, color: RGBColor = None, rtl: bool = False):
    """Add a styled heading paragraph."""
    para  = doc.add_paragraph()
    run   = para.add_run(text)
    run.bold = True

    if level == 1:
        run.font.size = Pt(18)
        run.font.color.rgb = color or COLOR_HEADING
        para.paragraph_format.space_before = Pt(20)
        para.paragraph_format.space_after  = Pt(8)
    elif level == 2:
        run.font.size = Pt(14)
        run.font.color.rgb = color or COLOR_SUBHEADING
        para.paragraph_format.space_before = Pt(14)
        para.paragraph_format.space_after  = Pt(6)
    else:
        run.font.size = Pt(12)
        run.font.color.rgb = color or COLOR_SUBHEADING
        para.paragraph_format.space_before = Pt(10)
        para.paragraph_format.space_after  = Pt(4)

    if rtl:
        para_rtl(para)
    else:
        para.alignment = WD_ALIGN_PARAGRAPH.LEFT

    # Underline heading 1
    if level == 1:
        run.font.underline = True

    return para


def add_body(doc, text: str, rtl: bool = False, color: RGBColor = None, bold: bool = False, size: int = 11):
    para = doc.add_paragraph()
    run  = para.add_run(text)
    run.font.size  = Pt(size)
    run.bold       = bold
    if color:
        run.font.color.rgb = color
    if rtl:
        para_rtl(para)
    else:
        para.alignment = WD_ALIGN_PARAGRAPH.LEFT
    para.paragraph_format.space_after = Pt(4)
    return para


def add_code_block(doc, code: str):
    """Add a monospaced code block paragraph."""
    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.LEFT
    para.paragraph_format.left_indent  = Inches(0.3)
    para.paragraph_format.space_before = Pt(4)
    para.paragraph_format.space_after  = Pt(4)

    # Shaded background via paragraph shading
    pPr = para._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"),   "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"),  "F0F0F0")
    pPr.append(shd)

    run = para.add_run(code)
    run.font.name = "Courier New"
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x1E, 0x1E, 0x1E)
    return para


def add_table(doc, headers: list, rows: list, col_widths: list = None):
    """Add a formatted table with coloured header row."""
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.LEFT

    # Header row
    hdr_row = table.rows[0]
    for i, h in enumerate(headers):
        cell = hdr_row.cells[i]
        cell.text = h
        set_cell_bg(cell, "1A5376")
        for para in cell.paragraphs:
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for run in para.runs:
                run.font.bold  = True
                run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                run.font.size  = Pt(10)

    # Data rows
    for r_idx, row_data in enumerate(rows):
        row = table.rows[r_idx + 1]
        bg  = "FFFFFF" if r_idx % 2 == 0 else "EBF5FB"
        for c_idx, cell_text in enumerate(row_data):
            cell = row.cells[c_idx]
            cell.text = str(cell_text)
            set_cell_bg(cell, bg)
            for para in cell.paragraphs:
                for run in para.runs:
                    run.font.size = Pt(9.5)

    # Column widths
    if col_widths:
        for row in table.rows:
            for i, width in enumerate(col_widths):
                row.cells[i].width = Inches(width)

    doc.add_paragraph()   # spacing after table
    return table


def add_divider(doc):
    para = doc.add_paragraph("─" * 90)
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    for run in para.runs:
        run.font.color.rgb = RGBColor(0xBB, 0xBB, 0xBB)
        run.font.size = Pt(8)


# ── document construction ────────────────────────────────────────

def build_document():
    doc = Document()

    # Page margins
    for section in doc.sections:
        section.top_margin    = Cm(2.5)
        section.bottom_margin = Cm(2.5)
        section.left_margin   = Cm(2.8)
        section.right_margin  = Cm(2.8)

    # ── COVER PAGE ─────────────────────────────────────────────
    doc.add_paragraph()
    doc.add_paragraph()
    doc.add_paragraph()

    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title_para.add_run("SPTA2026")
    run.font.size  = Pt(36)
    run.font.bold  = True
    run.font.color.rgb = COLOR_HEADING

    sub1 = doc.add_paragraph()
    sub1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = sub1.add_run("وثيقة توثيق واجهة برمجية لأنظمة التحضير والمسح")
    r.font.size  = Pt(20)
    r.font.bold  = True
    r.font.color.rgb = COLOR_SUBHEADING
    para_rtl(sub1)

    sub2 = doc.add_paragraph()
    sub2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r2 = sub2.add_run("Conference & Workshop Attendance QR Scan API Documentation")
    r2.font.size  = Pt(14)
    r2.font.color.rgb = RGBColor(0x44, 0x44, 0x44)

    doc.add_paragraph()
    add_divider(doc)
    doc.add_paragraph()

    conf = doc.add_paragraph()
    conf.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rc = conf.add_run("The 6th Saudi International Physiotherapy Conference")
    rc.font.size = Pt(13)
    rc.font.bold = True
    rc.font.color.rgb = RGBColor(0x33, 0x33, 0x33)

    date_p = doc.add_paragraph()
    date_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rd = date_p.add_run("November 12–13, 2026  |  Almoosa Health, Al-Ahsa")
    rd.font.size = Pt(12)
    rd.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

    doc.add_paragraph()

    ver_p = doc.add_paragraph()
    ver_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rv = ver_p.add_run("Version 1.0.0")
    rv.font.size  = Pt(11)
    rv.font.italic = True
    rv.font.color.rgb = RGBColor(0x77, 0x77, 0x77)

    add_page_break(doc)

    # ── SECTION 1: OVERVIEW ────────────────────────────────────
    add_heading(doc, "Section 1 – Overview / نظرة عامة", level=1)

    overview_en = (
        "The SPTA2026 Attendance System uses QR code scanning or manual unique-code entry to "
        "mark participant attendance for conference days and workshops.\n\n"
        "Each registered participant is assigned a unique code in the format:\n"
        "    SPTA26-{user_id}   (e.g., SPTA26-42)\n\n"
        "Conference attendance covers two days:\n"
        "  • Day 1 — November 12, 2026\n"
        "  • Day 2 — November 13, 2026\n\n"
        "Workshop attendance is recorded on:\n"
        "  • November 14, 2026\n\n"
        "There are two primary scan operations:\n"
        "  1. Conference Scan  — marks day-level attendance\n"
        "  2. Workshop Scan    — marks per-workshop attendance\n\n"
        "All requests to scanner endpoints MUST include the authentication key\n"
        "(see Section 2)."
    )
    add_body(doc, overview_en)

    doc.add_paragraph()
    add_heading(doc, "نظرة عامة", level=2, rtl=True)
    overview_ar = (
        "يعتمد نظام تسجيل الحضور لمؤتمر SPTA2026 على مسح رمز QR أو الإدخال اليدوي للكود المميز لتسجيل حضور المشاركين "
        "خلال أيام المؤتمر وورش العمل.\n\n"
        "يحمل كل مشارك مسجل كودًا مميزًا بالصيغة التالية:\n"
        "    SPTA26-{user_id}   (مثال: SPTA26-42)\n\n"
        "يشمل حضور المؤتمر يومين:\n"
        "  • اليوم الأول — 12 نوفمبر 2026\n"
        "  • اليوم الثاني — 13 نوفمبر 2026\n\n"
        "يُسجَّل حضور ورش العمل في:\n"
        "  • 14 نوفمبر 2026\n\n"
        "تتضمن عمليتا المسح الرئيسيتان:\n"
        "  1. مسح المؤتمر — يُسجّل الحضور على مستوى اليوم\n"
        "  2. مسح ورشة العمل — يُسجّل الحضور لكل ورشة على حدة\n\n"
        "يجب أن تتضمن جميع الطلبات الموجهة إلى نقاط نهاية المسح مفتاح المصادقة (انظر القسم 2)."
    )
    add_body(doc, overview_ar, rtl=True)

    add_page_break(doc)

    # ── SECTION 2: AUTHENTICATION ──────────────────────────────
    add_heading(doc, "Section 2 – Authentication / المصادقة", level=1)

    add_body(doc, "All scan endpoints require a scanner API key to be present in every HTTP request.", bold=False)
    doc.add_paragraph()

    add_heading(doc, "Option A — HTTP Header", level=2)
    add_code_block(doc, "X-Scan-Key: spta2026-scanner-key")

    add_heading(doc, "Option B — Query Parameter", level=2)
    add_code_block(doc, "?scan_key=spta2026-scanner-key")

    add_body(doc,
        "If the key is missing or incorrect, the API returns HTTP 401 Unauthorized.\n"
        "Store the key securely on each scanner device and do not expose it publicly.",
        color=COLOR_RED
    )

    doc.add_paragraph()
    add_heading(doc, "المصادقة", level=2, rtl=True)
    add_body(doc,
        "تتطلب جميع نقاط نهاية المسح وجود مفتاح API في كل طلب HTTP.\n"
        "في حال غياب المفتاح أو خطئه، تُعيد الواجهة البرمجية استجابة HTTP 401 غير مصرح.\n"
        "احتفظ بالمفتاح بشكل آمن على كل جهاز مسح ولا تُعرّضه للعموم.",
        rtl=True, color=COLOR_RED
    )

    add_page_break(doc)

    # ── SECTION 3: BASE URL ────────────────────────────────────
    add_heading(doc, "Section 3 – Base URL", level=1)
    add_body(doc, "All API endpoints are relative to the following base URL:")
    add_code_block(doc, "https://api.spta.sa/api")
    add_body(doc, "Example full URL for conference scan:")
    add_code_block(doc, "POST  https://api.spta.sa/api/scan/conference")

    add_page_break(doc)

    # ── SECTION 4: CONFERENCE ATTENDANCE ──────────────────────
    add_heading(doc, "Section 4 – Conference Attendance Scan Endpoints", level=1)
    add_heading(doc, "نقاط نهاية مسح حضور المؤتمر", level=2, rtl=True)

    # 4.1
    add_heading(doc, "4.1  POST /scan/conference — تسجيل حضور المؤتمر", level=2)
    add_body(doc, "Marks a participant's attendance for a specific conference day via QR scan.")

    add_heading(doc, "Request Parameters", level=3)
    add_table(doc,
        headers=["Field", "Type", "Required", "Description"],
        rows=[
            ["unique_code", "string", "Yes", "QR scan result or manually entered code (e.g. SPTA26-42)"],
            ["scan_date",   "date",   "No",  "YYYY-MM-DD format. Defaults to today.\n2026-11-12 = Day 1\n2026-11-13 = Day 2"],
        ],
        col_widths=[1.3, 0.9, 0.9, 3.4]
    )

    add_heading(doc, "Example Request Body (JSON)", level=3)
    add_code_block(doc,
        '{\n'
        '  "unique_code": "SPTA26-42",\n'
        '  "scan_date": "2026-11-12"\n'
        '}'
    )

    add_heading(doc, "Response — Success (HTTP 200)", level=3)
    add_body(doc, "First-time scan for this day:", bold=True, color=COLOR_GREEN)
    add_code_block(doc,
        '{\n'
        '  "success": true,\n'
        '  "message": "تم تسجيل الحضور بنجاح – اليوم الأول (12 نوفمبر)",\n'
        '  "data": {\n'
        '    "already_attended": false,\n'
        '    "day_marked": "اليوم الأول (12 نوفمبر)",\n'
        '    "participant": {\n'
        '      "id": 42,\n'
        '      "name": "Ahmed Saleh",\n'
        '      "name_ar": "أحمد صالح",\n'
        '      "email": "ahmed@example.com",\n'
        '      "unique_code": "SPTA26-42",\n'
        '      "is_attended": true,\n'
        '      "day1_attended_at": "2026-11-12 09:15:33",\n'
        '      "day2_attended_at": null\n'
        '    }\n'
        '  }\n'
        '}'
    )

    add_body(doc, "Already scanned for this day (safe — no duplicate created):", bold=True, color=COLOR_ORANGE)
    add_code_block(doc,
        '{\n'
        '  "success": true,\n'
        '  "message": "الزائر سبق تسجيل حضوره لهذا اليوم.",\n'
        '  "data": {\n'
        '    "already_attended": true,\n'
        '    "...": "..."\n'
        '  }\n'
        '}'
    )

    add_heading(doc, "Response — Error (HTTP 404)", level=3)
    add_body(doc, "Participant not found or has not completed payment:", bold=True, color=COLOR_RED)
    add_code_block(doc,
        '{\n'
        '  "success": false,\n'
        '  "message": "لم يتم العثور على تسجيل مدفوع لهذا الكود."\n'
        '}'
    )

    doc.add_paragraph()

    # 4.2
    add_heading(doc, "4.2  POST /scan/manual — الإدخال اليدوي للكود", level=2)
    add_body(doc,
        "Identical to POST /scan/conference in both request parameters and response format.\n\n"
        "Use this endpoint when the QR scanner hardware fails and the operator must type the "
        "participant code manually into the scanning application."
    )

    add_page_break(doc)

    # ── SECTION 5: WORKSHOP ATTENDANCE ────────────────────────
    add_heading(doc, "Section 5 – Workshop Attendance Scan Endpoints", level=1)
    add_heading(doc, "نقاط نهاية مسح حضور ورش العمل", level=2, rtl=True)

    # 5.1
    add_heading(doc, "5.1  POST /scan/workshop — تسجيل حضور ورشة العمل", level=2)
    add_body(doc,
        "Records a participant's attendance for a specific workshop.\n"
        "Accepts two input forms — use whichever matches your scanner hardware:"
    )

    add_heading(doc, "Input Form A — QR Payload (direct scan)", level=3)
    add_code_block(doc, '{ "qr_payload": "SPTA26-42:WS:m1" }')

    add_heading(doc, "Input Form B — Manual Fields", level=3)
    add_code_block(doc, '{ "unique_code": "SPTA26-42", "workshop_code": "m1" }')

    add_heading(doc, "Request Parameters", level=3)
    add_table(doc,
        headers=["Field", "Type", "Required", "Description"],
        rows=[
            ["qr_payload",    "string", "No*", "Full QR string from scanner, e.g. SPTA26-42:WS:m1"],
            ["unique_code",   "string", "No*", "Participant unique code (used when qr_payload is absent)"],
            ["workshop_code", "string", "No*", "Workshop code: m1–m5 (morning), e1–e5 (afternoon)"],
        ],
        col_widths=[1.4, 0.9, 0.9, 3.3]
    )
    add_body(doc, "* Either qr_payload OR (unique_code + workshop_code) is required.", bold=True, color=COLOR_ORANGE)

    add_heading(doc, "Response — Success (HTTP 200)", level=3)
    add_code_block(doc,
        '{\n'
        '  "success": true,\n'
        '  "message": "تم تسجيل حضور الورشة بنجاح! 🎓",\n'
        '  "data": {\n'
        '    "already_attended": false,\n'
        '    "workshop_code": "m1",\n'
        '    "workshop_title": "Clinical Reasoning in Cervicothoracic Disorders",\n'
        '    "participant": {\n'
        '      "id": 42,\n'
        '      "name": "Ahmed Saleh",\n'
        '      "unique_code": "SPTA26-42",\n'
        '      "attended_workshops": ["m1"]\n'
        '    }\n'
        '  }\n'
        '}'
    )

    add_heading(doc, "Response — Error (HTTP 403 — Not Enrolled)", level=3)
    add_code_block(doc,
        '{\n'
        '  "success": false,\n'
        '  "message": "المشارك غير مسجل في هذه الورشة (m1). يرجى التحقق."\n'
        '}'
    )

    doc.add_paragraph()

    # 5.2
    add_heading(doc, "5.2  POST /scan/workshop-manual — الإدخال اليدوي للورشة", level=2)
    add_body(doc,
        "Identical to POST /scan/workshop in both request parameters and response format.\n\n"
        "Use this endpoint when the QR scanner fails. The operator selects the workshop from "
        "a list and enters the participant unique code manually."
    )

    add_page_break(doc)

    # ── SECTION 6: WORKSHOP CODES ──────────────────────────────
    add_heading(doc, "Section 6 – Workshop Codes Reference", level=1)
    add_body(doc, "All workshops take place on November 14, 2026.")
    add_table(doc,
        headers=["Code", "Workshop Title", "Time", "Slot"],
        rows=[
            ["m1", "Clinical Reasoning in Cervicothoracic Disorders",   "08:00 – 12:00", "Morning"],
            ["m2", "Speaking Up in Elite Sport",                         "08:00 – 12:00", "Morning"],
            ["m3", "From Rehabilitation to Performance: Integrating OPT","08:00 – 12:00", "Morning"],
            ["m4", "Physiotherapy in Chronic Overlapping Pain Conditions","08:00 – 12:00", "Morning"],
            ["m5", "A Practical Approach to Acute Vertigo and BPPV",    "08:00 – 12:00", "Morning"],
            ["e1", "Aquatic Therapy Beyond the Pool",                    "13:00 – 17:00", "Afternoon"],
            ["e2", "Using Musculoskeletal Ultrasound",                   "13:00 – 17:00", "Afternoon"],
            ["e3", "From Physical Stimuli to Biological Adaptation",     "13:00 – 17:00", "Afternoon"],
            ["e4", "Better Teams, Better Care",                          "13:00 – 17:00", "Afternoon"],
            ["e5", "From Risk to Readiness",                             "13:00 – 17:00", "Afternoon"],
        ],
        col_widths=[0.6, 3.3, 1.4, 1.2]
    )

    add_page_break(doc)

    # ── SECTION 7: ERROR CODES ────────────────────────────────
    add_heading(doc, "Section 7 – Common Error Codes", level=1)
    add_table(doc,
        headers=["HTTP Status", "API Message", "Meaning"],
        rows=[
            ["401", "Unauthorized. Invalid or missing scanner API key.",
                    "X-Scan-Key header missing or incorrect"],
            ["403", "المشارك غير مسجل في هذه الورشة",
                    "Participant not enrolled in the requested workshop"],
            ["404", "لم يتم العثور على تسجيل مدفوع لهذا الكود.",
                    "Participant not found or payment not recorded"],
            ["422", "الكود غير صحيح",
                    "Invalid unique_code format or malformed qr_payload"],
        ],
        col_widths=[1.2, 2.8, 2.5]
    )

    add_page_break(doc)

    # ── SECTION 8: SCENARIOS ──────────────────────────────────
    add_heading(doc, "Section 8 – Usage Scenarios / السيناريوهات", level=1)

    scenarios = [
        (
            "Scenario 1 — Conference Day 1 (Nov 12)",
            "Scanner reads participant QR code → sends POST /scan/conference with:\n"
            '  unique_code = "SPTA26-42"\n'
            '  scan_date   = "2026-11-12"\n'
            "→ System records day1_attended_at timestamp."
        ),
        (
            "Scenario 2 — Conference Day 2 (Nov 13)",
            "Scanner reads same participant QR code → sends POST /scan/conference with:\n"
            '  unique_code = "SPTA26-42"\n'
            '  scan_date   = "2026-11-13"\n'
            "→ System records day2_attended_at timestamp."
        ),
        (
            "Scenario 3 — Scanner Fails, Manual Entry (Conference)",
            'Participant verbally provides code "SPTA26-42".\n'
            "Operator types it into the app → sends POST /scan/manual with the same fields.\n"
            "→ Identical result to QR scan."
        ),
        (
            "Scenario 4 — Workshop Scan (QR)",
            'Workshop QR label contains: "SPTA26-42:WS:m1"\n'
            "Scanner reads it → sends POST /scan/workshop with:\n"
            '  qr_payload = "SPTA26-42:WS:m1"\n'
            "→ System marks workshop m1 as attended for participant 42."
        ),
        (
            "Scenario 5 — Workshop Manual Entry",
            "QR scanner fails.\n"
            "Operator selects workshop m1 from a list and enters code SPTA26-42\n"
            "→ sends POST /scan/workshop-manual with:\n"
            '  unique_code   = "SPTA26-42"\n'
            '  workshop_code = "m1"'
        ),
        (
            "Scenario 6 — Already Scanned (Duplicate Prevention)",
            "Same QR is scanned twice for the same day or workshop.\n"
            '→ Response: already_attended = true\n'
            "→ Scanner shows a warning to the operator.\n"
            "→ No duplicate record is created. Safe to re-scan."
        ),
    ]

    for title, body in scenarios:
        add_heading(doc, title, level=2)
        add_code_block(doc, body)

    add_page_break(doc)

    # ── SECTION 9: QUICK REFERENCE ────────────────────────────
    add_heading(doc, "Section 9 – Quick Reference Card", level=1)
    add_body(doc, "Summary of all available scanner endpoints:")
    add_table(doc,
        headers=["Endpoint", "Method", "Purpose"],
        rows=[
            ["/scan/conference",     "POST", "Conference attendance — QR or manual code entry"],
            ["/scan/manual",         "POST", "Conference attendance — manual code entry (scanner fallback)"],
            ["/scan/workshop",       "POST", "Workshop attendance — QR payload or manual fields"],
            ["/scan/workshop-manual","POST", "Workshop attendance — manual entry (scanner fallback)"],
        ],
        col_widths=[2.2, 0.9, 3.4]
    )

    add_heading(doc, "Authentication Reminder", level=2)
    add_code_block(doc,
        "Header:        X-Scan-Key: spta2026-scanner-key\n"
        "Query Param:   ?scan_key=spta2026-scanner-key\n"
        "Base URL:      https://api.spta.sa/api"
    )

    add_page_break(doc)

    # ── SECTION 10: CONTACT ───────────────────────────────────
    add_heading(doc, "Section 10 – Technical Support / الدعم التقني", level=1)

    add_body(doc, "For any issues with scanner connectivity, API authentication, or attendance records,\ncontact the SPTA Technical Support team:")
    doc.add_paragraph()
    add_body(doc, "📧  Email:  info@spta.sa", bold=True, size=12)
    doc.add_paragraph()

    add_heading(doc, "الدعم التقني", level=2, rtl=True)
    add_body(doc,
        "لأي مشكلات تتعلق باتصال الماسح الضوئي أو مصادقة API أو سجلات الحضور،\n"
        "يُرجى التواصل مع فريق الدعم التقني لـ SPTA:",
        rtl=True
    )
    doc.add_paragraph()
    ar_email = doc.add_paragraph()
    ar_email_run = ar_email.add_run("📧  البريد الإلكتروني:  info@spta.sa")
    ar_email_run.font.bold = True
    ar_email_run.font.size = Pt(12)
    para_rtl(ar_email)

    doc.add_paragraph()
    add_divider(doc)
    doc.add_paragraph()

    footer_p = doc.add_paragraph()
    footer_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    fr = footer_p.add_run(
        "SPTA2026 – API Documentation v1.0.0\n"
        "The 6th Saudi International Physiotherapy Conference\n"
        "November 12–13, 2026  |  Almoosa Health, Al-Ahsa"
    )
    fr.font.size = Pt(9)
    fr.font.color.rgb = RGBColor(0x88, 0x88, 0x88)
    fr.font.italic = True

    # ── Save ──────────────────────────────────────────────────
    doc.save(OUTPUT_PATH)
    print("Document saved successfully:")
    print("   ", OUTPUT_PATH)


if __name__ == "__main__":
    build_document()
