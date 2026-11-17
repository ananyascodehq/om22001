const fs = require('fs');

function extractConversation(filename) {
  const data = JSON.parse(fs.readFileSync(filename));
  console.log(`\n==================================================`);
  console.log(`FILE: ${filename} | TITLE: "${data.title}"`);
  console.log(`==================================================`);
  const mapping = data.mapping || {};
  const messages = [];
  for (const id in mapping) {
    const node = mapping[id];
    if (node.message && node.message.content && node.message.content.parts) {
      const role = node.message.author?.role;
      const text = node.message.content.parts.filter(p => typeof p === 'string').join('\n');
      if (text && (role === 'user' || role === 'assistant')) {
        messages.push({ role, text, time: node.message.create_time });
      }
    }
  }
  messages.sort((a, b) => (a.time || 0) - (b.time || 0));

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    console.log(`--- [${i + 1}] ${m.role.toUpperCase()} (${m.text.length} chars) ---`);
    console.log(m.text.slice(0, 300).replace(/\r?\n/g, ' '));
  }
}

for (let i = 1; i <= 8; i++) {
  extractConversation(`scratch_chat_${i}.json`);
}

