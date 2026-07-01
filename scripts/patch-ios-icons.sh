#!/usr/bin/env bash
set -euo pipefail

SOURCE="assets/app-icon.png"
ICONSET="ios/App/App/Assets.xcassets/AppIcon.appiconset"

if [[ ! -f "$SOURCE" ]]; then
  echo "Missing icon source: $SOURCE"
  exit 1
fi

if [[ ! -d "$ICONSET" ]]; then
  echo "Missing iOS AppIcon set: $ICONSET"
  exit 1
fi

rm -f "$ICONSET"/*.png

make_icon() {
  local pixels="$1"
  local filename="$2"
  sips -z "$pixels" "$pixels" "$SOURCE" --out "$ICONSET/$filename" >/dev/null
}

make_icon 40 "Icon-App-20x20@2x.png"
make_icon 60 "Icon-App-20x20@3x.png"
make_icon 58 "Icon-App-29x29@2x.png"
make_icon 87 "Icon-App-29x29@3x.png"
make_icon 80 "Icon-App-40x40@2x.png"
make_icon 120 "Icon-App-40x40@3x.png"
make_icon 120 "Icon-App-60x60@2x.png"
make_icon 180 "Icon-App-60x60@3x.png"
make_icon 20 "Icon-App-20x20@1x.png"
make_icon 40 "Icon-App-20x20@2x-ipad.png"
make_icon 29 "Icon-App-29x29@1x.png"
make_icon 58 "Icon-App-29x29@2x-ipad.png"
make_icon 40 "Icon-App-40x40@1x.png"
make_icon 80 "Icon-App-40x40@2x-ipad.png"
make_icon 76 "Icon-App-76x76@1x.png"
make_icon 152 "Icon-App-76x76@2x.png"
make_icon 167 "Icon-App-83.5x83.5@2x.png"
make_icon 1024 "Icon-App-1024x1024@1x.png"

cat > "$ICONSET/Contents.json" <<'JSON'
{
  "images": [
    { "idiom": "iphone", "size": "20x20", "scale": "2x", "filename": "Icon-App-20x20@2x.png" },
    { "idiom": "iphone", "size": "20x20", "scale": "3x", "filename": "Icon-App-20x20@3x.png" },
    { "idiom": "iphone", "size": "29x29", "scale": "2x", "filename": "Icon-App-29x29@2x.png" },
    { "idiom": "iphone", "size": "29x29", "scale": "3x", "filename": "Icon-App-29x29@3x.png" },
    { "idiom": "iphone", "size": "40x40", "scale": "2x", "filename": "Icon-App-40x40@2x.png" },
    { "idiom": "iphone", "size": "40x40", "scale": "3x", "filename": "Icon-App-40x40@3x.png" },
    { "idiom": "iphone", "size": "60x60", "scale": "2x", "filename": "Icon-App-60x60@2x.png" },
    { "idiom": "iphone", "size": "60x60", "scale": "3x", "filename": "Icon-App-60x60@3x.png" },
    { "idiom": "ipad", "size": "20x20", "scale": "1x", "filename": "Icon-App-20x20@1x.png" },
    { "idiom": "ipad", "size": "20x20", "scale": "2x", "filename": "Icon-App-20x20@2x-ipad.png" },
    { "idiom": "ipad", "size": "29x29", "scale": "1x", "filename": "Icon-App-29x29@1x.png" },
    { "idiom": "ipad", "size": "29x29", "scale": "2x", "filename": "Icon-App-29x29@2x-ipad.png" },
    { "idiom": "ipad", "size": "40x40", "scale": "1x", "filename": "Icon-App-40x40@1x.png" },
    { "idiom": "ipad", "size": "40x40", "scale": "2x", "filename": "Icon-App-40x40@2x-ipad.png" },
    { "idiom": "ipad", "size": "76x76", "scale": "1x", "filename": "Icon-App-76x76@1x.png" },
    { "idiom": "ipad", "size": "76x76", "scale": "2x", "filename": "Icon-App-76x76@2x.png" },
    { "idiom": "ipad", "size": "83.5x83.5", "scale": "2x", "filename": "Icon-App-83.5x83.5@2x.png" },
    { "idiom": "ios-marketing", "size": "1024x1024", "scale": "1x", "filename": "Icon-App-1024x1024@1x.png" }
  ],
  "info": {
    "author": "xcode",
    "version": 1
  }
}
JSON

echo "Generated iOS app icons from $SOURCE"
