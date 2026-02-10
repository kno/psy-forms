#!/bin/bash

# Script para generar iconos para todas las plataformas
# Requiere ImageMagick instalado: brew install imagemagick (macOS) o apt install imagemagick (Linux)

SOURCE_SVG="src/assets/icon.svg"
OUTPUT_DIR="src/assets"

echo "🎨 Generando iconos para todas las plataformas..."

# Verificar que ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick no está instalado."
    echo "   Instálalo con:"
    echo "   - macOS: brew install imagemagick"
    echo "   - Ubuntu/Debian: sudo apt install imagemagick"
    echo "   - Windows: descarga desde https://imagemagick.org/script/download.php"
    exit 1
fi

# Generar PNG de alta resolución
echo "📱 Generando PNG (512x512)..."
convert -background none -resize 512x512 "$SOURCE_SVG" "$OUTPUT_DIR/icon.png"

# Generar ICO para Windows (múltiples tamaños)
echo "🪟 Generando ICO para Windows..."
convert -background none "$SOURCE_SVG" \
    \( -clone 0 -resize 16x16 \) \
    \( -clone 0 -resize 32x32 \) \
    \( -clone 0 -resize 48x48 \) \
    \( -clone 0 -resize 64x64 \) \
    \( -clone 0 -resize 128x128 \) \
    \( -clone 0 -resize 256x256 \) \
    -delete 0 "$OUTPUT_DIR/icon.ico"

# Generar ICNS para macOS
echo "🍎 Generando ICNS para macOS..."

# Crear carpeta temporal para iconset
ICONSET_DIR="$OUTPUT_DIR/icon.iconset"
mkdir -p "$ICONSET_DIR"

# Generar todos los tamaños necesarios para macOS
convert -background none -resize 16x16 "$SOURCE_SVG" "$ICONSET_DIR/icon_16x16.png"
convert -background none -resize 32x32 "$SOURCE_SVG" "$ICONSET_DIR/icon_16x16@2x.png"
convert -background none -resize 32x32 "$SOURCE_SVG" "$ICONSET_DIR/icon_32x32.png"
convert -background none -resize 64x64 "$SOURCE_SVG" "$ICONSET_DIR/icon_32x32@2x.png"
convert -background none -resize 128x128 "$SOURCE_SVG" "$ICONSET_DIR/icon_128x128.png"
convert -background none -resize 256x256 "$SOURCE_SVG" "$ICONSET_DIR/icon_128x128@2x.png"
convert -background none -resize 256x256 "$SOURCE_SVG" "$ICONSET_DIR/icon_256x256.png"
convert -background none -resize 512x512 "$SOURCE_SVG" "$ICONSET_DIR/icon_256x256@2x.png"
convert -background none -resize 512x512 "$SOURCE_SVG" "$ICONSET_DIR/icon_512x512.png"
convert -background none -resize 1024x1024 "$SOURCE_SVG" "$ICONSET_DIR/icon_512x512@2x.png"

# Convertir a ICNS (solo funciona en macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    iconutil -c icns "$ICONSET_DIR" -o "$OUTPUT_DIR/icon.icns"
    rm -rf "$ICONSET_DIR"
    echo "✅ ICNS generado correctamente"
else
    echo "⚠️  Para generar ICNS, ejecuta este script en macOS o usa una herramienta online"
    echo "   Los PNGs necesarios están en: $ICONSET_DIR"
fi

echo ""
echo "✅ ¡Iconos generados!"
echo ""
echo "Archivos creados:"
echo "  - $OUTPUT_DIR/icon.png (Linux)"
echo "  - $OUTPUT_DIR/icon.ico (Windows)"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "  - $OUTPUT_DIR/icon.icns (macOS)"
fi
