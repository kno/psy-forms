#!/usr/bin/env bash
set -euo pipefail

# Build AAB for Google Play Store upload
# Usage: ./scripts/build-playstore.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
ANDROID_DIR="$PROJECT_DIR/android"
AAB_OUTPUT="$ANDROID_DIR/app/build/outputs/bundle/release/app-release.aab"

export ANDROID_HOME="${ANDROID_HOME:-/opt/homebrew/share/android-commandlinetools}"
export JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk@21}"

echo "=== Building AAB for Google Play Store ==="
echo ""

# Step 1: Sync Capacitor
echo "[1/4] Syncing Capacitor..."
cd "$PROJECT_DIR"
npx cap sync android

# Step 2: Clean previous builds
echo "[2/4] Cleaning previous builds..."
cd "$ANDROID_DIR"
./gradlew clean

# Step 3: Build AAB
echo "[3/4] Building release AAB..."
./gradlew bundleRelease

# Step 4: Verify output
echo "[4/4] Verifying output..."
if [ -f "$AAB_OUTPUT" ]; then
    AAB_SIZE=$(du -h "$AAB_OUTPUT" | cut -f1)
    echo ""
    echo "=== BUILD SUCCESSFUL ==="
    echo "AAB file: $AAB_OUTPUT"
    echo "Size: $AAB_SIZE"
    echo ""
    echo "Next steps:"
    echo "  1. Go to https://play.google.com/console"
    echo "  2. Select your app"
    echo "  3. Go to Release > Production > Create new release"
    echo "  4. Upload the AAB file above"
    echo ""
else
    echo ""
    echo "=== BUILD FAILED ==="
    echo "AAB file not found at: $AAB_OUTPUT"
    exit 1
fi
