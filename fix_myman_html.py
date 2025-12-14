import glob
import os

os.chdir('myman')
files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix og:image path (if it is just "main.png" or "main.jpg")
    # myman uses main.jpg
    content = content.replace('content="main.png"', 'content="img/main.jpg"')
    # Avoid double replacement if already correct
    if 'content="img/main.jpg"' not in content:
        content = content.replace('content="main.jpg"', 'content="img/main.jpg"')
    
    # Add favicon and apple-touch-icon if missing
    if '<link rel="icon"' not in content:
        # Insert before </head>
        head_end = content.find('</head>')
        if head_end != -1:
            links = '\n    <link rel="icon" href="img/favicon.png" type="image/png">\n    <link rel="apple-touch-icon" href="img/logo.png">'
            content = content[:head_end] + links + content[head_end:]
            
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {filepath}")
    else:
        print(f"No changes for {filepath}")
