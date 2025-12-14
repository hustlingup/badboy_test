import os
import re
import glob

# Template for the new Soft Pop design
template = """<!DOCTYPE html>
<html lang="ko">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-0825L04287"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());

      gtag('config', 'G-0825L04287');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>나쁜남자 테스트 결과</title>
    <!-- Bootstrap CSS (kept for grid/layout, overridden by styles.css) -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6791974364232767"
     crossorigin="anonymous"></script>
</head>
<body>
    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="https://badboytest.info/">
            <img src="../img/logo.png" alt="Logo" width="40" height="40">
            BADBOY
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="https://badboytest.info/index.html">일반버전</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="https://badboytest.info/advanced_version/index.html">심화버전</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container mt-5" id="result-container">
        <div class="hero" style="padding: 1rem 0;">
            <p style="font-size: 1.5rem; color: #636e72; margin-bottom: 0.5rem;">{title_html}</p>
        </div>

        <div class="result-card" style="text-align: center;">
            <img src="{img_src}" alt="Result Image" class="img-fluid mb-3" style="border-radius: 30px; margin-bottom: 2rem; box-shadow: inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff; padding: 10px; background: #f0f4f8;">
            
            <h1 style="font-size: 2rem; font-weight: 800; color: #2d3436; margin-bottom: 1.5rem; line-height: 1.3;">{subtitle}</h1>
            
            <div style="font-size: 1.1rem; color: #636e72; line-height: 1.8; margin-bottom: 2rem; text-align: left; padding: 0 1rem;">
                {description}
            </div>

            <div style="background: #e0e5ec; border-radius: 20px; padding: 1.5rem; margin-top: 2rem; text-align: left; box-shadow: inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff;">
                <div style="font-weight: 800; color: #4ecdc4; margin-bottom: 0.5rem; font-size: 1.2rem;">💡 이 남자를 대할 때</div>
                <p style="margin-bottom: 0;">{advice}</p>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px; margin: 0 auto;">
            <button class="btn btn-primary" onclick="window.location.href='index.html'">다시하기</button>
            <button class="btn btn-danger" id="advanced-btn" onclick="window.location.href='advanced_version/index.html'">✨심화버전 하러가기✨</button>
        </div>

        <div class="result-card mt-5" style="text-align: center;">
            <h5><b>공유하기</b></h5>
            <div style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem;">
                <input type="text" value="https://badboytest.info/{filename}" id="copy-link" hidden>
                <div style="width: 60px; height: 60px; border-radius: 50%; background: #f0f4f8; box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer;" onclick="copyLink()">
                    <img src="../img/copylink.png" style="width: 30px; height: 30px; margin: 0;">
                </div>
                <a id="kakaotalk-sharing-btn" href="javascript:;">
                    <div style="width: 60px; height: 60px; border-radius: 50%; background: #f0f4f8; box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png" style="width: 30px; height: 30px; margin: 0;" alt="카카오톡 공유 보내기 버튼" />
                    </div>
                </a>
            </div>
        </div>
    </div>

    <!-- Include jQuery before script.js -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="script.js"></script>
    <!-- 공유기능 -->
    <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
    <script type='text/javascript'>
        Kakao.init('217174c0293ad5bcc1ff56a298a731a7');
        // // 카카오링크 버튼을 생성합니다. 처음 한번만 호출하면 됩니다.
        Kakao.Link.createCustomButton({{
        container: '#kakaotalk-sharing-btn',
        templateId: 111706
    }});
    </script>
    <script>
        function copyLink() {{
        var copyText = document.getElementById("copy-link");
        copyText.hidden = false;
        copyText.select();
        document.execCommand("copy");
        copyText.hidden = true;
        alert("URL을 복사했습니다.");
      }}
    </script>
</body>
<footer class="footer">
    <div class="container">
        <img src="../img/logo.png" alt="Logo" class="img-fluid mb-3" width="50">
        <h5 class="text-uppercase">BAD BOY TEST</h5>
        <p>나쁜남자 테스트</p>
        <div class="mt-3">
            <a href="about.html">About</a>
            <a href="privacy.html">Privacy</a>
            <a href="reference.html">Reference</a>
        </div>
        <p class="mb-0">© 2024 허슬업. All rights reserved.</p>
    </div>
</footer>
</html>"""

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already updated (check for Soft Pop specific class)
    if 'result-card' in content and 'hero' in content:
        print(f"Skipping {filepath} (already updated)")
        return

    # Extract Title (e.g., <h3><b>이 남자의 나쁜남자 성향</b> 0%</h3>)
    title_match = re.search(r'<h3>(.*?)</h3>', content, re.DOTALL)
    title_html = title_match.group(1).strip() if title_match else "결과"
    
    # Extract Image Src
    img_match = re.search(r'<img src="(.*?)"', content)
    img_src = img_match.group(1) if img_match else ""

    # Extract Subtitle (e.g., <h5><b>이 남자는 순도 100% 착한남자 입니다.</b></h5>)
    subtitle_match = re.search(r'<h5><b>(.*?)</b></h5>', content, re.DOTALL)
    subtitle = subtitle_match.group(1).strip() if subtitle_match else ""

    # Extract Description (Text after subtitle until next h5)
    # This is tricky as structure varies.
    # Pattern: <p class="mt-3"><h5>...</h5><br> DESCRIPTION </p>
    desc_match = re.search(r'</h5><br>\s*(.*?)\s*</p>', content, re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else ""
    
    # Extract Advice (Text after "이 남자를 대할때")
    # Pattern: <h5><b>이 남자를 대할때</b></h5><p>ADVICE</p>
    advice_match = re.search(r'이 남자를 대할때.*?</h5>\s*<p>\s*(.*?)\s*</p>', content, re.DOTALL)
    advice = advice_match.group(1).strip() if advice_match else "조언이 없습니다."

    filename = os.path.basename(filepath)
    
    new_content = template.format(
        title_html=title_html,
        img_src=img_src,
        subtitle=subtitle,
        description=description,
        advice=advice,
        filename=filename
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

# Process main version results
for filepath in glob.glob('result_*.html'):
    if 'result_0.html' in filepath: continue # Already done manually
    process_file(filepath)

print("Done updating main results.")
