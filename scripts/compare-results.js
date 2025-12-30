const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const optimizedDir = path.join(publicDir, 'optimized');

console.log('\n' + '='.repeat(80));
console.log('📊 OPTIMIZATION RESULTS COMPARISON\n');
console.log('='.repeat(80) + '\n');

const files = fs.readdirSync(publicDir)
  .filter(f => f.startsWith('website-landing-') && f.endsWith('.jpg'))
  .sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));

console.log('Image'.padEnd(25) + 'Before'.padEnd(15) + 'After'.padEnd(15) + 'Saved'.padEnd(10) + 'Status');
console.log('-'.repeat(80));

let maxSavings = { file: '', savings: 0, before: 0, after: 0 };

files.forEach(file => {
  const originalPath = path.join(publicDir, file);
  const optimizedPath = path.join(optimizedDir, file);
  
  const originalSize = fs.statSync(originalPath).size;
  const optimizedSize = fs.statSync(optimizedPath).size;
  const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  if (parseFloat(savings) > maxSavings.savings) {
    maxSavings = { file, savings: parseFloat(savings), before: originalSize, after: optimizedSize };
  }
  
  const formatSize = (bytes) => {
    if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };
  
  let status = '✅';
  if (optimizedSize < 100 * 1024) status = '🌟 Excellent';
  else if (optimizedSize < 150 * 1024) status = '✅ Great';
  else if (optimizedSize < 200 * 1024) status = '👍 Good';
  
  console.log(
    file.padEnd(25) + 
    formatSize(originalSize).padEnd(15) + 
    formatSize(optimizedSize).padEnd(15) + 
    `${savings}%`.padEnd(10) +
    status
  );
});

console.log('='.repeat(80));

console.log('\n🏆 BIGGEST WIN:');
const formatSize = (bytes) => {
  if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(2)} KB`;
};
console.log(`   ${maxSavings.file}: ${formatSize(maxSavings.before)} → ${formatSize(maxSavings.after)}`);
console.log(`   Reduction: ${maxSavings.savings}% (Saved ${formatSize(maxSavings.before - maxSavings.after)})`);

console.log('\n' + '='.repeat(80) + '\n');
