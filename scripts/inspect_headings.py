import json, re

def inspect_chat(file_num, filename):
    with open(f'd:/OM22001/om22001-stats-hub/{filename}', 'r', encoding='utf-8') as f:
        d = json.load(f)
    print(f"\n==========================================")
    print(f"Chat {file_num}: {d.get('title')} ({filename})")
    print(f"==========================================")
    
    mapping = d.get('mapping', {})
    curr = d.get('current_node')
    nodes = []
    while curr and curr in mapping:
        node = mapping[curr]
        if node.get('message'):
            nodes.append(node)
        curr = node.get('parent')
    nodes.reverse()
    
    for n in nodes:
        m = n['message']
        role = m['author']['role']
        if role == 'assistant':
            txt = ''.join([p for p in m['content'].get('parts', []) if isinstance(p, str)])
            if len(txt) > 300:
                headings = [line.strip() for line in txt.split('\n') if line.strip().startswith('#') or re.match(r'^[0-9]+[\.\)]', line.strip())]
                print(f"Assistant message ({len(txt)} chars) headings: {headings[:8]}")

for i in range(1, 9):
    inspect_chat(i, f'scratch_chat_{i}.json')

