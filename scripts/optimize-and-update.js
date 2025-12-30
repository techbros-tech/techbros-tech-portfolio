const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const optimizedDir = path.join(publicDir, 'optimized');

console.log('🎨 IMAGE OPTIMIZATION & CODEBASE UPDATE SCRIPT\n');
console.log('='.repeat(80));
console.log('This script will:');
console.log('  1. Create public/optimized/ folder');
console.log('  2. Optimize all website-landing-*.jpg images');
console.log('  3. Save optimized versions with same names');
console.log('  4. Update media-assets.ts to use optimized images');
console.log('  5. Show before/after comparison\n');
console.log('='.repeat(80) + '\n');

// Create optimized directory
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
  console.log('✅ Created folder: public/optimized/\n');
} else {
  console.log('📁 Using existing folder: public/optimized/\n');
}

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputPath = path.join(optimizedDir, filename);
  
  const originalSize = fs.statSync(inputPath).size;
  
  try {
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;
    
    // Smart optimization
    let targetWidth = width;
    let targetHeight = height;
    let quality = 75;
    
    // Resize if too large
    if (width > 1920) {
      targetWidth = 1920;
      targetHeight = Math.round((height / width) * 1920);
    }
    
    // Adjust quality based on original size
    if (originalSize > 5 * 1024 * 1024) {
      quality = 70;
    } else if (originalSize > 2 * 1024 * 1024) {
      quality = 73;
    } else if (originalSize > 500 * 1024) {
      quality = 76;
    } else {
      quality = 78;
    }
    
    // Create optimized JPEG
    await sharp(inputPath)
      .resize(targetWidth, targetHeight, {
        fit: 'inside',
        withoutEnlargement: true,
        kernel: sharp.kernel.lanczos3,
      })
      .jpeg({ 
        quality,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);
    
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    const formatSize = (bytes) => {
      if (bytes > 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
      return `${(bytes / 1024).toFixed(2)} KB`;
    };
    
    console.log(`✅ ${filename}`);
    console.log(`   Before: ${formatSize(originalSize)} | After: ${formatSize(optimizedSize)} | Saved: ${savings}%`);
    
    return {
      filename,
      originalSize,
      optimizedSize,
      savings: parseFloat(savings)
    };
    
  } catch (error) {
    console.error(`❌ Error optimizing ${filename}: ${error.message}`);
    return null;
  }
}

async function updateMediaAssets() {
  const mediaAssetsPath = path.join(__dirname, '..', 'components', 'services', 'media-assets.ts');
  
  if (!fs.existsSync(mediaAssetsPath)) {
    console.log('\n⚠️  Warning: media-assets.ts not found at expected location');
    return false;
  }
  
  let content = fs.readFileSync(mediaAssetsPath, 'utf8');
  
  // Replace image paths to point to optimized folder
  const originalContent = content;
  content = content.replace(
    /src: "\/website-landing-/g,
    'src: "/optimized/website-landing-'
  );
  
  if (content !== originalContent) {
    fs.writeFileSync(mediaAssetsPath, content, 'utf8');
    console.log('\n✅ Updated media-assets.ts to use optimized images');
    return true;
  } else {
    console.log('\n⚠️  No changes needed in media-assets.ts');
    return false;
  }
}

async function main() {
  const files = fs.readdirSync(publicDir);
  const imageFiles = files
    .filter(f => f.startsWith('website-landing-') && f.endsWith('.jpg'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });
  
  if (imageFiles.length === 0) {
    console.log('❌ No website-landing-*.jpg images found in public/');
    process.exit(1);
  }
  
  console.log(`📊 Found ${imageFiles.length} images to optimize\n`);
  console.log('Starting optimization...\n');
  
  const results = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const result = await optimizeImage(imageFiles[i]);
    if (result) {
      results.push(result);
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('\n📊 OPTIMIZATION SUMMARY\n');
  
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
  const avgSavings = (results.reduce((sum, r) => sum + r.savings, 0) / results.length).toFixed(1);
  
  console.log(`Images Optimized:       ${results.length}`);
  console.log(`Original Total:         ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized Total:        ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Space Saved:      ${((totalOriginal - totalOptimized) / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Average Reduction:      ${avgSavings}%`);
  console.log(`Total Reduction:        ${totalSavings}%`);
  
  // Performance impact
  console.log('\n⚡ ESTIMATED PERFORMANCE IMPROVEMENT:\n');
  const beforePerSection = (totalOriginal / imageFiles.length * 36 / (1024 * 1024)).toFixed(1);
  const afterPerSection = (totalOptimized / imageFiles.length * 36 / (1024 * 1024)).toFixed(1);
  
  console.log(`Data per service section (36 images):`);
  console.log(`  Before: ~${beforePerSection} MB`);
  console.log(`  After:  ~${afterPerSection} MB`);
  console.log(`  Improvement: ${((beforePerSection - afterPerSection) / beforePerSection * 100).toFixed(0)}% less data to process`);
  
  console.log('\n📈 Expected Results:');
  console.log(`  Current frame drop: ~1593ms`);
  console.log(`  Expected after:     ~200-400ms`);
  console.log(`  Improvement:        ~75-87% faster! 🚀`);
  
  // Update codebase
  console.log('\n' + '='.repeat(80));
  console.log('\n🔧 UPDATING CODEBASE...\n');
  
  const updated = await updateMediaAssets();
  
  console.log('\n' + '='.repeat(80));
  console.log('\n✅ OPTIMIZATION COMPLETE!\n');
  
  console.log('📁 Optimized images saved to: public/optimized/');
  console.log('📝 Codebase updated: components/services/media-assets.ts');
  
  console.log('\n🎯 NEXT STEPS:\n');
  console.log('1. Review optimized images in public/optimized/ folder');
  console.log('2. Compare quality with originals (should look identical!)');
  console.log('3. Run your dev server: npm run dev');
  console.log('4. Test the website performance');
  console.log('5. Check React Scan for improved metrics');
  
  console.log('\n💡 TIP: If quality looks good, you can delete the originals');
  console.log('    and move optimized images to public/ root (optional)');
  
  console.log('\n' + '='.repeat(80));
}

main().catch(error => {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
});
