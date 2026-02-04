const fs = require('fs');
const path = 'c:/Users/DELL/Documents/tailored-bridge-app/ai_prompting_only_for_local/5_implement_additional_routes_for_the_backend.md';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
const newLines = lines.map(line => {
    if (line.trim().startsWith('* `')) {
        return line.replace('* `', '* ✅ `');
    }
    return line;
});
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Updated additional routes markdown.');
