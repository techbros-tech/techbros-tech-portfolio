const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

console.log('🔍 Checking image sizes in public directory...\n');
console.log('='.repeat(80));

// Find all website-landing images
const files = fs.readdirSync(publicDir);
const imageFiles = files.filter(file => file.startsWith('website-landing-') && file.endsWith('.jpg'));

if (imageFiles.length === 0) {
  console.log('❌ No website-landing-*.jpg files found!');
  process.exit(1);
}

// Sort files numerically
imageFiles.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0]);
  const numB = parseInt(b.match(/\d+/)[0]);
  return numA - numB;
});

let totalSize = 0;
const imageData = [];

console.log('📊 Image File Analysis:\n');
console.log('File Name'.padEnd(30) + 'Size'.padEnd(15) + 'Status');
console.log('-'.repeat(80));

imageFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  const stats = fs.statSync(filePath);
  const sizeInBytes = stats.size;
  const sizeInKB = (sizeInBytes / 1024).toFixed(2);
  const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

  totalSize += sizeInBytes;

  let sizeDisplay;
  let status;

  if (sizeInBytes < 1024 * 100) {
    // Less than 100KB - Excellent
    sizeDisplay = `${sizeInKB} KB`;
    status = '✅ Excellent';
  } else if (sizeInBytes < 1024 * 200) {
    // 100KB - 200KB - Good
    sizeDisplay = `${sizeInKB} KB`;
    status = '✅ Good';
  } else if (sizeInBytes < 1024 * 500) {
    // 200KB - 500KB - Acceptable
    sizeDisplay = `${sizeInKB} KB`;
    status = '⚠️  Acceptable';
  } else if (sizeInBytes < 1024 * 1024) {
    // 500KB - 1MB - Large
    sizeDisplay = `${sizeInKB} KB`;
    status = '🔴 Large';
  } else {
    // Over 1MB - Too Large
    sizeDisplay = `${sizeInMB} MB`;
    status = '🔴 TOO LARGE!';
  }

  imageData.push({
    name: file,
    bytes: sizeInBytes,
    display: sizeDisplay,
    status: status
  });

  console.log(file.padEnd(30) + sizeDisplay.padEnd(15) + status);
});

console.log('='.repeat(80));

// Summary statistics
const totalSizeKB = (totalSize / 1024).toFixed(2);
const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);
const averageSize = totalSize / imageFiles.length;
const averageSizeKB = (averageSize / 1024).toFixed(2);

console.log('\n📈 SUMMARY STATISTICS:\n');
console.log(`Total Images Found:     ${imageFiles.length}`);
console.log(`Total Size:             ${totalSizeKB} KB (${totalSizeMB} MB)`);
console.log(`Average Size per Image: ${averageSizeKB} KB`);

// Find largest and smallest
const largest = imageData.reduce((max, img) => img.bytes > max.bytes ? img : max);
const smallest = imageData.reduce((min, img) => img.bytes < min.bytes ? img : min);

console.log(`\nLargest Image:          ${largest.name} (${largest.display})`);
console.log(`Smallest Image:         ${smallest.name} (${smallest.display})`);

// Performance analysis
console.log('\n⚡ PERFORMANCE IMPACT ANALYSIS:\n');

const problematicImages = imageData.filter(img => img.bytes > 500 * 1024);
const largeImages = imageData.filter(img => img.bytes > 200 * 1024 && img.bytes <= 500 * 1024);
const goodImages = imageData.filter(img => img.bytes <= 200 * 1024);

console.log(`🔴 Problematic (>500KB):     ${problematicImages.length} images`);
console.log(`⚠️  Large (200-500KB):       ${largeImages.length} images`);
console.log(`✅ Good (≤200KB):            ${goodImages.length} images`);

// Recommendations
console.log('\n💡 RECOMMENDATIONS:\n');

if (problematicImages.length > 0) {
  console.log('🔴 CRITICAL: You have images over 500KB!');
  console.log('   - These MUST be optimized immediately');
  console.log('   - Target: <150KB per image for optimal performance');
  console.log('   - Use tools like: sharp, imagemin, or Squoosh.app');
  console.log('   - Consider WebP or AVIF format for better compression\n');
}

if (largeImages.length > 0) {
  console.log('⚠️  WARNING: You have images between 200-500KB');
  console.log('   - These should be optimized for better performance');
  console.log('   - Recommended size: <150KB\n');
}

if (totalSize > 5 * 1024 * 1024) {
  console.log('🔴 TOTAL SIZE TOO LARGE!');
  console.log(`   - Current total: ${totalSizeMB} MB`);
  console.log('   - Loading all images will cause significant performance issues');
  console.log('   - With parallax animations, this will cause major frame drops');
  console.log('   - Implement lazy loading AND optimize images\n');
}

// Estimate performance impact
const imagesPerSection = 12; // Default from your code
const sectionsVisible = 1; // Typically 1 section visible at a time
const simultaneousImages = imagesPerSection * 3; // 3 columns on desktop
const dataLoadedPerSection = (totalSize / imageFiles.length) * simultaneousImages;
const dataLoadedMB = (dataLoadedPerSection / (1024 * 1024)).toFixed(2);

console.log('📊 ESTIMATED LOAD PER SECTION:');
console.log(`   - Images per section: ~${simultaneousImages} images (3 columns × ${imagesPerSection})`);
console.log(`   - Data loaded: ~${dataLoadedMB} MB per section`);
console.log(`   - With 4 sections total: ~${(dataLoadedMB * 4).toFixed(2)} MB total\n`);

if (dataLoadedMB > 3) {
  console.log('🔴 This is causing your performance issues!');
  console.log('   - Loading this much data while animating causes the browser to struggle');
  console.log('   - Combined with parallax animations = 1500ms+ frame drops\n');
}

console.log('='.repeat(80));
console.log('\n✅ Analysis complete!\n');
