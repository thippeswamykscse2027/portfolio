import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def create_resume(pdf_path):
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=32,
        bottomMargin=32
    )

    styles = getSampleStyleSheet()

    # Custom typography
    name_style = ParagraphStyle(
        'Name',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#0f172a')
    )

    contact_style = ParagraphStyle(
        'Contact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        alignment=TA_CENTER,
        textColor=colors.HexColor('#334155')
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#0369a1'),
        spaceAfter=2,
        spaceBefore=4
    )

    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=colors.HexColor('#0f172a')
    )

    job_meta = ParagraphStyle(
        'JobMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=colors.HexColor('#475569')
    )

    date_style = ParagraphStyle(
        'DateStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#475569')
    )

    bullet_style = ParagraphStyle(
        'Bullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1e293b'),
        leftIndent=12,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor('#1e293b')
    )

    story = []

    # Header
    story.append(Paragraph("Thippeswamy K S", name_style))
    story.append(Spacer(1, 3))
    contact_text = "thippeswamyks.cse.2027@gmail.com &bull; +91 6363689087 &bull; Bengaluru, Karnataka, India &bull; LinkedIn &bull; GitHub"
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 5))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0284c7'), spaceAfter=5))

    # SUMMARY
    story.append(Paragraph("SUMMARY", section_heading))
    summary_text = (
        "Computer Science Engineering student with strong skills in Java, C++, Data Structures, and Full Stack Development. "
        "Passionate about AI, cloud technologies, and building real-world software solutions through internships and academic projects."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 5))

    # EDUCATION
    story.append(Paragraph("EDUCATION", section_heading))
    edu1_left = "<b>The Oxford College of Engineering</b><br/>Bachelor of Engineering, Computer Science | CGPA: 8.4/10"
    edu1_right = "2024 &ndash; 2027"
    table_data = [[Paragraph(edu1_left, body_style), Paragraph(edu1_right, date_style)]]
    t1 = Table(table_data, colWidths=[420, 120])
    t1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t1)

    edu2_left = "<b>Government Polytechnic Lingasugur</b><br/>Diploma in Computer Science | CGPA: 8.3/10"
    edu2_right = "2021 &ndash; 2023"
    table_data2 = [[Paragraph(edu2_left, body_style), Paragraph(edu2_right, date_style)]]
    t2 = Table(table_data2, colWidths=[420, 120])
    t2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 2), ('TOPPADDING', (0,0), (-1,-1), 1)]))
    story.append(t2)
    story.append(Spacer(1, 5))

    # INTERNSHIPS
    story.append(Paragraph("INTERNSHIP", section_heading))

    # Intern 1
    int1_left = "<b>Full Stack Development Intern</b> &ndash; <i>V V Technologies, Tumakuru</i>"
    int1_right = "Jun 2023 &ndash; Jul 2023"
    t_int1 = Table([[Paragraph(int1_left, body_style), Paragraph(int1_right, date_style)]], colWidths=[420, 120])
    t_int1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_int1)
    story.append(Paragraph("&bull; Completed a one-month internship in Full Stack Development.", bullet_style))
    story.append(Paragraph("&bull; Gained hands-on experience in project documentation and code development.", bullet_style))

    # Intern 2
    int2_left = "<b>Artificial Intelligence with ChatGPT Intern</b> &ndash; <i>InternForte</i>"
    int2_right = "Aug 2025 &ndash; Jan 2026"
    t_int2 = Table([[Paragraph(int2_left, body_style), Paragraph(int2_right, date_style)]], colWidths=[420, 120])
    t_int2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_int2)
    story.append(Paragraph("&bull; Completed a 10-week project-based internship in Artificial Intelligence with ChatGPT.", bullet_style))
    story.append(Paragraph("&bull; Built AI-based solutions using prompt engineering and generative AI concepts.", bullet_style))

    # Intern 3
    int3_left = "<b>Data Structure and Algorithm Intern</b> &ndash; <i>InternForte</i>"
    int3_right = "Feb 2026 &ndash; Aug 2026"
    t_int3 = Table([[Paragraph(int3_left, body_style), Paragraph(int3_right, date_style)]], colWidths=[420, 120])
    t_int3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 1), ('TOPPADDING', (0,0), (-1,-1), 1)]))
    story.append(t_int3)
    story.append(Paragraph("&bull; Completed a 10-week project-based internship in DSA using C++.", bullet_style))
    story.append(Paragraph("&bull; Strong understanding of arrays, linked lists, stacks, queues, trees, graphs, hashing, and dynamic programming.", bullet_style))
    story.append(Spacer(1, 5))

    # PROJECTS
    story.append(Paragraph("PROJECTS", section_heading))

    # Project 1
    p1_title = "<b>Credit Card Fraud Detection using Hidden Markov Model</b>"
    story.append(Paragraph(p1_title, body_style))
    story.append(Paragraph("<b>Technologies:</b> Java, Data Mining, Hidden Markov Model (HMM)", bullet_style))
    story.append(Paragraph("&bull; Developed a fraud detection system using the Hidden Markov Model to analyze transaction patterns and identify potentially fraudulent credit card transactions.", bullet_style))

    # Project 2
    p2_title = "<b>Smart Alarm System</b>"
    story.append(Paragraph(p2_title, body_style))
    story.append(Paragraph("<b>Technologies:</b> AWS SNS, Java, Cloud Computing", bullet_style))
    story.append(Paragraph("&bull; Built a cloud-based smart alarm system that sends real-time alert notifications using Amazon Simple Notification Service (SNS) when an alarm event is triggered.", bullet_style))

    # Project 3
    p3_title = "<b>Hotel Assistant Chatbot</b>"
    story.append(Paragraph(p3_title, body_style))
    story.append(Paragraph("<b>Technologies:</b> Python, Flask, HTML, CSS, JavaScript", bullet_style))
    story.append(Paragraph("&bull; Built an intelligent hotel assistant chatbot capable of answering customer queries, providing hotel information, and assisting with room booking-related requests in real time.", bullet_style))
    story.append(Spacer(1, 5))

    # TECHNICAL SKILLS
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    skills = [
        "<b>Programming Languages:</b> Java, C, C++, Python",
        "<b>Web Technologies:</b> HTML, CSS, JavaScript",
        "<b>Database:</b> MySQL",
        "<b>Core Concepts:</b> Data Structures and Algorithms, Object-Oriented Programming (OOP), DBMS, Operating Systems, Computer Networks",
        "<b>Libraries &amp; Frameworks:</b> OpenCV, Flask",
        "<b>Tools:</b> Git, GitHub, VS Code, Jupyter Notebook, Eclipse, XAMPP, AWS SNS"
    ]
    for s in skills:
        story.append(Paragraph(f"&bull; {s}", bullet_style))
    story.append(Spacer(1, 5))

    # ACHIEVEMENTS
    story.append(Paragraph("ACHIEVEMENTS", section_heading))
    story.append(Paragraph("&bull; Attended workshops on Machine Learning, Cloud Computing, IoT (Arduino)", bullet_style))

    doc.build(story)
    print("Resume PDF generated successfully!")

if __name__ == '__main__':
    target = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'Thippeswamy_KS_Resume.pdf')
    create_resume(target)
