#!/usr/bin/env bash
set -euo pipefail

npm install
npm run build
npx cap add ios || true
npx cap sync ios
bash scripts/patch-ios-plist.sh
bash scripts/patch-ios-icons.sh
npx cap open ios
