// 部署配置 - 根據環境自動選擇 WebSocket 伺服器
export const CONFIG = {
    // 開發環境
    development: {
        websocket: 'ws://localhost:8080',
        api: 'http://localhost:8080'
    },
    
    // 生產環境 - 這些 URL 需要在部署後更新
    production: {
        // Azure App Service 部署後的 URL (推薦學生使用)
        azure: 'wss://password-creater-game-dhefa2f2ecfmbaah.eastasia-01.azurewebsites.net',
        
        // Railway 部署後的 URL (需要替換)
        railway: 'wss://your-app-name.up.railway.app',
        
        // Heroku 部署後的 URL (需要替換)
        heroku: 'wss://your-app-name.herokuapp.com',
        
        // Render 部署後的 URL (需要替換)
        render: 'wss://your-app-name.onrender.com',
        
        // Glitch 部署後的 URL (需要替換)
        glitch: 'wss://your-project-name.glitch.me'
    }
};

// 自動檢測環境並選擇合適的伺服器
export function getServerConfig() {
    // 如果是 localhost，使用開發環境
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return CONFIG.development;
    }
    
    // 如果是 Azure App Service
    if (window.location.hostname.includes('azurewebsites.net')) {
        return {
            websocket: CONFIG.production.azure
        };
    }
    
    // 如果是 GitHub Pages，嘗試連接到生產伺服器
    if (window.location.hostname.includes('github.io')) {
        // 嘗試不同的生產伺服器，按優先級排序
        return {
            websockets: [
                CONFIG.production.azure,     // Azure - 學生首選，穩定免費
                CONFIG.production.railway,   // Railway - 免費額度
                CONFIG.production.heroku,    // Heroku - 穩定但付費
                CONFIG.production.render,    // Render - 免費但休眠
                CONFIG.production.glitch     // Glitch - 最後選擇
            ]
        };
    }
    
    // 默認使用開發環境
    return CONFIG.development;
}
