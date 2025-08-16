# Heroku 部署指南

## 🚀 Heroku 部署步驟

### 前置準備

1. **安裝 Heroku CLI**
   ```bash
   # 下載並安裝 Heroku CLI：https://devcenter.heroku.com/articles/heroku-cli
   # 或使用 npm 安裝
   npm install -g heroku
   ```

2. **登入 Heroku**
   ```bash
   heroku login
   ```

### 方法 1：命令行部署（推薦）

1. **創建 Heroku 應用**
   ```bash
   # 在專案目錄中執行
   cd "C:\Users\lin35\Documents\Password Create"
   
   # 創建 Heroku 應用（應用名稱必須唯一）
   heroku create password-creator-game-server
   
   # 或讓 Heroku 自動生成名稱
   heroku create
   ```

2. **部署到 Heroku**
   ```bash
   # 添加 Heroku 為 Git remote
   heroku git:remote -a password-creator-game-server
   
   # 推送程式碼到 Heroku
   git push heroku main
   ```

3. **檢查部署狀態**
   ```bash
   # 查看應用狀態
   heroku ps:scale web=1
   
   # 查看日誌
   heroku logs --tail
   
   # 開啟應用
   heroku open
   ```

### 方法 2：GitHub 連接部署

1. **Heroku Dashboard 設置**
   ```bash
   # 1. 前往 https://dashboard.heroku.com/
   # 2. 點擊 "New" → "Create new app"
   # 3. 應用名稱：password-creator-game-server
   # 4. 選擇地區（建議選擇離你最近的）
   ```

2. **連接 GitHub**
   ```bash
   # 1. 在 "Deploy" 標籤頁中
   # 2. 選擇 "GitHub" 作為部署方法
   # 3. 搜尋並連接你的 "Password-creater" repository
   # 4. 啟用 "Automatic deploys" from main branch
   ```

3. **手動部署**
   ```bash
   # 在 "Manual deploy" 部分點擊 "Deploy Branch"
   ```

### 獲取部署 URL

部署成功後，你會得到類似的 URL：
- `https://password-creator-game-server.herokuapp.com`

### 更新客戶端配置

1. **編輯 config.js**
   ```javascript
   // 將以下行：
   heroku: 'wss://your-app-name.herokuapp.com',
   // 改為你的實際 URL：
   heroku: 'wss://password-creator-game-server.herokuapp.com',
   ```

2. **推送更新**
   ```bash
   git add config.js
   git commit -m "Update Heroku WebSocket URL"
   git push origin main
   ```

## 📊 Heroku 方案比較

| 方案 | 價格 | 規格 | 適用情況 |
|------|------|------|----------|
| Eco | $7/月 | 512MB RAM, 不休眠 | 小型應用 |
| Basic | $7/月 | 512MB RAM, 自定義域名 | 個人專案 |
| Standard | $25/月 | 512MB RAM, 高級功能 | 商業應用 |

## 🔧 進階配置

### 環境變數設置

```bash
# 設置環境變數
heroku config:set NODE_ENV=production
heroku config:set PORT=8080

# 查看環境變數
heroku config
```

### 自定義域名（Basic 方案以上）

```bash
# 添加自定義域名
heroku domains:add yourdomain.com

# 查看域名設置
heroku domains
```

### 日誌監控

```bash
# 即時查看日誌
heroku logs --tail

# 查看最近的日誌
heroku logs --num 200

# 查看特定應用的日誌
heroku logs --app password-creator-game-server
```

## 🛠️ 故障排除

### 常見問題

1. **應用無法啟動**
   ```bash
   # 檢查日誌
   heroku logs --tail
   
   # 檢查 Procfile 是否正確
   cat Procfile
   ```

2. **WebSocket 連接失敗**
   ```bash
   # 確認應用正在運行
   heroku ps
   
   # 重啟應用
   heroku restart
   ```

3. **端口錯誤**
   ```bash
   # Heroku 會自動設置 PORT 環境變數
   # 確認 server.js 使用 process.env.PORT
   ```

### 測試部署

1. **本地測試**
   ```bash
   # 使用 Heroku Local 測試
   heroku local web
   ```

2. **連接測試**
   ```bash
   # 測試 WebSocket 連接
   curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" \
   https://password-creator-game-server.herokuapp.com
   ```

## 💡 Heroku vs 其他平台

| 平台 | 價格 | 穩定性 | 設置難度 | 推薦度 |
|------|------|--------|----------|--------|
| **Heroku** | $7/月 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Railway | $5/月免費額度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Render | 免費 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Glitch | 免費 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🎯 推薦部署順序

1. **預算有限**: Railway（免費額度）→ Render（免費）
2. **追求穩定**: Heroku（$7/月）→ Railway（$5/月）
3. **學習用途**: Glitch（免費）→ Render（免費）

Heroku 是最穩定的選擇，特別適合需要 24/7 運行的應用！
