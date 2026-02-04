const fs = require('fs');
const path = 'c:/Users/DELL/Documents/tailored-bridge-app/ai_prompting_only_for_local/6_implement_advanced_routes_for_the_backend_server.md';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');
const newLines = lines.map(line => {
    // Matches patterns like "1. `GET /api..." or "55. `GET /api..."
    if (/^\d+\.\s`[A-Z]+/.test(line.trim())) {
        return line.replace(/^(\d+\.)\s`/, '$1 ✅ `');
    }
    return line;
});
fs.writeFileSync(path, newLines.join('\n'), 'utf8');
console.log('Updated advanced routes markdown.');
