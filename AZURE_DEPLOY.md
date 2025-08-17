# Azure App Service 部署指南

## 🎓 使用 GitHub Student Pack 免費部署到 Azure

### 前置準備
2. **配置 GitHub 部署**
   ```bash
   # 配置 GitHub 部署
   az webapp deployment source config --name password-creator-game --resource-group password-creator-rg --repo-url https://github.com/lin3598197/Password-creater --branch main --manual-integration
   ```

---

## 📋 部署類型選擇指南

### ✅ 選擇「代碼 (Code)」的原因：

1. **適合 Node.js 應用**
   - Azure 原生支援 Node.js
   - 自動檢測 `package.json`
   - 自動運行 `npm install`

2. **簡化部署流程**
   - 直接從 GitHub 部署源碼
   - 無需 Docker 知識
   - Azure 自動構建和運行

3. **成本效益**
   - Free F1 計畫支援代碼部署
   - 無需額外的容器註冊表

4. **維護簡單**
   - Azure 自動管理 Node.js 運行時
   - 自動安全更新

### ❌ 何時選擇「容器 (Container)」：

1. **複雜應用需求**
   - 需要特定的系統依賴
   - 自定義環境配置
   - 微服務架構

2. **已有 Docker 經驗**
   - 團隊熟悉 Docker
   - 已有容器化流程

3. **多環境一致性**
   - 需要完全相同的運行環境
   - 複雜的依賴關係*申請 Azure 學生帳戶**
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

### ⚡ 快速選擇指南

**在創建 App Service 時，請選擇：**
- ✅ **Publish**: `Code`（代碼）
- ✅ **Runtime stack**: `Node.js 20 LTS`（或 Node.js 22 LTS）
- ✅ **Operating System**: `Linux`

**為什麼這樣選擇？**
- 🎯 最適合你的 Node.js WebSocket 應用
- 💰 成本最低（Free F1 支援）
- 🔧 設置最簡單
- 🚀 部署最快速
- ⚡ Node.js 20/22 性能更好，更安全

### 📊 部署流程圖

```
GitHub Repository (你的代碼)
         ↓
Azure App Service (Code 部署)
         ↓
自動檢測 package.json
         ↓
自動運行 npm install
         ↓
自動運行 npm start (server.js)
         ↓
🎉 WebSocket 服務器運行成功！
```

---

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
   #    - Publish: Code（選擇代碼而不是 Docker Container）
   #    - Runtime stack: Node.js 20 LTS（推薦）或 Node.js 22 LTS
   #    - Operating System: Linux（推薦）
   #    - Region: East US（或距離你最近的）
   #    - Pricing Plan: Free F1（學生免費）
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
   az webapp create --resource-group password-creator-rg --plan password-creator-plan --name password-creator-game --runtime "NODE:20-lts"
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
WEBSITE_NODE_DEFAULT_VERSION = 20-lts
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

### 🚨 Free F1 方案限制詳解

#### **基本限制：**
| 限制項目 | Free F1 | 影響 | 解決方案 |
|---------|---------|------|----------|
| **CPU 時間** | 每日 60 分鐘 | 🟡 中等影響 | 使用低流量時足夠 |
| **記憶體** | 1GB | 🟢 無影響 | 你的應用很小，足夠 |
| **儲存空間** | 1GB | 🟢 無影響 | 你的應用 < 100MB |
| **頻寬** | 每日 165MB | 🔴 **可能限制** | 高流量時會用完 |
| **自訂域名** | ❌ 不支援 | 🟡 中等影響 | 只能用 `.azurewebsites.net` |
| **SSL 憑證** | ❌ 不支援 | 🟡 中等影響 | Azure 提供基本 HTTPS |
| **縮放** | ❌ 無法縮放 | 🟡 中等影響 | 單一實例 |
| **Always On** | ❌ 會休眠 | 🔴 **重要限制** | 20分鐘無活動會休眠 |

#### **⚠️ 最重要的限制：**

**1. 應用休眠（Cold Start）**
- 📝 **限制**：20分鐘無活動會休眠
- 🎯 **影響**：第一個使用者需等待 10-30 秒喚醒
- 💡 **解決方案**：升級到 Basic B1 ($13/月) 啟用 Always On

**2. CPU 配額（每日 60 分鐘）**
- 📝 **限制**：每天只能使用 60 分鐘 CPU 時間
- 🎯 **影響**：高併發或運算密集時會觸發
- 💡 **解決方案**：優化代碼或升級方案

**3. 頻寬限制（每日 165MB）**
- 📝 **限制**：每天 165MB 輸出流量
- 🎯 **影響**：約 500-1000 個遊戲會話
- 💡 **解決方案**：壓縮資源或升級方案

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

## ⚠️ Free F1 方案限制詳解

### 🚨 主要限制和影響

| 限制項目 | Free F1 限制 | 對你的影響 | 建議解決方案 |
|---------|-------------|-----------|-------------|
| **應用休眠** | 20分鐘無活動休眠 | 🔴 首次訪問慢 | 升級 Basic B1 或接受延遲 |
| **CPU 配額** | 每日 60 分鐘 | 🟡 高流量時限制 | 優化代碼效率 |
| **記憶體** | 1GB RAM | 🟢 對你足夠 | 無需擔心 |
| **儲存** | 1GB 磁碟 | 🟢 對你足夠 | 無需擔心 |
| **頻寬** | 每日 165MB 出流量 | 🟡 約1000次遊戲 | 壓縮資源 |
| **自訂域名** | ❌ 不支援 | 🟡 只能用長網址 | 升級或使用短網址 |
| **SSL** | 基本 HTTPS | 🟢 夠用 | Azure 自動提供 |
| **備份** | ❌ 無備份 | 🟡 數據風險 | 定期手動備份 |

### 📊 實際使用預估

**你的密碼遊戲在 Free F1 上的表現：**

✅ **適合場景：**
- 個人作品集展示
- 學習和測試用途
- 每日 < 100 位訪客
- 非商業用途

⚠️ **需要注意：**
- 第一次訪問需等待 10-30 秒喚醒
- 高峰期可能觸及 CPU 限制
- 無法使用自己的域名

❌ **不適合場景：**
- 24/7 商業應用
- 高併發多人遊戲
- 需要即時回應的應用

### 💡 Free F1 優化技巧

#### **1. 減少冷啟動影響**
```javascript
// 添加到 server.js 的 setupRoutes()
this.app.get('/warmup', (req, res) => {
    res.json({ status: 'warm', timestamp: new Date() });
});
```

#### **2. 壓縮資源減少頻寬**
```bash
# 安裝壓縮中間件
npm install compression
```

```javascript
// 在 server.js 中添加
import compression from 'compression';
this.app.use(compression());
```

#### **3. 監控配額使用**
在 Azure Portal 中查看：
- App Service → Metrics → CPU Time
- App Service → Metrics → Data Out

### 🚀 升級時機和方案

#### **何時考慮升級到 Basic B1 ($13/月)：**
- 🎯 想要 24/7 即時回應
- 🎯 每日訪客 > 100 人
- 🎯 需要自訂域名
- 🎯 商業或正式用途

#### **Basic B1 的優勢：**
- ✅ **Always On**：無休眠，即時回應
- ✅ **無 CPU 配額**：可承受高負載
- ✅ **自訂域名**：可使用 yourgame.com
- ✅ **完整 SSL**：更好的安全性
- ✅ **應用備份**：資料保護

#### **升級指令：**
```bash
# Azure CLI 升級
az appservice plan update --name password-creator-plan --resource-group password-creator-rg --sku B1

# 成本：約 $13/月，你的 $100 學生額度可用 7+ 個月
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

### 🤔 常見問題 FAQ

**Q: 為什麼選擇代碼而不是容器？**
A: 對於你的 Node.js 應用，代碼部署更簡單、更便宜、更快速。Azure 會自動處理所有配置。

**Q: 可以之後改成容器部署嗎？**
A: 可以，但需要重新創建 App Service。不過對於這個專案，代碼部署已經足夠。

**Q: Linux 還是 Windows？**
A: 推薦 Linux，因為：
- 成本更低
- 性能更好
- Node.js 原生支援更佳

**Q: Node.js 20 vs 22，選哪個？**
A: 都可以！推薦：
- Node.js 20 LTS：長期支援版，最穩定
- Node.js 22 LTS：最新功能，性能更好
- 你的應用在兩個版本都能完美運行

**Q: 部署失敗怎麼辦？**
A: 檢查以下項目：
- 確認選擇了 "Code" 而不是 "Container"
- 確認 Runtime 是 "Node.js 20 LTS" 或 "Node.js 22 LTS"
- 檢查 package.json 中有 "start" 腳本

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

---

## 🎯 Node.js 版本更新總結

**好消息！Azure 提供 Node.js 20 和 22，都比 18 更好！**

### 版本選擇建議：

| 版本 | 特點 | 推薦度 |
|------|------|--------|
| **Node.js 20 LTS** | ✅ 長期支援，最穩定，企業首選 | ⭐⭐⭐⭐⭐ |
| **Node.js 22 LTS** | ✅ 最新功能，性能提升 | ⭐⭐⭐⭐⭐ |

### 🚀 配置要點：

**在 Azure Portal 創建時選擇：**
- ✅ **Publish**: `Code`
- ✅ **Runtime stack**: `Node.js 20 LTS`（推薦）或 `Node.js 22 LTS`
- ✅ **Operating System**: `Linux`

**你的密碼產生器完全支援這兩個版本！** 性能更好、安全性更高！ 🔥
