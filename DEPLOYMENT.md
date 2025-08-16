# WebSocket 伺服器部署指南

## 🚀 完整部署方案

你的密碼產生器遊戲現在支援**混合架構**：
- ✅ **GitHub Pages**: 靜態網站託管（免費）
- ✅ **WebSocket 伺服器**: 多人功能（可選，部署到雲端）
- ✅ **自動降級**: 沒有伺服器時自動切換到離線模式

## 📋 部署步驟

### 第一步：部署 GitHub Pages（必須）

1. **啟用 GitHub Pages**
   ```bash
   # 1. 前往你的 GitHub repository: https://github.com/lin3598197/Password-creater
   # 2. 點擊 "Settings" 標籤
   # 3. 滾動到 "Pages" 部分
   # 4. 在 "Source" 下拉選單中選擇 "GitHub Actions"
   ```

2. **自動部署已設置**
   - 我已經創建了 `.github/workflows/deploy.yml`
   - 每次推送到 main 分支時會自動構建和部署
   - 你的遊戲將可在：`https://lin3598197.github.io/Password-creater/` 使用

### 第二步：部署 WebSocket 伺服器（可選）

選擇以下任一雲端服務：

#### 方案 A：Microsoft Azure（學生首選）

1. **申請 Azure 學生帳戶**
   ```bash
   # 1. 前往 GitHub Student Pack: https://education.github.com/pack
   # 2. 申請 Azure for Students ($100 免費額度)
   # 3. 在 Azure Portal 創建 App Service
   # 4. 配置 GitHub 自動部署
   # 詳細步驟請參考：AZURE_DEPLOY.md
   ```

2. **獲取部署 URL**
   - 部署完成後，你會得到：`https://password-creator-game.azurewebsites.net`

3. **更新配置**
   ```javascript
   // config.js 中已預設配置 Azure URL
   azure: 'wss://password-creator-game.azurewebsites.net',
   ```

#### 方案 B：Railway（免費額度）

1. **註冊並部署**
   ```bash
   # 1. 前往 https://railway.app
   # 2. 使用 GitHub 帳號登入
   # 3. 點擊 "New Project" → "Deploy from GitHub repo"
   # 4. 選擇 "Password-creater" repository
   # 5. Railway 會自動檢測 Node.js 並部署
   ```

2. **獲取部署 URL**
   - 部署完成後，你會得到類似：`https://password-creater-production.up.railway.app`

3. **更新配置**
   ```javascript
   // 編輯 config.js 檔案，將以下行：
   railway: 'wss://your-app-name.up.railway.app',
   // 改為你的實際 URL：
   railway: 'wss://password-creater-production.up.railway.app',
   ```

#### 方案 C：Render

1. **部署步驟**
   ```bash
   # 1. 前往 https://render.com
   # 2. 使用 GitHub 帳號登入
   # 3. 點擊 "New +" → "Web Service"
   # 4. 連接你的 GitHub repository
   # 5. 配置：
   #    - Name: password-creator-server
   #    - Environment: Node
   #    - Build Command: npm install
   #    - Start Command: node server.js
   ```

2. **更新配置**
   ```javascript
   // 在 config.js 中更新：
   render: 'wss://password-creator-server.onrender.com',
   ```

#### 方案 D：Glitch

1. **快速部署**
   ```bash
   # 1. 前往 https://glitch.com
   # 2. 點擊 "New Project" → "Import from GitHub"
   # 3. 輸入: https://github.com/lin3598197/Password-creater
   # 4. Glitch 會自動導入並運行
   ```

2. **更新配置**
   ```javascript
   // 在 config.js 中更新：
   glitch: 'wss://your-project-name.glitch.me',
   ```

### 第三步：推送更新

部署伺服器後，更新配置並推送：

```bash
# 1. 編輯 config.js，更新你的伺服器 URL
# 2. 推送更新
git add .
git commit -m "Update WebSocket server URLs for production"
git push origin main

# GitHub Actions 會自動重新部署你的網站
```

## 🔧 配置檔案說明

### config.js
```javascript
export const CONFIG = {
    development: {
        websocket: 'ws://localhost:8080',  // 本地開發
        api: 'http://localhost:8080'
    },
    production: {
        railway: 'wss://你的Railway域名.up.railway.app',
        render: 'wss://你的Render域名.onrender.com', 
        glitch: 'wss://你的Glitch域名.glitch.me'
    }
};
```

### 智能連接邏輯
- 🏠 **本地環境**: 自動連接到 `localhost:8080`
- 🌐 **GitHub Pages**: 按優先級嘗試連接：Railway → Render → Glitch
- 📱 **離線模式**: 所有伺服器都無法連接時自動啟用

## 🎯 使用情境

### 情境 1：只想快速部署
1. ✅ 部署到 GitHub Pages（5分鐘）
2. ❌ 跳過 WebSocket 伺服器
3. 🎮 遊戲以**離線模式**運行

### 情境 2：完整多人功能
1. ✅ 部署到 GitHub Pages
2. ✅ 部署 WebSocket 伺服器到 Railway
3. ✅ 更新 config.js
4. 🎮 遊戲支援**多人連線**

### 情境 3：高可用性
1. ✅ 部署到 GitHub Pages
2. ✅ 部署到多個雲端服務（Railway + Render + Glitch）
3. ✅ 更新所有 URL 在 config.js
4. 🎮 **自動故障轉移**，連線中斷時切換伺服器

## 💰 成本分析

| 服務 | 成本 | 限制 | 推薦度 |
|------|------|------|--------|
| GitHub Pages | 免費 | 靜態檔案 | ⭐⭐⭐⭐⭐ |
| **Azure (學生)** | **$100 免費額度** | **企業級，無休眠** | ⭐⭐⭐⭐⭐ |
| Railway | $5/月免費額度 | 最穩定 | ⭐⭐⭐⭐⭐ |
| **Heroku** | **$7/月** | **最穩定，不休眠** | ⭐⭐⭐⭐⭐ |
| Render | 完全免費 | 15分鐘休眠 | ⭐⭐⭐⭐ |
| Glitch | 完全免費 | 5分鐘休眠 | ⭐⭐⭐ |

## 🔍 故障排除

### 常見問題

1. **GitHub Pages 無法訪問**
   - 檢查 Repository Settings → Pages 是否啟用
   - 確認 Actions 是否成功運行

2. **WebSocket 連接失敗**
   - 檢查 config.js 中的 URL 是否正確
   - 確認雲端服務狀態
   - 查看瀏覽器開發者工具的 Console

3. **自動部署失敗**
   - 檢查 `.github/workflows/deploy.yml`
   - 確認 GitHub Actions 權限

### 測試連接

1. 開啟瀏覽器開發者工具
2. 前往 Console 標籤
3. 觀察連接日誌
4. 確認是否顯示「連接成功」或「離線模式」

## 🎉 完成！

恭喜！你的密碼產生器遊戲現在：
- ✅ 在 GitHub Pages 上運行
- ✅ 支援多語言（中文/英文）
- ✅ 智能連接管理
- ✅ 自動故障轉移
- ✅ 完整的離線支援

**遊戲網址**: `https://lin3598197.github.io/Password-creater/`
