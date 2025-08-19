# 🔐 密碼產生器 - Password Creator

**[English](#english) | [中文](#chinese)**

---

## <a id="english"></a>🇺🇸 English

A challenging password creation and memory game with multiplayer online competition and real-time leaderboards.

### 🎮 Game Features

#### Core Gameplay
- **10 Progressive Levels**: From simple length requirements to complex special character combinations
- **Fixed Quiz System**: Password memory tests after levels 3, 5, 7, and 9
- **Unified Scoring System**: All players compete under the same standards, max score 1000
- **Password Similarity Check**: Prevents players from using overly similar passwords
- **Multilingual Support**: Chinese and English interface

#### Multiplayer Features
- **Real-time Online Leaderboard**: Shows all players' real-time scores and rankings
- **WebSocket Real-time Communication**: Player progress synchronized in real-time
- **Fair Competition Environment**: Fixed quiz schedule ensures fair competition

#### Technical Features
- **Modern Frontend**: Built with Vite, supports hot reload
- **Responsive Design**: Adapted for various devices and screen sizes
- **ES6 Modular**: Clean code structure
- **WebSocket Communication**: Stable real-time multiplayer functionality

### 🏆 Scoring System

| Action | Score Change |
|--------|--------------|
| Complete Level | +100 points |
| Quiz Correct | +50 points |
| Quiz Wrong | -20 points |
| Skip Quiz | -10 points |
| **Total Max** | **1000 points** |

**Quiz Schedule**: All players will have password memory quizzes after completing levels 3, 5, 7, and 9

### 🚀 Quick Start

#### Requirements
- Node.js 16+ 
- npm or yarn

#### Installation

1. **Clone the project**
```bash
git clone https://github.com/lin3598197/Password-creater.git
cd Password-creater
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the game**
```bash
# Start both frontend and backend services
npm run dev-full

# Or start separately
npm run server  # WebSocket server (port 8080)
npm run dev     # Frontend server (port 3000)
```

4. **Start playing**
- Open browser and visit `http://localhost:3000`
- Enter your game name
- Start the challenge!

### 🌐 Live Demo

- **Azure (Recommended)**: https://password-creater-game-dhefa2f2ecfmbaah.eastasia-01.azurewebsites.net/
- **GitHub Pages**: https://lin3598197.github.io/Password-creater/

### 📁 Project Structure

```
Password-creater/
├── index.html              # Main page
├── script.js               # Game core logic
├── style.css               # Stylesheet
├── languages.js            # Multilingual support
├── websocket-client.js     # WebSocket client
├── server.js               # WebSocket server
├── config.js               # Configuration
├── vite.config.js          # Vite configuration
├── package.json            # Project configuration
└── README.md               # Documentation
```

### 🎯 Level Design

#### Level Progression
1. **Level 1**: At least 6 characters
2. **Level 2**: At least 6 characters + digits
3. **Level 3**: Upper/lowercase + digits + special characters
4. **Level 4**: Special character types + no common passwords
5. **Level 5**: No repeating characters + no common words
6. **Level 6**: Advanced special requirements + no keyboard sequences
7. **Level 7**: Complex patterns + no common words (extended)
8. **Level 8**: Advanced character distribution + no keyboard sequences
9. **Level 9**: High complexity + unique special characters + entropy check
10. **Level 10**: Maximum complexity + all advanced requirements

### 🛠️ Development

#### Available Scripts

```bash
npm run dev        # Start frontend development server
npm run server     # Start WebSocket server
npm run dev-full   # Start both frontend and backend
npm run build      # Build production version
npm run preview    # Preview production version
```

#### Development Environment
- **Frontend**: Vite + ES6 modules
- **Backend**: Node.js + WebSocket (ws)
- **Styling**: Native CSS + responsive design
- **State Management**: Native JavaScript classes

### 🎨 Customization

#### Modify Level Requirements
Edit the `getLevelRequirements()` method in `script.js`:

```javascript
getLevelRequirements() {
    return {
        1: {
            title: "Custom Level",
            requirements: [
                {
                    text: "Custom requirement",
                    check: (password) => { /* Custom check logic */ }
                }
            ]
        }
    }
}
```

#### Modify Quiz Schedule
Edit the `quizSchedule` array in `script.js`:

```javascript
this.quizSchedule = [3, 5, 7, 9]; // Quiz levels
```

### 📱 Responsive Support

- **Desktop**: Full feature experience
- **Tablet**: Optimized touch interface
- **Mobile**: Adapted for small screen display

### 🤝 Contributing

1. Fork this project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

## <a id="chinese"></a>🇹🇼 中文

一個具有挑戰性的密碼創建和記憶遊戲，支援多人線上競技和即時排行榜。

### 🎮 遊戲特色

#### 核心玩法
- **10個漸進式關卡**：從簡單的長度要求到複雜的特殊字符組合
- **固定抽查系統**：在第3、5、7、9關後進行密碼記憶測試
- **統一分數制度**：所有玩家在相同標準下競爭，滿分1000分
- **密碼相似度檢查**：防止玩家使用過於相似的密碼
- **多語言支援**：中文和英文介面

#### 多人功能
- **即時線上排行榜**：顯示所有玩家的即時分數和排名
- **WebSocket即時通訊**：玩家進度實時同步
- **公平競技環境**：固定抽查次數確保比賽公平性

#### 技術特色
- **現代化前端**：使用Vite構建工具，支援熱重載
- **響應式設計**：適配各種設備和螢幕尺寸
- **ES6模組化**：清晰的程式碼結構
- **WebSocket通訊**：穩定的即時多人功能

### 🏆 分數制度

| 動作 | 分數變化 |
|------|----------|
| 完成關卡 | +100分 |
| 抽查正確 | +50分 |
| 抽查錯誤 | -20分 |
| 跳過抽查 | -10分 |
| **總滿分** | **1000分** |

**抽查時機**：所有玩家都會在第3、5、7、9關完成後進行密碼記憶抽查

### 🚀 快速開始

#### 環境需求
- Node.js 16+ 
- npm 或 yarn

#### 安裝步驟

1. **克隆專案**
```bash
git clone https://github.com/lin3598197/Password-creater.git
cd Password-creater
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

### 🌐 線上體驗

- **Azure（推薦）**: https://password-creater-game-dhefa2f2ecfmbaah.eastasia-01.azurewebsites.net/
- **GitHub Pages**: https://lin3598197.github.io/Password-creater/

### 📁 專案結構

```
Password-creater/
├── index.html              # 主頁面
├── script.js               # 遊戲核心邏輯
├── style.css               # 樣式表
├── languages.js            # 多語言支援
├── websocket-client.js     # WebSocket客戶端
├── server.js               # WebSocket服務器
├── config.js               # 配置文件
├── vite.config.js          # Vite配置
├── package.json            # 專案配置
└── README.md               # 說明文件
```

### 🎯 關卡設計

#### 關卡進度
1. **關卡1**：至少6個字符
2. **關卡2**：至少6個字符 + 數字
3. **關卡3**：大小寫字母 + 數字 + 特殊字符
4. **關卡4**：特殊字符類型 + 不含常見密碼
5. **關卡5**：不含重複字符 + 不含常見詞彙
6. **關卡6**：進階特殊要求 + 不含鍵盤連續
7. **關卡7**：複雜模式 + 不含常見詞彙（擴展）
8. **關卡8**：進階字符分布 + 不含鍵盤連續
9. **關卡9**：高複雜度 + 獨特特殊字符 + 熵值檢查
10. **關卡10**：最高複雜度 + 所有進階要求

### 🛠️ 開發

#### 可用腳本

```bash
npm run dev        # 啟動前端開發服務器
npm run server     # 啟動WebSocket服務器
npm run dev-full   # 同時啟動前端和後端
npm run build      # 構建生產版本
npm run preview    # 預覽生產版本
```

#### 開發環境
- **前端**：Vite + ES6 模組
- **後端**：Node.js + WebSocket (ws)
- **樣式**：原生CSS + 響應式設計
- **狀態管理**：原生JavaScript類別

### 🎨 自定義

#### 修改關卡要求
編輯 `script.js` 中的 `getLevelRequirements()` 方法：

```javascript
getLevelRequirements() {
    return {
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
}
```

#### 修改抽查時機
編輯 `script.js` 中的 `quizSchedule` 陣列：

```javascript
this.quizSchedule = [3, 5, 7, 9]; // 抽查關卡
```

### 📱 響應式支援

- **桌面端**：完整功能體驗
- **平板端**：優化的觸控介面
- **手機端**：適配小螢幕顯示

### 🤝 貢獻指南

1. Fork 此專案
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

### 📄 授權

此專案使用 MIT 授權 - 查看 [LICENSE](LICENSE) 文件了解詳情

---

## 🙏 Acknowledgments / 致謝

- Thanks to all contributors and test players / 感謝所有貢獻者和測試玩家
- Built with [Vite](https://vitejs.dev/) / 使用 [Vite](https://vitejs.dev/) 構建
- WebSocket powered by [ws](https://github.com/websockets/ws) / WebSocket 由 [ws](https://github.com/websockets/ws) 提供支援

## 📞 Contact / 聯絡

If you have any questions or suggestions / 如果你有任何問題或建議：
- Open an Issue / 開啟 Issue
- Submit a Pull Request / 提交 Pull Request
- Contact maintainer / 聯絡維護者

---

🎮 **Start your password challenge journey!** / **開始你的密碼挑戰之旅吧！** 🎮
