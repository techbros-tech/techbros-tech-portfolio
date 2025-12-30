/**
 * Optimize videos from the compressed folder:
 * 1. Speed up by 2x
 * 2. Cut to first 15 seconds
 * 3. Compress further if needed to get under 3MB
 *
 * Output files are written to `public/videos/optimized`
 */
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("@ffprobe-installer/ffprobe").path;

if (!ffmpegPath) {
  throw new Error(
    "ffmpeg-static not found. Install it with `pnpm install --save-dev ffmpeg-static`.",
  );
}

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const SOURCE_DIR = path.resolve("public/videos/compressed");
const OUTPUT_DIR = path.resolve("public/videos/optimized");
const TARGET_SIZE_MB = 3;
const TARGET_SIZE_BYTES = TARGET_SIZE_MB * 1024 * 1024;
const DURATION_SECONDS = 15;
const SPEED_FACTOR = 2;

if (!fs.existsSync(SOURCE_DIR)) {
  throw new Error(`Source directory not found: ${SOURCE_DIR}`);
}

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(OUTPUT_DIR);

const formatSizeLabel = (bytes) => {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes >= MB) {
    return `${(bytes / MB).toFixed(1)}mb`;
  }
  return `${Math.round(bytes / KB)}kb`;
};

const getVideoInfo = (inputPath) =>
  new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });

const processVideo = (inputPath, outputPath, bitrate = "800k") =>
  new Promise((resolve, reject) => {
    console.log(`  Processing with bitrate: ${bitrate}`);

    ffmpeg(inputPath)
      .setStartTime(0)
      .setDuration(DURATION_SECONDS)
      .videoFilters([
        `setpts=${1 / SPEED_FACTOR}*PTS`, // Speed up video
      ])
      .audioFilters([
        `atempo=${SPEED_FACTOR}`, // Speed up audio to match
      ])
      .videoCodec("libx264")
      .audioCodec("aac")
      .outputOptions([
        "-movflags +faststart",
        "-preset medium",
        "-profile:v high",
        "-level 4.0",
      ])
      .videoBitrate(bitrate)
      .size("?x720") // Max height 720p
      .on("progress", (progress) => {
        if (progress.percent !== undefined) {
          process.stdout.write(
            `  ${progress.percent.toFixed(1).padStart(5, " ")}% ${progress.timemark ?? ""}\r`,
          );
        }
      })
      .on("end", () => {
        const stats = fs.statSync(outputPath);
        console.log(
          `  ✔ Processed: ${formatSizeLabel(stats.size)}`.padEnd(80),
        );
        resolve(stats.size);
      })
      .on("error", (error) => {
        console.error(`  ✖ Processing failed:`, error.message);
        reject(error);
      })
      .save(outputPath);
  });

const optimizeVideo = async (fileName) => {
  const inputPath = path.join(SOURCE_DIR, fileName);
  const { name, ext } = path.parse(fileName);
  const baseName = name.replace(/-[\d.]+[km]b$/, ""); // Remove size label from name
  const tempOutputPath = path.join(OUTPUT_DIR, `${baseName}-temp${ext}`);
  const finalOutputPath = path.join(OUTPUT_DIR, `${baseName}-optimized${ext}`);

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Processing: ${fileName}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  try {
    // Get input video info
    const metadata = await getVideoInfo(inputPath);
    const inputSize = fs.statSync(inputPath).size;
    console.log(`  Input size: ${formatSizeLabel(inputSize)}`);
    console.log(`  Duration: ${metadata.format.duration}s`);

    // First pass: speed up 2x and cut to 15 seconds with moderate compression
    let bitrate = "800k";
    await processVideo(inputPath, tempOutputPath, bitrate);

    let outputSize = fs.statSync(tempOutputPath).size;
    let attempt = 1;

    // If still over 3MB, try with lower bitrates
    while (outputSize > TARGET_SIZE_BYTES && attempt < 5) {
      attempt++;
      console.log(
        `  Size ${formatSizeLabel(outputSize)} > ${TARGET_SIZE_MB}MB, recompressing (attempt ${attempt})...`,
      );

      // Delete temp file
      fs.unlinkSync(tempOutputPath);

      // Calculate new bitrate (reduce by 30% each time)
      const currentBitrate = parseInt(bitrate);
      bitrate = `${Math.floor(currentBitrate * 0.7)}k`;

      await processVideo(inputPath, tempOutputPath, bitrate);
      outputSize = fs.statSync(tempOutputPath).size;
    }

    // Add size label to final filename
    const sizeLabel = formatSizeLabel(outputSize);
    const finalPath = path.join(OUTPUT_DIR, `${baseName}-${sizeLabel}${ext}`);

    // Rename to final name
    fs.renameSync(tempOutputPath, finalPath);

    console.log(`\n  ✅ COMPLETE: ${path.relative(process.cwd(), finalPath)}`);
    console.log(
      `  Final size: ${formatSizeLabel(outputSize)} ${outputSize <= TARGET_SIZE_BYTES ? "✓" : "⚠ (still over target)"}`,
    );
  } catch (error) {
    console.error(`\n  ❌ Failed to optimize ${fileName}:`, error.message);
    if (fs.existsSync(tempOutputPath)) {
      fs.unlinkSync(tempOutputPath);
    }
  }
};

const processAllVideos = async () => {
  const files = fs
    .readdirSync(SOURCE_DIR)
    .filter((file) => /\.(mp4|mov|webm)$/i.test(file));

  console.log(`\n╔════════════════════════════════════════╗`);
  console.log(`║  Video Optimization Script             ║`);
  console.log(`║  - Speed: 2x                          ║`);
  console.log(`║  - Duration: 15 seconds               ║`);
  console.log(`║  - Target: < ${TARGET_SIZE_MB}MB                       ║`);
  console.log(`╚════════════════════════════════════════╝\n`);
  console.log(`Found ${files.length} video(s) to process\n`);

  for (const file of files) {
    await optimizeVideo(file);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ All videos processed!`);
  console.log(`Output directory: ${OUTPUT_DIR}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
};

processAllVideos().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
