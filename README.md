# 🔐 密碼產生器 - Password Creator

一個具有挑戰性的密碼創建和記憶遊戲，支援多人線上競技和即時排行榜。

## 🎮 遊戲特色

### 核心玩法
- **10個漸進式關卡**：從簡單的長度要求到複雜的特殊字符組合
- **固定抽查系統**：在第3、5、7、9關後進行密碼記憶測試
- **統一分數制度**：所有玩家在相同標準下競爭，滿分1000分
- **密碼相似度檢查**：防止玩家使用過於相似的密碼

### 多人功能
- **即時線上排行榜**：顯示所有玩家的即時分數和排名
- **WebSocket即時通訊**：玩家進度實時同步
- **公平競技環境**：固定抽查次數確保比賽公平性

### 技術特色
- **現代化前端**：使用Vite構建工具，支援熱重載
- **響應式設計**：適配各種設備和螢幕尺寸
- **ES6模組化**：清晰的程式碼結構
- **WebSocket通訊**：穩定的即時多人功能

## 🏆 分數制度

| 動作 | 分數變化 |
|------|----------|
| 完成關卡 | +100分 |
| 抽查正確 | +50分 |
| 抽查錯誤 | -20分 |
| 跳過抽查 | -10分 |
| **總滿分** | **1000分** |

**抽查時機**：所有玩家都會在第3、5、7、9關完成後進行密碼記憶抽查

## 🚀 快速開始

### 環境需求
- Node.js 16+ 
- npm 或 yarn

### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/your-username/password-creator-game.git
cd password-creator-game
```

2. **安裝依賴**
```bash
npm install
```

3. **啟動遊戲**
```bash
# 同時啟動前端和後端服務
npm run dev-full

# 或分別啟動
npm run server  # WebSocket服務器 (端口8080)
npm run dev     # 前端服務器 (端口3000)
```

4. **開始遊戲**
- 打開瀏覽器訪問 `http://localhost:3000`
- 輸入你的遊戲名稱
- 開始挑戰！

## 📁 專案結構

```
password-creator-game/
├── index.html              # 主頁面
├── script.js               # 遊戲核心邏輯
├── style.css               # 樣式表
├── websocket-client.js     # WebSocket客戶端
├── server.js               # WebSocket服務器
├── vite.config.js          # Vite配置
├── package.json            # 專案配置
└── README.md               # 說明文件
```

## 🎯 關卡設計

### 關卡進度
1. **關卡1**：至少8個字符
2. **關卡2**：至少12個字符 + 數字
3. **關卡3**：大小寫字母 + 數字 + 特殊字符
4. **關卡4**：不含常見密碼 + 不含生日格式
5. **關卡5**：不含鍵盤連續字符 + 不含重複字符
6. **關卡6**：包含表情符號 + 數字總和≥50
7. **關卡7**：包含羅馬數字 + 質數個數≥3
8. **關卡8**：包含數學符號 + 包含化學元素符號
9. **關卡9**：包含星期幾 + 包含顏色英文
10. **關卡10**：包含國家名稱 + 字符長度為質數

## 🌐 多人功能

### 即時排行榜
- 顯示前10名玩家
- 實時更新分數
- 獎牌顯示（🥇🥈🥉）
- 線上玩家統計

### WebSocket事件
- 玩家連接/斷線
- 關卡進度更新
- 遊戲完成通知
- 分數即時同步

## 🛠️ 開發

### 可用腳本

```bash
npm run dev        # 啟動前端開發服務器
npm run server     # 啟動WebSocket服務器
npm run dev-full   # 同時啟動前端和後端
npm run build      # 構建生產版本
npm run preview    # 預覽生產版本
```

### 開發環境
- **前端**：Vite + ES6 模組
- **後端**：Node.js + WebSocket (ws)
- **樣式**：原生CSS + 響應式設計
- **狀態管理**：原生JavaScript類別

## 🎨 自定義

### 修改關卡要求
編輯 `script.js` 中的 `levelRequirements` 物件：

```javascript
levelRequirements: {
    1: {
        title: "自定義關卡",
        requirements: [
            {
                text: "自定義要求",
                check: (password) => { /* 自定義檢查邏輯 */ }
            }
        ]
    }
}
```

### 修改抽查時機
編輯 `script.js` 中的 `quizSchedule` 陣列：

```javascript
this.quizSchedule = [3, 5, 7, 9]; // 抽查關卡
```

## 📱 響應式支援

- **桌面端**：完整功能體驗
- **平板端**：優化的觸控介面
- **手機端**：適配小螢幕顯示

## 🤝 貢獻指南

1. Fork 此專案
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解詳情

## 🙏 致謝

- 感謝所有貢獻者和測試玩家
- 使用了 [canvas-confetti](https://github.com/catdad/canvas-confetti) 提供慶祝效果
- 使用了 [Vite](https://vitejs.dev/) 作為構建工具

## 📞 聯絡

如果你有任何問題或建議，歡迎：
- 開啟 Issue
- 提交 Pull Request
- 聯絡維護者

---

🎮 **開始你的密碼挑戰之旅吧！** 🎮
