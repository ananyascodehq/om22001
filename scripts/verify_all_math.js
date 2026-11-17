const fs = require('fs');
const path = require('path');
const katex = require('katex');

function cleanMath(raw) {
  let s = raw.trim();
  if (s.startsWith('$$') && s.endsWith('$$')) return s.slice(2, -2).trim();
  if (s.startsWith('\\[') && s.endsWith('\\]')) return s.slice(2, -2).trim();
  if (s.startsWith('\\(') && s.endsWith('\\)')) return s.slice(2, -2).trim();
  if (s.startsWith('$') && s.endsWith('$')) return s.slice(1, -1).trim();
  return s;
}

const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$(?:\\\$|[^\$])+?\$)/g;

let totalChecked = 0;
let errors = [];

function checkText(txt, source) {
  if (!txt) return;
  let match;
  regex.lastIndex = 0;
  while ((match = regex.exec(txt)) !== null) {
    totalChecked++;
    const raw = match[0];
    const isBlock = raw.startsWith('$$') || raw.startsWith('\\[');
    const formula = cleanMath(raw);
    try {
      const html = katex.renderToString(formula, { displayMode: isBlock, throwOnError: false });
      if (html.includes('katex-error')) {
        errors.push({ source, raw, formula, errorSnippet: html.slice(0, 150) });
      }
    } catch (e) {
      errors.push({ source, raw, formula, exception: e.message });
    }
  }
}

// Check sem json files
const semDir = path.join(__dirname, '..', 'content', 'sem');
if (fs.existsSync(semDir)) {
  for (const f of fs.readdirSync(semDir)) {
    if (!f.endsWith('.json')) continue;
    const data = JSON.parse(fs.readFileSync(path.join(semDir, f), 'utf8'));
    for (const q of (data.questions || [])) {
      checkText(q.questionText, `${f} ${q.id} qText`);
      if (q.answer?.steps) {
        q.answer.steps.forEach((s, idx) => checkText(s, `${f} ${q.id} step ${idx}`));
      }
      if (q.answer?.finalAnswer) {
        checkText(q.answer.finalAnswer, `${f} ${q.id} finalAnswer`);
      }
    }
  }
}

// Check fat json files
const fatDir = path.join(__dirname, '..', 'content', 'fat');
if (fs.existsSync(fatDir)) {
  for (const f of fs.readdirSync(fatDir)) {
    if (!f.endsWith('.json')) continue;
    const data = JSON.parse(fs.readFileSync(path.join(fatDir, f), 'utf8'));
    for (const q of (data.questions || [])) {
      checkText(q.questionText, `${f} ${q.id} qText`);
      if (q.answer?.steps) {
        q.answer.steps.forEach((s, idx) => checkText(s, `${f} ${q.id} step ${idx}`));
      }
      if (q.answer?.finalAnswer) {
        checkText(q.answer.finalAnswer, `${f} ${q.id} finalAnswer`);
      }
    }
  }
}

console.log('Total math expressions checked:', totalChecked);
console.log('Errors found:', errors.length);
if (errors.length > 0) {
  console.log('Errors:', JSON.stringify(errors, null, 2));
}
