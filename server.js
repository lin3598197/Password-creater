// WebSocket 伺服器 - 支援多人遊戲功能
import { WebSocketServer, WebSocket } from 'ws';
import express from 'express';
import http from 'http';

class GameServer {
    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.wss = new WebSocketServer({ server: this.server });
        
        this.players = new Map(); // 存儲玩家信息
        this.gameRooms = new Map(); // 存儲遊戲房間
        this.globalStats = {
            totalPlayers: 0,
            gamesCompleted: 0,
            leaderboard: [] // 改為排行榜，包含玩家名字和分數
        };
        
        this.setupWebSocket();
        this.setupRoutes();
    }
    
    setupWebSocket() {
        this.wss.on('connection', (ws) => {
            console.log('新玩家連接');
            
            // 生成唯一玩家 ID
            const playerId = this.generatePlayerId();
            this.players.set(playerId, {
                ws: ws,
                id: playerId,
                name: `玩家${playerId.slice(-4)}`,
                currentLevel: 1,
                score: 0,
                isPlaying: false,
                room: null
            });
            
            // 發送歡迎訊息和玩家 ID
            ws.send(JSON.stringify({
                type: 'welcome',
                playerId: playerId,
                message: '歡迎來到密碼產生器多人遊戲！'
            }));
            
            // 更新統計並發送
            this.globalStats.totalPlayers = this.players.size;
            this.updateLeaderboard();
            this.sendGlobalStats(ws);
            this.broadcastGlobalStats();
            
            ws.on('message', (message) => {
                this.handleMessage(playerId, message);
            });
            
            ws.on('close', () => {
                console.log(`玩家 ${playerId} 斷線`);
                this.handlePlayerDisconnect(playerId);
            });
            
            ws.on('error', (error) => {
                console.error('WebSocket 錯誤:', error);
            });
        });
    }
    
    setupRoutes() {
        this.app.get('/api/stats', (req, res) => {
            res.json(this.globalStats);
        });
        
        this.app.get('/api/leaderboard', (req, res) => {
            const leaderboard = Array.from(this.players.values())
                .filter(player => player.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
                .map(player => ({
                    name: player.name,
                    score: player.score,
                    level: player.currentLevel
                }));
            
            res.json(leaderboard);
        });
    }
    
    handleMessage(playerId, message) {
        try {
            const data = JSON.parse(message);
            const player = this.players.get(playerId);
            
            if (!player) return;
            
            switch (data.type) {
                case 'setPlayerName':
                    this.handleSetPlayerName(playerId, data.name);
                    break;
                    
                case 'startGame':
                    this.handleStartGame(playerId);
                    break;
                    
                case 'levelComplete':
                    this.handleLevelComplete(playerId, data.level, data.score);
                    break;
                    
                case 'gameComplete':
                    this.handleGameComplete(playerId, data.finalScore);
                    break;
                    
                case 'joinRoom':
                    this.handleJoinRoom(playerId, data.roomId);
                    break;
                    
                case 'createRoom':
                    this.handleCreateRoom(playerId);
                    break;
                    
                case 'heartbeat':
                    player.ws.send(JSON.stringify({ type: 'heartbeat' }));
                    break;
                    
                default:
                    console.log('未知訊息類型:', data.type);
            }
        } catch (error) {
            console.error('處理訊息錯誤:', error);
        }
    }
    
    handleSetPlayerName(playerId, name) {
        const player = this.players.get(playerId);
        if (player && name && name.length <= 20) {
            player.name = name;
            player.ws.send(JSON.stringify({
                type: 'nameUpdated',
                name: name
            }));
            
            // 更新排行榜（即使分數為0也更新，這樣可以顯示線上玩家）
            this.updateLeaderboard();
            this.broadcastGlobalStats();
        }
    }
    
    handleStartGame(playerId) {
        const player = this.players.get(playerId);
        if (player) {
            player.isPlaying = true;
            player.currentLevel = 1;
            player.score = 0;
            
            // 廣播玩家開始遊戲
            this.broadcastToAll({
                type: 'playerStarted',
                playerName: player.name
            }, playerId);
        }
    }
    
    handleLevelComplete(playerId, level, score) {
        const player = this.players.get(playerId);
        if (player) {
            player.currentLevel = level + 1;
            player.score = score;
            
            // 更新排行榜
            this.updateLeaderboard();
            this.broadcastGlobalStats();
            
            // 廣播關卡完成
            this.broadcastToAll({
                type: 'playerProgress',
                playerName: player.name,
                level: level + 1,
                score: score
            }, playerId);
        }
    }
    
    handleGameComplete(playerId, finalScore) {
        const player = this.players.get(playerId);
        if (player) {
            player.isPlaying = false;
            player.score = finalScore;
            
            // 更新全域統計
            this.updateGlobalStats(finalScore);
            
            // 廣播遊戲完成
            this.broadcastToAll({
                type: 'playerCompleted',
                playerName: player.name,
                finalScore: finalScore
            });
            
            // 發送更新的統計
            this.broadcastGlobalStats();
        }
    }
    
    handleJoinRoom(playerId, roomId) {
        // 多人房間功能 (待實現)
        console.log(`玩家 ${playerId} 嘗試加入房間 ${roomId}`);
    }
    
    handleCreateRoom(playerId) {
        // 創建多人房間功能 (待實現)
        console.log(`玩家 ${playerId} 創建房間`);
    }
    
    handlePlayerDisconnect(playerId) {
        const player = this.players.get(playerId);
        if (player) {
            // 廣播玩家離線
            this.broadcastToAll({
                type: 'playerDisconnected',
                playerName: player.name
            }, playerId);
            
            this.players.delete(playerId);
            
            // 更新排行榜和統計
            this.globalStats.totalPlayers = this.players.size;
            this.updateLeaderboard();
            this.broadcastGlobalStats();
        }
    }
    
    updateGlobalStats(score) {
        this.globalStats.gamesCompleted++;
        this.globalStats.totalPlayers = this.players.size;
        
        // 更新排行榜
        this.updateLeaderboard();
    }
    
    updateLeaderboard() {
        const leaderboard = Array.from(this.players.values())
            .filter(player => player.score > 0 || player.name !== `玩家${player.id.slice(-4)}`) // 顯示有分數或已設置名字的玩家
            .map(player => ({
                name: player.name,
                score: player.score
            }))
            .sort((a, b) => b.score - a.score) // 按分數降序排列
            .slice(0, 10); // 只取前10名
        
        this.globalStats.leaderboard = leaderboard;
    }
    
    broadcastToAll(message, excludePlayerId = null) {
        this.players.forEach((player, playerId) => {
            if (playerId !== excludePlayerId && player.ws.readyState === WebSocket.OPEN) {
                player.ws.send(JSON.stringify(message));
            }
        });
    }
    
    broadcastGlobalStats() {
        this.players.forEach(player => {
            this.sendGlobalStats(player.ws);
        });
    }
    
    sendGlobalStats(ws) {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'globalStats',
                stats: this.globalStats
            }));
        }
    }
    
    generatePlayerId() {
        return 'player_' + Math.random().toString(36).substr(2, 9);
    }
    
    start(port = 8080) {
        this.server.listen(port, () => {
            console.log(`🚀 密碼產生器遊戲伺服器啟動於埠口 ${port}`);
            console.log(`WebSocket: ws://localhost:${port}`);
            console.log(`API: http://localhost:${port}/api/stats`);
        });
    }
}

// 啟動伺服器
const gameServer = new GameServer();
gameServer.start(8080);

export default GameServer;
