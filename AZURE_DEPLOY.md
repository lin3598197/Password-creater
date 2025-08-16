# Azure App Service 部署指南

## 🎓 使用 GitHub Student Pack 免費部署到 Azure

### 前置準備

1. **申請 Azure 學生帳戶**
   ```bash
   # 1. 前往 GitHub Student Pack: https://education.github.com/pack
   # 2. 找到 "Microsoft Azure" 並點擊獲取
   # 3. 使用學生信箱註冊 Azure 帳戶
   # 4. 獲得 $100 免費額度（無需信用卡）
   ```

2. **驗證學生身份**
   - 上傳學生證或使用學校電子信箱
   - 通過驗證後立即獲得額度

---

## 🚀 部署步驟

### 方法 1：Azure Portal 部署（推薦）

1. **創建 App Service**
   ```bash
   # 1. 登入 Azure Portal: https://portal.azure.com
   # 2. 點擊 "Create a resource"
   # 3. 搜尋 "Web App" 並選擇
   # 4. 配置：
   #    - Subscription: Azure for Students
   #    - Resource Group: 創建新的 "password-creator-rg"
   #    - Name: password-creator-game（必須全球唯一）
   #    - Runtime: Node.js 18 LTS
   #    - Region: East US（或距離你最近的）
   #    - Pricing Plan: Free F1
   ```

2. **設置 GitHub 部署**
   ```bash
   # 1. 在你的 App Service 中，前往 "Deployment Center"
   # 2. 選擇 "GitHub" 作為來源
   # 3. 授權 Azure 訪問你的 GitHub
   # 4. 選擇：
   #    - Organization: lin3598197
   #    - Repository: Password-creater
   #    - Branch: main
   # 5. 點擊 "Save"
   ```

3. **Azure 自動部署**
   - Azure 會自動創建 GitHub Actions workflow
   - 每次推送到 main 分支時自動部署
   - 首次部署大約需要 5-10 分鐘

### 方法 2：Azure CLI 部署

1. **安裝 Azure CLI**
   ```bash
   # Windows (PowerShell)
   Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'
   
   # 或使用 winget
   winget install -e --id Microsoft.AzureCLI
   ```

2. **登入並創建資源**
   ```bash
   # 登入 Azure
   az login
   
   # 創建資源群組
   az group create --name password-creator-rg --location "East US"
   
   # 創建 App Service Plan（免費層）
   az appservice plan create --name password-creator-plan --resource-group password-creator-rg --sku FREE --is-linux
   
   # 創建 Web App
   az webapp create --resource-group password-creator-rg --plan password-creator-plan --name password-creator-game --runtime "NODE:18-lts"
   ```

3. **配置 GitHub 部署**
   ```bash
   # 配置 GitHub 部署
   az webapp deployment source config --name password-creator-game --resource-group password-creator-rg --repo-url https://github.com/lin3598197/Password-creater --branch main --manual-integration
   ```

---

## ⚙️ 配置設定

### 1. 應用程式設定

在 Azure Portal 中：
1. 前往你的 App Service
2. 選擇 "Configuration" → "Application settings"
3. 添加以下設定：

```bash
NODE_ENV = production
WEBSITE_NODE_DEFAULT_VERSION = 18-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = true
PORT = 8080
```

### 2. WebSocket 支援

Azure App Service 預設支援 WebSocket，但確保已啟用：
```bash
# 在 "Configuration" → "General settings" 中
# 確認 "Web sockets" 設為 "On"
```

---

## 🌐 獲取部署 URL

部署完成後，你的應用將可在以下地址使用：
- **HTTP**: `https://password-creator-game.azurewebsites.net`
- **WebSocket**: `wss://password-creator-game.azurewebsites.net`

---

## 🔧 更新客戶端配置

1. **編輯 config.js**
   ```javascript
   // 在 production 物件中添加：
   azure: 'wss://password-creator-game.azurewebsites.net',
   ```

2. **更新連接優先級**
   ```javascript
   // 在 getServerConfig() 函數中，將 Azure 設為優先：
   websockets: [
       CONFIG.production.azure,     // Azure - 穩定且快速
       CONFIG.production.railway,   // Railway - 備用
       CONFIG.production.render,    // Render - 免費備用
       CONFIG.production.glitch     // Glitch - 最後選擇
   ]
   ```

---

## 📊 成本估算

### Azure for Students 額度使用：
- **App Service (Free F1)**: $0/月（完全免費）
- **資料傳輸**: 非常少量，幾乎免費
- **總成本**: 約 $0-1/月

**$100 額度可以使用 8+ 年！**

---

## 🛠️ 管理和監控

### 1. 查看日誌
```bash
# 使用 Azure CLI
az webapp log tail --name password-creator-game --resource-group password-creator-rg

# 或在 Portal 中查看 "Log stream"
```

### 2. 重新部署
```bash
# 手動觸發部署
az webapp deployment source sync --name password-creator-game --resource-group password-creator-rg

# 或推送新 commit 到 GitHub 自動觸發
```

### 3. 擴展應用
```bash
# 升級到 Basic 方案（如果需要）
az appservice plan update --name password-creator-plan --resource-group password-creator-rg --sku B1
```

---

## 🔍 故障排除

### 常見問題

1. **應用無法啟動**
   ```bash
   # 檢查日誌
   az webapp log download --name password-creator-game --resource-group password-creator-rg
   
   # 確認 package.json 中有正確的 start 腳本
   ```

2. **WebSocket 連接失敗**
   ```bash
   # 檢查 WebSocket 是否啟用
   # 在 Portal → Configuration → General settings → Web sockets: On
   ```

3. **部署失敗**
   ```bash
   # 檢查 GitHub Actions
   # 在你的 repository → Actions 標籤頁查看部署日誌
   ```

4. **域名問題**
   ```bash
   # Azure 自動提供 HTTPS
   # 你的 WebSocket URL 應該使用 wss:// 而不是 ws://
   ```

---

## 🎯 為什麼選擇 Azure？

| 優勢 | 說明 |
|------|------|
| **學生友善** | $100 免費額度，無需信用卡 |
| **企業級** | Microsoft 的雲端服務，穩定可靠 |
| **自動部署** | GitHub 整合，推送即部署 |
| **擴展性** | 可隨時升級到更高方案 |
| **支援** | 豐富的文檔和社群支援 |

---

## 🚀 開始部署

準備好了嗎？讓我們開始：

1. **申請 Azure 學生帳戶**：https://azure.microsoft.com/free/students/
2. **按照上面的步驟創建 App Service**
3. **配置 GitHub 自動部署**
4. **更新你的 config.js**
5. **享受穩定的 WebSocket 服務！**

**Azure 是學生的最佳選擇 - 免費、穩定、專業！** 🎓
