// WebSocket 客戶端管理器
import LanguageManager from './languages.js';

class GameWebSocket {
    constructor(gameInstance) {
        this.game = gameInstance;
        this.ws = null;
        this.playerId = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.lang = LanguageManager;
        this.lastStats = null; // 保存最新的統計數據
        
        // 監聽語言變更事件
        window.addEventListener('languageChanged', () => {
            this.updateConnectionStatusDisplay();
            // 如果有統計數據，重新渲染
            if (this.lastStats) {
                this.updateGlobalStats(this.lastStats);
            }
        });
        
        this.connect();
    }
    
    connect() {
        try {
            // 連接到 WebSocket 伺服器
            this.ws = new WebSocket('ws://localhost:8080');
            
            this.ws.onopen = () => {
                console.log('✅ 已連接到遊戲伺服器');
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.showConnectionStatus(this.lang.t('connectionStatus.connected'), 'connected');
            };
            
            this.ws.onmessage = (event) => {
                this.handleMessage(JSON.parse(event.data));
            };
            
            this.ws.onclose = () => {
                console.log('❌ 與伺服器連線中斷');
                this.isConnected = false;
                this.showConnectionStatus(this.lang.t('connectionStatus.disconnected'), 'disconnected');
                this.attemptReconnect();
            };
            
            this.ws.onerror = (error) => {
                console.error('WebSocket 錯誤:', error);
                this.showConnectionStatus(this.lang.t('connectionStatus.disconnected'), 'disconnected');
            };
            
        } catch (error) {
            console.error('連接失敗:', error);
            this.showConnectionStatus(this.lang.t('connectionStatus.disconnected'), 'disconnected');
        }
    }
    
    handleMessage(data) {
        switch (data.type) {
            case 'welcome':
                this.playerId = data.playerId;
                this.showNotification(data.message, 'info');
                break;
                
            case 'globalStats':
                this.lastStats = data.stats; // 保存統計數據
                this.updateGlobalStats(data.stats);
                break;
                
            case 'playerStarted':
                this.showNotification(this.lang.t('notifications.playerStarted', [data.playerName]), 'info');
                break;
                
            case 'playerProgress':
                this.showNotification(this.lang.t('notifications.playerProgress', [data.playerName, data.level, data.score]), 'success');
                break;
                
            case 'playerCompleted':
                this.showNotification(this.lang.t('notifications.playerCompleted', [data.playerName, data.finalScore]), 'success');
                break;
                
            case 'playerDisconnected':
                this.showNotification(this.lang.t('notifications.playerDisconnected', [data.playerName]), 'info');
                break;
                
            case 'nameUpdated':
                this.showNotification(this.lang.t('notifications.nameUpdated', [data.name]), 'success');
                break;
                
            case 'heartbeat':
                // 心跳回應，保持連線
                break;
                
            default:
                console.log('收到未知訊息:', data);
        }
    }
    
    // 發送玩家開始遊戲
    sendGameStart() {
        this.sendMessage({
            type: 'startGame'
        });
    }
    
    // 發送關卡完成
    sendLevelComplete(level, score) {
        this.sendMessage({
            type: 'levelComplete',
            level: level,
            score: score
        });
    }
    
    // 發送遊戲完成
    sendGameComplete(finalScore) {
        this.sendMessage({
            type: 'gameComplete',
            finalScore: finalScore
        });
    }
    
    // 設定玩家名稱
    setPlayerName(name) {
        this.sendMessage({
            type: 'setPlayerName',
            name: name
        });
    }
    
    sendMessage(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket 未連接，無法發送訊息');
        }
    }
    
    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            this.showConnectionStatus(this.lang.t('notifications.reconnecting', [this.reconnectAttempts]), 'connecting');
            
            setTimeout(() => {
                this.connect();
            }, 3000 * this.reconnectAttempts); // 遞增延遲
        } else {
            this.showConnectionStatus(this.lang.t('connectionStatus.disconnected'), 'disconnected');
        }
    }
    
    showConnectionStatus(status, type) {
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            statusElement.textContent = status;
            statusElement.className = `connection-status ${type}`;
        }
    }
    
    // 更新連接狀態顯示（用於語言切換時）
    updateConnectionStatusDisplay() {
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            const currentClass = statusElement.className;
            if (currentClass.includes('connected')) {
                statusElement.textContent = this.lang.t('connectionStatus.connected');
            } else if (currentClass.includes('disconnected')) {
                statusElement.textContent = this.lang.t('connectionStatus.disconnected');
            } else if (currentClass.includes('connecting')) {
                statusElement.textContent = this.lang.t('connectionStatus.connecting');
            }
        }
    }
    
    showNotification(message, type) {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 添加到通知容器
        let container = document.getElementById('notifications');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notifications';
            container.className = 'notifications-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // 自動移除通知
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    updateGlobalStats(stats) {
        const statsElement = document.getElementById('global-stats');
        if (statsElement) {
            let leaderboardHtml = '';
            if (stats.leaderboard && stats.leaderboard.length > 0) {
                leaderboardHtml = stats.leaderboard.map((player, index) => {
                    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
                    const scoreUnit = this.lang.t('globalStats.scoreUnit');
                    return `
                        <div class="leaderboard-item">
                            <span class="rank">${medal}</span>
                            <span class="player-name">${player.name}</span>
                            <span class="player-score">${player.score}${scoreUnit}</span>
                        </div>
                    `;
                }).join('');
            } else {
                leaderboardHtml = `<div class="no-players">${this.lang.t('globalStats.noPlayersData')}</div>`;
            }
            
            statsElement.innerHTML = `
                <h4>${this.lang.t('globalStats.title')}</h4>
                <div class="stat-item">
                    <span>${this.lang.t('globalStats.onlinePlayers')}</span>
                    <span>${stats.totalPlayers}</span>
                </div>
                <div class="stat-item">
                    <span>${this.lang.t('globalStats.gamesCompleted')}</span>
                    <span>${stats.gamesCompleted}</span>
                </div>
                <div class="leaderboard">
                    ${leaderboardHtml}
                </div>
            `;
        }
    }
    
    // 定期發送心跳
    startHeartbeat() {
        setInterval(() => {
            if (this.isConnected) {
                this.sendMessage({ type: 'heartbeat' });
            }
        }, 30000); // 每 30 秒一次
    }
    
    // 更新連接狀態顯示
    updateConnectionStatusDisplay() {
        const statusElement = document.getElementById('connection-status');
        if (statusElement) {
            let statusKey, statusClass;
            
            if (this.isConnected) {
                statusKey = 'connected';
                statusClass = 'connected';
            } else if (this.reconnectAttempts > 0 && this.reconnectAttempts < this.maxReconnectAttempts) {
                statusKey = 'connecting';
                statusClass = 'connecting';
            } else {
                statusKey = 'disconnected';
                statusClass = 'disconnected';
            }
            
            statusElement.textContent = this.lang.t(`connectionStatus.${statusKey}`);
            statusElement.className = `connection-status ${statusClass}`;
        }
    }
    
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
    }
}

export default GameWebSocket;
