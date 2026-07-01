#!/usr/bin/env bash
set -euo pipefail

node <<'NODE'
const fs = require('fs');

const decode = value => JSON.parse(`"${value}"`);
const appName = decode('\\u90bb\\u4e95\\u52a9\\u624b\\u6587\\u6863AI\\u7248');
const locationText = decode('\\u7528\\u4e8e\\u5b9a\\u4f4d\\u5f53\\u524d\\u4f4d\\u7f6e\\uff0c\\u5e76\\u53ef\\u5c06\\u5b9a\\u4f4d\\u7ed3\\u679c\\u6dfb\\u52a0\\u4e3a\\u5750\\u6807\\u70b9\\u3002');
const documentsText = decode('\\u7528\\u4e8e\\u9009\\u62e9\\u548c\\u5bfc\\u5165\\u5907\\u4efd\\u6587\\u4ef6\\u6216\\u5173\\u8054\\u6587\\u6863\\u3002');

const plistPath = 'ios/App/App/Info.plist';
if (!fs.existsSync(plistPath)) {
  console.error(`Info.plist not found: ${plistPath}`);
  process.exit(1);
}

let plist = fs.readFileSync(plistPath, 'utf8');
plist = plist.replace(
  /<key>CFBundleDisplayName<\/key>\s*<string>[\s\S]*?<\/string>/,
  `<key>CFBundleDisplayName</key>\n\t<string>${appName}</string>`
);

const entries = [
  ['NSLocationWhenInUseUsageDescription', locationText],
  ['NSLocationAlwaysAndWhenInUseUsageDescription', locationText],
  ['NSDocumentsFolderUsageDescription', documentsText]
];

for (const [key, value] of entries) {
  const re = new RegExp(`\\s*<key>${key}<\\/key>\\s*<string>[\\s\\S]*?<\\/string>`, 'g');
  plist = plist.replace(re, '');
  plist = plist.replace('</dict>', `\t<key>${key}</key>\n\t<string>${value}</string>\n</dict>`);
}

fs.writeFileSync(plistPath, plist, 'utf8');

const capacitorConfigPath = 'ios/App/App/capacitor.config.json';
if (fs.existsSync(capacitorConfigPath)) {
  const config = JSON.parse(fs.readFileSync(capacitorConfigPath, 'utf8'));
  config.appName = appName;
  fs.writeFileSync(capacitorConfigPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
}
NODE

echo "Patched iOS display name and permission descriptions."
