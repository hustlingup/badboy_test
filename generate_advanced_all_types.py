import os
import re

base_path = r"c:\Users\EFHYDRO\Desktop\개인\나쁜남자테스트\badboy_test\badboy_test\advanced_version"
output_html = '<div id="all" class="mt-5">\n    <h3 style="font-weight: 800; margin-bottom: 2rem;">심화버전 모든 유형 둘러보기</h3>\n    <p>본 내용은 심화 테스트 결과를 간략히 요약한 내용입니다.</p>\n    <p>자세한 내용은 테스트를 통해서 알아보세요!</p>\n    <br>\n'

for i in range(8):
    file_path = os.path.join(base_path, f"result_{i}.html")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
            # Extract title
            title_match = re.search(r'<h4[^>]*>(.*?)</h4>', content)
            title = title_match.group(1) if title_match else "Unknown Title"
            
            # Extract description (first sentence or short summary)
            desc_match = re.search(r'<div style="font-size: 1.1rem;[^>]*>(.*?)</div>', content, re.DOTALL)
            if desc_match:
                full_desc = desc_match.group(1).strip()
                clean_desc = re.sub(r'<br\s*/?>', ' ', full_desc)
                clean_desc = re.sub(r'\s+', ' ', clean_desc).strip()
                if len(clean_desc) > 80:
                    summary = clean_desc[:80] + "..."
                else:
                    summary = clean_desc
            else:
                summary = "설명이 없습니다."
            
            output_html += f'''
    <div class="result-card">
        <img src="img/{i}.jpg" alt="{title}">
        <div class="result-content">
            <h5><b>{title}</b></h5>
            <p>{summary}</p>
        </div>
    </div>
'''

output_html += '</div>'

with open("advanced_all_types.html", "w", encoding="utf-8") as f:
    f.write(output_html)
