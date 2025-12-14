import glob
import os

os.chdir('advanced_version')
files = glob.glob('*.html')

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Fix logo path
    content = content.replace('src="../img/logo.png"', 'src="img/logo.png"')
    
    # Fix main image path and result image paths
    # Replace ../advanced_version/img/ with img/
    content = content.replace('src="../advanced_version/img/', 'src="img/')
    
    # Also check for direct usage of main.png without path if any (though unlikely to be broken if it was working)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed paths in {filepath}")
    else:
        print(f"No path changes for {filepath}")
