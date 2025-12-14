import os

def update_navbar(filepath, is_advanced=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if is_advanced:
        target = '<a class="nav-link" href="https://badboytest.info/advanced_version/index.html">심화버전</a>'
    else:
        target = '<a class="nav-link" href="https://badboytest.info/advanced_version/index.html">심화버전</a>'
        
    if '내 남자의 조건' in content:
        print(f"Already updated {filepath}")
        return

    # Find the list item containing the target link
    search_str = target
    idx = content.find(search_str)
    
    if idx != -1:
        # Find the closing </li> tag after the link
        close_li_idx = content.find('</li>', idx)
        if close_li_idx != -1:
            insert_point = close_li_idx + 5 # Length of </li>
            
            new_item = '\n                <li class="nav-item">\n                    <a class="nav-link" href="https://badboytest.info/myman/index.html">내 남자의 조건</a>\n                </li>'
            
            new_content = content[:insert_point] + new_item + content[insert_point:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
        else:
            print(f"Could not find closing li tag in {filepath}")
    else:
        print(f"Could not find target link in {filepath}")

# Update main index.html
update_navbar('index.html', is_advanced=False)

# Update advanced_version/index.html
update_navbar('advanced_version/index.html', is_advanced=True)
