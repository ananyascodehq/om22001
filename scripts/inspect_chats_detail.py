import json, os

for i in range(1, 9):
    path = f'd:/OM22001/om22001-stats-hub/scratch_chat_{i}.json'
    if not os.path.exists(path):
        continue
    with open(path, 'r', encoding='utf-8') as f:
        d = json.load(f)
    mapping = d.get('mapping', {})
    asst_msgs = []
    for k, v in mapping.items():
        msg = v.get('message')
        if msg and msg.get('author', {}).get('role') == 'assistant':
            parts = msg.get('content', {}).get('parts', [])
            txt = '\n'.join([p for p in parts if isinstance(p, str)])
            if len(txt) > 200:
                asst_msgs.append((msg.get('create_time') or 0, txt))
    asst_msgs.sort(key=lambda x: x[0])
    total_len = sum(len(m[1]) for m in asst_msgs)
    print(f'Chat {i}: "{d.get("title")}" | {len(asst_msgs)} substantive answers | {total_len:,} chars')

