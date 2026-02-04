const fs = require('fs');
const path = 'c:/Users/DELL/Documents/tailored-bridge-app/ai_prompting_only_for_local/1_creating_the_express_js_server.md';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
const newLines = lines.map(line => {
    if (/^\d+\. `/.test(line)) {
        return line.replace(/^(\d+\.) `/, '$1 ✅ `');
    }
    return line;
});
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Updated markdown file.');
