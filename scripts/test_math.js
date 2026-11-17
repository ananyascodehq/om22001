const katex = require('katex');

function cleanMath(raw) {
  let s = raw.trim();
  if (s.startsWith('$$') && s.endsWith('$$')) return s.slice(2, -2).trim();
  if (s.startsWith('\\[') && s.endsWith('\\]')) return s.slice(2, -2).trim();
  if (s.startsWith('\\(') && s.endsWith('\\)')) return s.slice(2, -2).trim();
  if (s.startsWith('$') && s.endsWith('$')) return s.slice(1, -1).trim();
  return s;
}

const input = 'Original total score: $\\sum x_{wrong} = n \\times \\bar{x} = 100 \\times 40 = 4000$.';
const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$(?:\\\$|[^\$])+?\$)/g;

let lastIndex = 0;
let match;
while ((match = regex.exec(input)) !== null) {
  console.log('Plain before:', JSON.stringify(input.substring(lastIndex, match.index)));
  const raw = match[0];
  console.log('Matched raw:', JSON.stringify(raw));
  const formula = cleanMath(raw);
  console.log('Clean formula:', JSON.stringify(formula));
  const html = katex.renderToString(formula, { displayMode: false, throwOnError: false });
  console.log('Has katex-error:', html.includes('katex-error'));
  lastIndex = match.index + raw.length;
}
console.log('Trailing plain:', JSON.stringify(input.substring(lastIndex)));

