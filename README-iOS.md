# 邻井助手文档AI版 iOS 端

这是独立的 iOS 文档AI版目录，不修改原来的电脑端、安卓端、iOS端或小程序端。

## 功能

- 天地图地图显示、定位、点位新增、点选新增
- 电脑端 `backup.json` 导入，保留点位和关联文档元数据
- 关联文档管理，支持导入文本文件或手动粘贴文档内容
- AI 智能分析，综合当前点、邻近点和关联文档信息

注意：电脑端备份里的关联文档通常只包含文档名、路径、大小、类型等元数据，不包含 PDF/Word 正文。iOS 端会保留这些记录；如需 AI 分析正文，请在手机端补充文本内容。

## 在 GitHub Actions 生成 IPA

1. 把本目录上传到一个独立 GitHub 仓库。
2. 打开仓库的 Actions。
3. 运行 `Build Doc AI Unsigned IPA`。
4. 构建完成后，在 Artifacts 下载 `linjing-doc-ai-unsigned-ipa`。

下载得到的是未签名 IPA，适合再交给手机上的签名软件重签安装。

## 在 Mac 上打开工程

```bash
npm install
npm run build
npx cap add ios
npx cap sync ios
bash scripts/patch-ios-plist.sh
bash scripts/patch-ios-icons.sh
npx cap open ios
```

Bundle ID: `com.linjing.docai.ios`
