import os

base_dir = os.path.dirname(os.path.dirname(__file__))
projects_dir = os.path.join(base_dir, "src", "assets", "projects")
certs_dir = os.path.join(base_dir, "src", "assets", "certificates")
os.makedirs(projects_dir, exist_ok=True)
os.makedirs(certs_dir, exist_ok=True)

# 1. Hospital Management System
hms_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <defs>
    <linearGradient id="bgGrad1" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#171326"/>
      <stop offset="100%" stop-color="#0B0914"/>
    </linearGradient>
    <linearGradient id="accentGrad1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#A78BFA"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="16" fill="url(#bgGrad1)"/>
  <rect x="40" y="40" width="720" height="420" rx="12" fill="#1F1A33" stroke="#302544" stroke-width="1.5"/>
  <!-- Top Bar -->
  <rect x="40" y="40" width="720" height="45" rx="12" fill="#251F3D"/>
  <circle cx="65" cy="62" r="6" fill="#EF4444"/>
  <circle cx="85" cy="62" r="6" fill="#F59E0B"/>
  <circle cx="105" cy="62" r="6" fill="#10B981"/>
  <text x="140" y="67" fill="#A78BFA" font-family="sans-serif" font-size="13" font-weight="600">Hospital Portal • Patient Admissions &amp; Records</text>
  <!-- Sidebar -->
  <rect x="60" y="110" width="160" height="330" rx="8" fill="#171326" stroke="#302544"/>
  <rect x="80" y="130" width="120" height="18" rx="4" fill="#7C3AED" fill-opacity="0.3"/>
  <rect x="80" y="160" width="100" height="14" rx="4" fill="#302544"/>
  <rect x="80" y="185" width="110" height="14" rx="4" fill="#302544"/>
  <rect x="80" y="210" width="90" height="14" rx="4" fill="#302544"/>
  <rect x="80" y="235" width="105" height="14" rx="4" fill="#302544"/>
  <!-- Main Stats -->
  <rect x="240" y="110" width="150" height="85" rx="8" fill="#251F3D" stroke="#302544"/>
  <text x="255" y="140" fill="#B8B2C9" font-family="sans-serif" font-size="12">Total Patients</text>
  <text x="255" y="175" fill="#F8FAFC" font-family="sans-serif" font-size="24" font-weight="bold">1,248</text>
  <rect x="410" y="110" width="150" height="85" rx="8" fill="#251F3D" stroke="#302544"/>
  <text x="425" y="140" fill="#B8B2C9" font-family="sans-serif" font-size="12">Appointments</text>
  <text x="425" y="175" fill="#A78BFA" font-family="sans-serif" font-size="24" font-weight="bold">84 Today</text>
  <rect x="580" y="110" width="155" height="85" rx="8" fill="#251F3D" stroke="#302544"/>
  <text x="595" y="140" fill="#B8B2C9" font-family="sans-serif" font-size="12">Doctors Active</text>
  <text x="595" y="175" fill="#10B981" font-family="sans-serif" font-size="24" font-weight="bold">32 On-Duty</text>
  <!-- Table Mock -->
  <rect x="240" y="215" width="495" height="225" rx="8" fill="#171326" stroke="#302544"/>
  <rect x="255" y="235" width="465" height="25" rx="4" fill="#251F3D"/>
  <rect x="255" y="270" width="465" height="20" rx="4" fill="#1F1A33"/>
  <rect x="255" y="300" width="465" height="20" rx="4" fill="#1F1A33"/>
  <rect x="255" y="330" width="465" height="20" rx="4" fill="#1F1A33"/>
  <rect x="255" y="360" width="465" height="20" rx="4" fill="#1F1A33"/>
  <rect x="255" y="390" width="465" height="20" rx="4" fill="#1F1A33"/>
</svg>"""

with open(os.path.join(projects_dir, "hospital-system.svg"), "w") as f:
    f.write(hms_svg)

# 2. Expense Tracker
et_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#110E1C"/>
      <stop offset="100%" stop-color="#1A142D"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="16" fill="url(#bgGrad2)"/>
  <rect x="40" y="40" width="720" height="420" rx="12" fill="#171326" stroke="#302544" stroke-width="1.5"/>
  <rect x="40" y="40" width="720" height="45" rx="12" fill="#201938"/>
  <circle cx="65" cy="62" r="6" fill="#EF4444"/>
  <circle cx="85" cy="62" r="6" fill="#F59E0B"/>
  <circle cx="105" cy="62" r="6" fill="#10B981"/>
  <text x="140" y="67" fill="#A78BFA" font-family="sans-serif" font-size="13" font-weight="600">Personal Expense Tracker • MERN Stack Analytics</text>
  <!-- Card 1: Balance -->
  <rect x="70" y="110" width="310" height="140" rx="10" fill="#251F3D" stroke="#302544"/>
  <text x="95" y="145" fill="#B8B2C9" font-family="sans-serif" font-size="13">Total Net Balance</text>
  <text x="95" y="185" fill="#F8FAFC" font-family="sans-serif" font-size="32" font-weight="bold">$12,450.00</text>
  <text x="95" y="220" fill="#10B981" font-family="sans-serif" font-size="12">▲ +14.2% from last month</text>
  <!-- Card 2: Spending Chart -->
  <rect x="410" y="110" width="320" height="140" rx="10" fill="#251F3D" stroke="#302544"/>
  <path d="M 430 210 Q 470 140 510 170 T 590 130 T 670 180 T 700 150" stroke="#7C3AED" stroke-width="3" fill="none"/>
  <circle cx="590" cy="130" r="4" fill="#A78BFA"/>
  <text x="430" y="145" fill="#B8B2C9" font-family="sans-serif" font-size="13">Monthly Expense Trend</text>
  <!-- Transactions list -->
  <rect x="70" y="270" width="660" height="170" rx="10" fill="#1C172E" stroke="#302544"/>
  <text x="95" y="300" fill="#F8FAFC" font-family="sans-serif" font-size="14" font-weight="600">Recent Transactions</text>
  <rect x="95" y="318" width="610" height="30" rx="6" fill="#251F3D"/>
  <rect x="95" y="356" width="610" height="30" rx="6" fill="#251F3D"/>
  <rect x="95" y="394" width="610" height="30" rx="6" fill="#251F3D"/>
</svg>"""

with open(os.path.join(projects_dir, "expense-tracker.svg"), "w") as f:
    f.write(et_svg)

# 3. Todo List Application
todo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <defs>
    <linearGradient id="bgGrad3" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#140F24"/>
      <stop offset="100%" stop-color="#1D1735"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="16" fill="url(#bgGrad3)"/>
  <rect x="40" y="40" width="720" height="420" rx="12" fill="#171326" stroke="#302544" stroke-width="1.5"/>
  <rect x="40" y="40" width="720" height="45" rx="12" fill="#221A3B"/>
  <circle cx="65" cy="62" r="6" fill="#EF4444"/>
  <circle cx="85" cy="62" r="6" fill="#F59E0B"/>
  <circle cx="105" cy="62" r="6" fill="#10B981"/>
  <text x="140" y="67" fill="#A78BFA" font-family="sans-serif" font-size="13" font-weight="600">Task Manager • CRUD &amp; User Authentication</text>
  <!-- Central Todo Board -->
  <rect x="180" y="110" width="440" height="330" rx="12" fill="#201938" stroke="#302544"/>
  <text x="210" y="145" fill="#F8FAFC" font-family="sans-serif" font-size="16" font-weight="bold">Tasks Today (4/6 Completed)</text>
  <rect x="210" y="170" width="380" height="42" rx="8" fill="#282046" stroke="#7C3AED" stroke-width="1"/>
  <rect x="225" y="184" width="14" height="14" rx="3" fill="#7C3AED"/>
  <text x="250" y="196" fill="#F8FAFC" font-family="sans-serif" font-size="13">Implement JWT Authentication middleware</text>
  <rect x="210" y="222" width="380" height="42" rx="8" fill="#282046"/>
  <rect x="225" y="236" width="14" height="14" rx="3" fill="#7C3AED"/>
  <text x="250" y="248" fill="#F8FAFC" font-family="sans-serif" font-size="13">Design MySQL Database schema &amp; relations</text>
  <rect x="210" y="274" width="380" height="42" rx="8" fill="#282046"/>
  <rect x="225" y="288" width="14" height="14" rx="3" stroke="#A78BFA" stroke-width="1.5" fill="none"/>
  <text x="250" y="300" fill="#B8B2C9" font-family="sans-serif" font-size="13">Optimize REST API endpoints response time</text>
  <rect x="210" y="326" width="380" height="42" rx="8" fill="#282046"/>
  <rect x="225" y="340" width="14" height="14" rx="3" stroke="#A78BFA" stroke-width="1.5" fill="none"/>
  <text x="250" y="352" fill="#B8B2C9" font-family="sans-serif" font-size="13">Deploy application container to production</text>
</svg>"""

with open(os.path.join(projects_dir, "todo-app.svg"), "w") as f:
    f.write(todo_svg)

# 4. Automated Docstring Generator
doc_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" fill="none">
  <defs>
    <linearGradient id="bgGrad4" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0E0B1A"/>
      <stop offset="100%" stop-color="#1B142F"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" rx="16" fill="url(#bgGrad4)"/>
  <rect x="40" y="40" width="720" height="420" rx="12" fill="#171326" stroke="#302544" stroke-width="1.5"/>
  <rect x="40" y="40" width="720" height="45" rx="12" fill="#221A3B"/>
  <circle cx="65" cy="62" r="6" fill="#EF4444"/>
  <circle cx="85" cy="62" r="6" fill="#F59E0B"/>
  <circle cx="105" cy="62" r="6" fill="#10B981"/>
  <text x="140" y="67" fill="#A78BFA" font-family="sans-serif" font-size="13" font-weight="600">Docstring Auto-Gen • Python AST &amp; PEP 257 Compliant</text>
  <!-- Split Code View -->
  <rect x="65" y="110" width="315" height="325" rx="8" fill="#1F1836" stroke="#302544"/>
  <text x="85" y="140" fill="#F59E0B" font-family="monospace" font-size="12">def calculate_metrics(data, factor):</text>
  <text x="110" y="165" fill="#B8B2C9" font-family="monospace" font-size="12">res = [x * factor for x in data]</text>
  <text x="110" y="190" fill="#B8B2C9" font-family="monospace" font-size="12">return sum(res)</text>
  
  <rect x="415" y="110" width="325" height="325" rx="8" fill="#140E26" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="435" y="140" fill="#10B981" font-family="monospace" font-size="12">\"\"\"Calculate aggregated metrics.</text>
  <text x="435" y="170" fill="#A78BFA" font-family="monospace" font-size="11">Args:</text>
  <text x="450" y="195" fill="#B8B2C9" font-family="monospace" font-size="11">data (list): Raw numeric dataset</text>
  <text x="450" y="220" fill="#B8B2C9" font-family="monospace" font-size="11">factor (float): Multiplier scalar</text>
  <text x="435" y="250" fill="#A78BFA" font-family="monospace" font-size="11">Returns:</text>
  <text x="450" y="275" fill="#B8B2C9" font-family="monospace" font-size="11">float: Scaled cumulative sum</text>
  <text x="435" y="305" fill="#10B981" font-family="monospace" font-size="12">\"\"\"</text>
</svg>"""

with open(os.path.join(projects_dir, "docstring-generator.svg"), "w") as f:
    f.write(doc_svg)

# Certificate SVGs
cert_template = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" fill="none">
  <defs>
    <linearGradient id="certGrad{id}" x1="0" y1="0" x2="600" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#1E1933"/>
      <stop offset="100%" stop-color="#120E21"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" rx="16" fill="url(#certGrad{id})"/>
  <rect x="25" y="25" width="550" height="350" rx="10" fill="none" stroke="{accent}" stroke-width="2" stroke-dasharray="6 4"/>
  <circle cx="300" cy="110" r="40" fill="{accent}" fill-opacity="0.15"/>
  <text x="300" y="118" text-anchor="middle" fill="{accent}" font-family="sans-serif" font-size="28" font-weight="bold">★</text>
  <text x="300" y="185" text-anchor="middle" fill="#F8FAFC" font-family="sans-serif" font-size="20" font-weight="bold">{title}</text>
  <text x="300" y="215" text-anchor="middle" fill="{accent}" font-family="sans-serif" font-size="15" font-weight="600">{issuer}</text>
  <text x="300" y="250" text-anchor="middle" fill="#B8B2C9" font-family="sans-serif" font-size="13">{score}</text>
  <text x="300" y="315" text-anchor="middle" fill="#686477" font-family="sans-serif" font-size="11">Awarded to Lavan Kumar • Verified Credential</text>
</svg>"""

certs = [
    ("nptel-java.svg", "1", "#7C3AED", "Java Programming (NPTEL)", "NPTEL • IIT Kharagpur", "Score: 95% (Elite + Gold)"),
    ("python-gfg.svg", "2", "#10B981", "Python Programming", "GeeksforGeeks", "Certified Professional Python"),
    ("google-android.svg", "3", "#3B82F6", "Android Developer Virtual Internship", "Google for Developers / AICTE", "Mobile Application Architecture"),
    ("infosys-ai.svg", "4", "#F59E0B", "Artificial Intelligence & Full Stack", "Infosys Springboard", "Technical Project Trainee"),
]

for filename, cid, acc, tit, iss, sco in certs:
    svg_code = cert_template.format(id=cid, accent=acc, title=tit, issuer=iss, score=sco)
    with open(os.path.join(certs_dir, filename), "w") as f:
        f.write(svg_code)

print("All project and certificate preview assets generated successfully!")

