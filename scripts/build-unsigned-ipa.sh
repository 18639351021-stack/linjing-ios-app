#!/usr/bin/env bash
set -euo pipefail

APP_NAME="App"
WORKSPACE="ios/App/App.xcworkspace"
SCHEME="App"
CONFIGURATION="Debug"
DERIVED_DATA_PATH="$PWD/ios-derived-data"
ARTIFACTS_DIR="$PWD/artifacts"
PAYLOAD_DIR="$PWD/unsigned-ipa/Payload"
IPA_NAME="linjing-doc-ai-unsigned.ipa"

rm -rf "$DERIVED_DATA_PATH" "$ARTIFACTS_DIR" "$PWD/unsigned-ipa"
mkdir -p "$ARTIFACTS_DIR" "$PAYLOAD_DIR"

xcodebuild \
  -workspace "$WORKSPACE" \
  -scheme "$SCHEME" \
  -configuration "$CONFIGURATION" \
  -sdk iphoneos \
  -derivedDataPath "$DERIVED_DATA_PATH" \
  CODE_SIGNING_ALLOWED=NO \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY="" \
  build

APP_PATH="$(find "$DERIVED_DATA_PATH/Build/Products" -type d -name "$APP_NAME.app" | head -n 1)"

if [[ -z "$APP_PATH" ]]; then
  echo "Could not find built .app"
  find "$DERIVED_DATA_PATH/Build/Products" -maxdepth 4 -print
  exit 1
fi

cp -R "$APP_PATH" "$PAYLOAD_DIR/"

(
  cd "$PWD/unsigned-ipa"
  zip -qry "$ARTIFACTS_DIR/$IPA_NAME" Payload
)

echo "Unsigned IPA created:"
echo "$ARTIFACTS_DIR/$IPA_NAME"
