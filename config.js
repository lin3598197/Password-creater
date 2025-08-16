// 部署配置 - 根據環境自動選擇 WebSocket 伺服器
export const CONFIG = {
    // 開發環境
    development: {
        websocket: 'ws://localhost:8080',
        api: 'http://localhost:8080'
    },
    
    // 生產環境 - 這些 URL 需要在部署後更新
    production: {
        // Heroku 部署後的 URL (需要替換)
        heroku: 'wss://your-app-name.herokuapp.com',
        
        // Railway 部署後的 URL (需要替換)
        railway: 'wss://your-app-name.up.railway.app',
        
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
    
    // 如果是 GitHub Pages，嘗試連接到生產伺服器
    if (window.location.hostname.includes('github.io')) {
        // 嘗試不同的生產伺服器，按優先級排序
        return {
            websockets: [
                CONFIG.production.heroku,
                CONFIG.production.railway,
                CONFIG.production.render,
                CONFIG.production.glitch
            ]
        };
    }
    
    // 默認使用開發環境
    return CONFIG.development;
}
