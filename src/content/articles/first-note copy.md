---
title: 第一篇世界觀筆記
date: 2026-05-31
tags: [世界觀, 設定]
summary: 這裡是文章列表顯示的摘要，示範 Markdown 文章如何被靜態編譯進列表頁。
cover: /image/articles/first-note.svg
status: public
---

# 第一篇世界觀筆記

奇幻世界資訊站的第一階段重點不是把所有資料填滿，而是先建立可擴充的內容骨架。

## 為什麼先做靜態內容流

- 地圖、年表、角色與文章都能直接由 JSON 或 Markdown 擴充。
- 不需要後台與資料庫，部署到 GitHub Pages 就能上線。
- 新增一篇文章時，不必改 Vue 元件，只要補一個 Markdown 檔案。

## 後續可擴充方向

1. 多語系文章資料夾，例如 content/zh-tw 與 content/en。
2. 文章短碼，讓角色、地點與勢力在文中轉成卡片連結。
3. 搜尋索引 JSON，前端用 Fuse.js 做靜態搜尋。

> 目前內容為 placeholder，重點在於切版、資訊架構與資料驅動流程。