---
title: 星圖、王權與地誌卷
date: 2026-05-29
tags: [地圖, 王國]
summary: 以地圖和王權制度為例，說明之後如何把文章系統與設定頁互相串連。
cover: /image/articles/worldbuilding-note.svg
status: public
---

# 星圖、王權與地誌卷

每一份地誌卷都同時記錄了三件事：疆界、稅制與行軍路線。這使得地圖頁與列王記天然可以互相參照。

## 地圖頁應該承擔的工作

地圖頁不只是展示圖片，而是把 **區域概覽**、**熱點資料** 與 **進一步閱讀入口** 接在同一個版面裡。

### 建議欄位

- `mapImage`：區域主圖
- `hotspots`：點位與 lightbox 內容
- `targetRegionSlug`：從世界總圖導向區域圖

## 列王記的結構

列王記頁可以先維持表格，之後再加上 dynasty filter、sticky 欄位與角色交叉引用。

這篇文章本身就是 Markdown content flow 的示範：只要新增檔案，就會自動出現在文庫列表。