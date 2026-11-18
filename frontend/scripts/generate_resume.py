from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
import os

pdf_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "public", "Lavan_Kumar_Resume.pdf")
os.makedirs(os.path.dirname(pdf_path), exist_ok=True)

doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#7C3AED")
text_dark = colors.HexColor("#19152B")
text_muted = colors.HexColor("#555068")

title_style = ParagraphStyle(
    'NameTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=text_dark,
)

subtitle_style = ParagraphStyle(
    'Subtitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=primary_color,
)

contact_style = ParagraphStyle(
    'Contact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_muted,
)

section_heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=primary_color,
    spaceAfter=4,
)

body_style = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=12.5,
    textColor=text_dark,
)

bold_style = ParagraphStyle(
    'BoldText',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9,
    leading=12.5,
    textColor=text_dark,
)

story = []

# Header
story.append(Paragraph("LAVAN KUMAR", title_style))
story.append(Paragraph("FULL STACK DEVELOPER", subtitle_style))
story.append(Spacer(1, 4))
story.append(Paragraph("Hyderabad, India  •  lavan.kumar@example.com  •  linkedin.com/in/lavan-kumar  •  github.com/lavan-kumar", contact_style))
story.append(Spacer(1, 8))
story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=2, spaceAfter=8))

# Summary
story.append(Paragraph("PROFESSIONAL SUMMARY", section_heading_style))
story.append(Paragraph(
    "Computer Science Engineering student and Full Stack Developer passionate about building modern, responsive, and scalable web applications. "
    "Proficient in React, Node.js, Python, Flask, and relational & NoSQL databases. Enjoys solving real-world problems through clean architecture and continuous learning.",
    body_style
))
story.append(Spacer(1, 10))

# Technical Skills
story.append(Paragraph("TECHNICAL SKILLS", section_heading_style))
skills_data = [
    [Paragraph("<b>Frontend:</b>", bold_style), Paragraph("HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS", body_style)],
    [Paragraph("<b>Backend:</b>", bold_style), Paragraph("Node.js, Express.js, Python, Flask", body_style)],
    [Paragraph("<b>Databases:</b>", bold_style), Paragraph("MongoDB, MySQL, PostgreSQL", body_style)],
    [Paragraph("<b>Languages:</b>", bold_style), Paragraph("Java, Python, JavaScript, SQL", body_style)],
    [Paragraph("<b>Tools & Platforms:</b>", bold_style), Paragraph("Git, GitHub, VS Code, Postman, Vercel, Render, Railway", body_style)]
]
skills_table = Table(skills_data, colWidths=[110, 430])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('TOPPADDING', (0,0), (-1,-1), 2),
]))
story.append(skills_table)
story.append(Spacer(1, 10))

# Experience & Internships
story.append(Paragraph("EXPERIENCE & INTERNSHIPS", section_heading_style))

# Bees Software
story.append(Paragraph("<b>Software Development Intern</b>  |  Bees Software Solutions <i>[Duration: Jun 2024 - Aug 2024 (Placeholder)]</i>", bold_style))
story.append(Paragraph("• Developed responsive web frontend components and integrated RESTful APIs with Node.js and Express.", body_style))
story.append(Paragraph("• Collaborated on code reviews, Git version control workflows, and debugging full stack application modules.", body_style))
story.append(Spacer(1, 5))

# Infosys Springboard
story.append(Paragraph("<b>Project Intern / Trainee</b>  |  Infosys Springboard <i>[Duration: Feb 2024 - Apr 2024 (Placeholder)]</i>", bold_style))
story.append(Paragraph("• Completed guided technical project track focused on Python, Artificial Intelligence, and full stack principles.", body_style))
story.append(Paragraph("• Implemented problem-solving algorithms and practiced test-driven development methodologies.", body_style))
story.append(Spacer(1, 5))

# Google Android
story.append(Paragraph("<b>Android Developer Virtual Intern</b>  |  Google for Developers / AICTE <i>[Duration: 2023 - 2024 (Placeholder)]</i>", bold_style))
story.append(Paragraph("• Engineered native mobile features using Kotlin, Android Studio, and Android Architecture Components.", body_style))
story.append(Paragraph("• Implemented Material Design guidelines, local database caching, and responsive mobile layouts.", body_style))
story.append(Spacer(1, 10))

# Projects
story.append(Paragraph("KEY PROJECTS", section_heading_style))

# Project 1
story.append(Paragraph("<b>Hospital Management System</b>  |  <i>Python, Flask/Django, MySQL, HTML, CSS, JavaScript</i>", bold_style))
story.append(Paragraph("• Built comprehensive healthcare portal managing patient admissions, doctor appointments, and medical record indexing.", body_style))
story.append(Paragraph("• Structured relational MySQL database schema with role-based authentication and secure query handling.", body_style))
story.append(Spacer(1, 5))

# Project 2
story.append(Paragraph("<b>Expense Tracker Web Application</b>  |  <i>React.js, Node.js, Express.js, MongoDB</i>", bold_style))
story.append(Paragraph("• Created full stack finance dashboard tracking categorical expenses, monthly budgets, and balance analytics.", body_style))
story.append(Paragraph("• Implemented RESTful CRUD endpoints with JWT authentication and responsive React state management.", body_style))
story.append(Spacer(1, 5))

# Project 3
story.append(Paragraph("<b>Automated Docstring Generator</b>  |  <i>Python, AST Module, Streamlit, PEP 257</i>", bold_style))
story.append(Paragraph("• Developed static code analysis utility parsing Abstract Syntax Trees to auto-generate standardized PEP 257 docstrings.", body_style))
story.append(Spacer(1, 5))

# Project 4
story.append(Paragraph("<b>Todo List Application</b>  |  <i>HTML, CSS, JavaScript, Node.js, Express.js, MySQL</i>", bold_style))
story.append(Paragraph("• Implemented task management application featuring CRUD operations, user sessions, and persistent storage.", body_style))
story.append(Spacer(1, 10))

# Education & Certifications
story.append(Paragraph("EDUCATION & CERTIFICATIONS", section_heading_style))
story.append(Paragraph("<b>B.Tech – Computer Science and Engineering</b>  |  Narsimha Reddy Engineering College, Hyderabad <i>[2021 – 2025]</i>", bold_style))
story.append(Paragraph("• Relevant Coursework: Data Structures, Database Systems, Computer Networks, Operating Systems, Web Technologies", body_style))
story.append(Spacer(1, 4))
story.append(Paragraph("<b>Certifications:</b> Java NPTEL (95% - Elite Score)  •  Python (GeeksforGeeks)  •  Google Android Virtual Internship  •  Infosys Springboard AI", body_style))

doc.build(story)
print("PDF resume generated successfully at:", pdf_path)

