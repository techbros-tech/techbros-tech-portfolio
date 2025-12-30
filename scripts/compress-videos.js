/**
 * Recompress videos in `public/videos` to lighter H.264 assets.
 * Requires `ffmpeg-static` and `fluent-ffmpeg` as devDependencies.
 *
 * Output files are written to `public/videos/compressed`
 * with the approximate size encoded in the filename, e.g.
 * `video-1-0.8mb.mp4`.
 */
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

if (!ffmpegPath) {
  throw new Error(
    "ffmpeg-static not found. Install it with `npm install --save-dev ffmpeg-static`.",
  );
}

ffmpeg.setFfmpegPath(ffmpegPath);

const SOURCE_DIR = path.resolve("public/videos");
const OUTPUT_DIR = path.join(SOURCE_DIR, "compressed");
const POSTER_DIR = path.join(SOURCE_DIR, "posters");

const VIDEO_BITRATE = process.env.VIDEO_BITRATE ?? "1200k";
const MAX_WIDTH = Number.parseInt(process.env.MAX_WIDTH ?? "1280", 10);
const AUDIO_CODEC = process.env.AUDIO_CODEC ?? "aac";
const POSTER_TIMESTAMP = process.env.POSTER_TIMESTAMP ?? "00:00:01.000";

if (!fs.existsSync(SOURCE_DIR)) {
  throw new Error(`Source directory not found: ${SOURCE_DIR}`);
}

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(OUTPUT_DIR);
ensureDir(POSTER_DIR);

const formatSizeLabel = (bytes) => {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes >= MB) {
    return `${(bytes / MB).toFixed(1)}mb`;
  }
  return `${Math.round(bytes / KB)}kb`;
};

const generatePoster = (inputPath, baseName) =>
  new Promise((resolve, reject) => {
    const posterFile = `${baseName}-poster.jpg`;
    const outputPath = path.join(POSTER_DIR, posterFile);

    ffmpeg(inputPath)
      .on("end", () => {
        console.log(
          `  ✔ Poster saved ${path.relative(process.cwd(), outputPath)}`,
        );
        resolve();
      })
      .on("error", (error) => {
        console.error(
          `  ✖ Poster generation failed for ${posterFile}:`,
          error.message,
        );
        reject(error);
      })
      .screenshots({
        timestamps: [POSTER_TIMESTAMP],
        filename: posterFile,
        folder: POSTER_DIR,
        size: `${MAX_WIDTH}x?`,
      });
  });

const compressVideo = (fileName) => {
  const inputPath = path.join(SOURCE_DIR, fileName);
  const { name, ext } = path.parse(fileName);
  const tempOutputPath = path.join(OUTPUT_DIR, `${name}-temp${ext}`);

  console.log(`\nCompressing ${fileName}`);

  ffmpeg(inputPath)
    .videoCodec("libx264")
    .audioCodec(AUDIO_CODEC)
    .outputOptions([
      "-movflags +faststart",
      "-preset medium",
      "-profile:v high",
      "-level 4.0",
    ])
    .videoBitrate(VIDEO_BITRATE)
    .size(`?x${MAX_WIDTH}`)
    .on("progress", (progress) => {
      if (progress.percent !== undefined) {
        process.stdout.write(
          `  ${progress.percent.toFixed(1).padStart(5, " ")}% ${progress.timemark ?? ""}\r`,
        );
      }
    })
    .on("end", async () => {
      try {
        const stats = fs.statSync(tempOutputPath);
        const sizeLabel = formatSizeLabel(stats.size);
        const finalOutputPath = path.join(
          OUTPUT_DIR,
          `${name}-${sizeLabel}${ext}`,
        );

        fs.renameSync(tempOutputPath, finalOutputPath);
        console.log(
          `  ✔ Saved ${path.relative(process.cwd(), finalOutputPath)}`,
        );

        await generatePoster(finalOutputPath, name);
      } catch (error) {
        console.error(`  ✖ Failed to finalize ${fileName}:`, error);
      }
    })
    .on("error", (error) => {
      console.error(`  ✖ Compression failed for ${fileName}:`, error.message);
      if (fs.existsSync(tempOutputPath)) {
        fs.unlinkSync(tempOutputPath);
      }
    })
    .save(tempOutputPath);
};

fs.readdirSync(SOURCE_DIR)
  .filter((file) => /\.(mp4|mov|webm)$/i.test(file))
  .forEach((file) => {
    compressVideo(file);
  });

console.log("\nCompression queued. Monitor the output above for status.");
