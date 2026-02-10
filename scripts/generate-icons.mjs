import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('sharp not found. Install it: pnpm add -D sharp');
  process.exit(1);
}

const ROOT = path.resolve(__dirname, '..');
const RES = path.join(ROOT, 'resources');
const ANDROID_RES = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');
const SVG = path.join(ROOT, 'src', 'assets', 'icon.svg');

// Android adaptive icon sizes
const MIPMAP_SIZES = {
  'mipmap-mdpi':    { launcher: 48, foreground: 108 },
  'mipmap-hdpi':    { launcher: 72, foreground: 162 },
  'mipmap-xhdpi':   { launcher: 96, foreground: 216 },
  'mipmap-xxhdpi':  { launcher: 144, foreground: 324 },
  'mipmap-xxxhdpi': { launcher: 192, foreground: 432 },
};

// Background color (#fdf2f8 - the pink background from the app)
const BG_COLOR = { r: 253, g: 242, b: 248, alpha: 1 };

async function main() {
  console.log('Generating Android icons from SVG...\n');

  const svgBuffer = fs.readFileSync(SVG);

  // 1. Generate source PNGs in resources/
  fs.mkdirSync(RES, { recursive: true });

  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(RES, 'icon-only.png'));
  console.log('  resources/icon-only.png (1024x1024)');

  await sharp(svgBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(path.join(RES, 'icon-foreground.png'));
  console.log('  resources/icon-foreground.png (1024x1024)');

  await sharp({ create: { width: 1024, height: 1024, channels: 4, background: BG_COLOR } })
    .png()
    .toFile(path.join(RES, 'icon-background.png'));
  console.log('  resources/icon-background.png (1024x1024)');

  // Splash screen
  const splashSvg = await sharp(svgBuffer).resize(400, 400).png().toBuffer();
  await sharp({ create: { width: 2732, height: 2732, channels: 4, background: BG_COLOR } })
    .composite([{ input: splashSvg, gravity: 'centre' }])
    .png()
    .toFile(path.join(RES, 'splash.png'));
  console.log('  resources/splash.png (2732x2732)');

  await sharp({ create: { width: 2732, height: 2732, channels: 4, background: { r: 30, g: 20, b: 35, alpha: 1 } } })
    .composite([{ input: splashSvg, gravity: 'centre' }])
    .png()
    .toFile(path.join(RES, 'splash-dark.png'));
  console.log('  resources/splash-dark.png (2732x2732)');

  // 2. Generate Android mipmap icons
  console.log('\nGenerating Android mipmap icons...\n');

  for (const [folder, sizes] of Object.entries(MIPMAP_SIZES)) {
    const dir = path.join(ANDROID_RES, folder);
    fs.mkdirSync(dir, { recursive: true });

    // ic_launcher.png - full icon with background
    await sharp(svgBuffer)
      .resize(sizes.launcher, sizes.launcher)
      .flatten({ background: BG_COLOR })
      .png()
      .toFile(path.join(dir, 'ic_launcher.png'));

    // ic_launcher_round.png - same but will show as round on device
    await sharp(svgBuffer)
      .resize(sizes.launcher, sizes.launcher)
      .flatten({ background: BG_COLOR })
      .png()
      .toFile(path.join(dir, 'ic_launcher_round.png'));

    // ic_launcher_foreground.png - for adaptive icons
    // Needs padding (icon should use ~66% of the canvas, centered)
    const iconSize = Math.round(sizes.foreground * 0.6);
    const padding = Math.round((sizes.foreground - iconSize) / 2);
    const iconBuffer = await sharp(svgBuffer)
      .resize(iconSize, iconSize)
      .png()
      .toBuffer();

    await sharp({ create: { width: sizes.foreground, height: sizes.foreground, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([{ input: iconBuffer, left: padding, top: padding }])
      .png()
      .toFile(path.join(dir, 'ic_launcher_foreground.png'));

    console.log(`  ${folder}: launcher=${sizes.launcher}px, foreground=${sizes.foreground}px`);
  }

  // 3. Verify adaptive icon XML exists
  const adaptiveDir = path.join(ANDROID_RES, 'mipmap-anydpi-v26');
  fs.mkdirSync(adaptiveDir, { recursive: true });

  const launcherXml = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>
`;
  fs.writeFileSync(path.join(adaptiveDir, 'ic_launcher.xml'), launcherXml);
  fs.writeFileSync(path.join(adaptiveDir, 'ic_launcher_round.xml'), launcherXml);
  console.log('\n  mipmap-anydpi-v26/ic_launcher.xml (adaptive icon)');

  // 4. Ensure color resource for background
  const valuesDir = path.join(ANDROID_RES, 'values');
  const colorsFile = path.join(valuesDir, 'ic_launcher_background.xml');
  if (!fs.existsSync(colorsFile)) {
    fs.mkdirSync(valuesDir, { recursive: true });
    fs.writeFileSync(colorsFile, `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#FDF2F8</color>
</resources>
`);
    console.log('  values/ic_launcher_background.xml (background color)');
  }

  console.log('\nDone! All icons generated successfully.');
}

main().catch(e => { console.error(e); process.exit(1); });
