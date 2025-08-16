// 密碼產生器遊戲 JavaScript - 現代化版本

// 導入 confetti 效果 (如果安裝了的話)
let confetti = null;
try {
    // 動態導入 confetti
    import('canvas-confetti').then(module => {
        confetti = module.default;
    }).catch(() => {
        console.log('Canvas confetti not available, using fallback effects');
    });
} catch (e) {
    console.log('Canvas confetti not available');
}

// 導入 WebSocket 客戶端
import GameWebSocket from './websocket-client.js';

// 導入語言管理器
import LanguageManager from './languages.js';

class PasswordGame {
    constructor() {
        this.currentLevel = 1;
        this.maxLevel = 10;
        this.score = 0;
        this.streak = 0;
        this.passwords = {}; // 存儲各關卡的密碼
        this.currentPassword = '';
        this.quizMode = false;
        this.quizLevel = 1;
        this.isProcessing = false; // 防止重複提交
        
        // 固定抽查計劃 - 所有玩家都相同
        this.quizSchedule = [3, 5, 7, 9]; // 在第3, 5, 7, 9關完成後觸發抽查
        this.completedQuizzes = new Set(); // 記錄已完成的抽查
        
        // WebSocket 集成
        this.websocket = null;
        this.isOnlineMode = false;
        
        // 玩家信息
        this.playerName = '';
        this.leaderboard = [];
        
        // 語言管理器
        this.lang = LanguageManager;
        
        // 初始化多語言支持
        this.setupLanguageSupport();
        
        this.initializeGame();
        
        // 嘗試連接 WebSocket（可選）
        this.initializeWebSocket();
    }
    
    // 設置語言支持
    setupLanguageSupport() {
        // 監聽語言變更事件
        window.addEventListener('languageChanged', () => {
            this.updateGameUI();
        });
        
        // 初始化語言
        this.lang.updatePageLanguage();
    }
    
    // 更新遊戲UI的語言
    updateGameUI() {
        // 更新當前關卡標題
        if (this.currentLevel > 0) {
            this.updateChallengeTitle();
            this.updateRequirements();
        }
        
        // 更新密碼列表
        this.updatePasswordList();
        
        // 更新連接狀態
        this.updateConnectionStatus();
        
        // 更新玩家名稱顯示
        this.updatePlayerDisplay();
    }
    
    // 更新關卡標題
    updateChallengeTitle() {
        const levelRequirements = this.getLevelRequirements();
        const config = levelRequirements[this.currentLevel];
        if (config) {
            document.getElementById('challenge-title').textContent = 
                `${this.lang.t('levelText')} ${this.currentLevel}: ${config.title}`;
        }
    }
    
    // 更新要求列表
    updateRequirements() {
        const levelRequirements = this.getLevelRequirements();
        const config = levelRequirements[this.currentLevel];
        if (config) {
            this.renderRequirements(config.requirements);
        }
    }
    
    // 獲取關卡要求配置 - 動態多語言版本
    getLevelRequirements() {
        return {
            1: {
                title: this.lang.t('levels.1.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 6), check: (pwd) => pwd.length >= 6 }
                ]
            },
            2: {
                title: this.lang.t('levels.2.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 6), check: (pwd) => pwd.length >= 6 },
                    { text: this.lang.getRequirementText('minDigits', 1), check: (pwd) => /\d/.test(pwd) }
                ]
            },
            3: {
                title: this.lang.t('levels.3.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 8), check: (pwd) => pwd.length >= 8 },
                    { text: this.lang.getRequirementText('minDigits', 1), check: (pwd) => /\d/.test(pwd) },
                    { text: this.lang.getRequirementText('uppercase'), check: (pwd) => /[A-Z]/.test(pwd) },
                    { text: this.lang.getRequirementText('lowercase'), check: (pwd) => /[a-z]/.test(pwd) }
                ]
            },
            4: {
                title: this.lang.t('levels.4.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 10), check: (pwd) => pwd.length >= 10 },
                    { text: this.lang.getRequirementText('minDigits', 1), check: (pwd) => /\d/.test(pwd) },
                    { text: this.lang.getRequirementText('uppercase'), check: (pwd) => /[A-Z]/.test(pwd) },
                    { text: this.lang.getRequirementText('lowercase'), check: (pwd) => /[a-z]/.test(pwd) },
                    { text: this.lang.getRequirementText('specialChars'), check: (pwd) => /[!@#$%^&*]/.test(pwd) }
                ]
            },
            5: {
                title: this.lang.t('levels.5.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 12), check: (pwd) => pwd.length >= 12 },
                    { text: this.lang.getRequirementText('minDigits', 2), check: (pwd) => (pwd.match(/\d/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('uppercase'), check: (pwd) => /[A-Z]/.test(pwd) },
                    { text: this.lang.getRequirementText('lowercase'), check: (pwd) => /[a-z]/.test(pwd) },
                    { text: this.lang.getRequirementText('specialCharsGeneral'), check: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
                    { text: this.lang.getRequirementText('noRepeatingChars', 3), check: (pwd) => !/(.)\1{2,}/.test(pwd) }
                ]
            },
            6: {
                title: this.lang.t('levels.6.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 14), check: (pwd) => pwd.length >= 14 },
                    { text: this.lang.getRequirementText('minDigits', 2), check: (pwd) => (pwd.match(/\d/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('minUppercase', 2), check: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('lowercase'), check: (pwd) => /[a-z]/.test(pwd) },
                    { text: this.lang.getRequirementText('minSpecialChars', 2), check: (pwd) => (pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('noRepeatingChars', 3), check: (pwd) => !/(.)\1{2,}/.test(pwd) },
                    { text: this.lang.getRequirementText('noCommonWords'), check: (pwd) => !/password|123456|qwerty|admin|login/i.test(pwd) }
                ]
            },
            7: {
                title: this.lang.t('levels.7.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 16), check: (pwd) => pwd.length >= 16 },
                    { text: this.lang.getRequirementText('minDigits', 3), check: (pwd) => (pwd.match(/\d/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('minUppercase', 2), check: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('minLowercase', 2), check: (pwd) => (pwd.match(/[a-z]/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('minSpecialChars', 2), check: (pwd) => (pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length >= 2 },
                    { text: this.lang.getRequirementText('noRepeatingChars', 3), check: (pwd) => !/(.)\1{2,}/.test(pwd) },
                    { text: this.lang.getRequirementText('noCommonWordsExtended'), check: (pwd) => !/password|123456|qwerty|admin|login|welcome/i.test(pwd) },
                    { text: this.lang.getRequirementText('noKeyboardSequence'), check: (pwd) => !/qwer|asdf|zxcv|1234|4567|7890|abcd|efgh/i.test(pwd) }
                ]
            },
            8: {
                title: this.lang.t('levels.8.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 18), check: (pwd) => pwd.length >= 18 },
                    { text: this.lang.getRequirementText('minDigits', 3), check: (pwd) => (pwd.match(/\d/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('minUppercase', 3), check: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('minLowercase', 3), check: (pwd) => (pwd.match(/[a-z]/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('minSpecialChars', 3), check: (pwd) => (pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('noRepeatingChars', 3), check: (pwd) => !/(.)\1{2,}/.test(pwd) },
                    { text: this.lang.getRequirementText('noCommonWordsExtended'), check: (pwd) => !/password|123456|qwerty|admin|login|welcome|computer|internet/i.test(pwd) },
                    { text: this.lang.getRequirementText('noKeyboardSequence'), check: (pwd) => !/qwer|asdf|zxcv|1234|4567|7890|abcd|efgh|ijkl|mnop/i.test(pwd) },
                    { text: this.lang.getRequirementText('noRepeatingSubstrings'), check: (pwd) => !/(.{2,})\1/.test(pwd) }
                ]
            },
            9: {
                title: this.lang.t('levels.9.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 20), check: (pwd) => pwd.length >= 20 },
                    { text: this.lang.getRequirementText('minDigits', 4), check: (pwd) => (pwd.match(/\d/g) || []).length >= 4 },
                    { text: this.lang.getRequirementText('minUppercase', 3), check: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 3 },
                    { text: this.lang.getRequirementText('minLowercase', 4), check: (pwd) => (pwd.match(/[a-z]/g) || []).length >= 4 },
                    { text: this.lang.getRequirementText('minDifferentSpecialChars', 4), check: (pwd) => {
                        const specials = pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || [];
                        const uniqueSpecials = [...new Set(specials)];
                        return uniqueSpecials.length >= 4;
                    }},
                    { text: this.lang.getRequirementText('noRepeatingChars', 3), check: (pwd) => !/(.)\1{2,}/.test(pwd) },
                    { text: this.lang.getRequirementText('noCommonWordsExtended'), check: (pwd) => !/password|123456|qwerty|admin|login|welcome|computer|internet|security|master/i.test(pwd) },
                    { text: this.lang.getRequirementText('noKeyboardSequence'), check: (pwd) => !/qwer|asdf|zxcv|1234|4567|7890|abcd|efgh|ijkl|mnop|qrst|uvwx/i.test(pwd) },
                    { text: this.lang.getRequirementText('noRepeatingSubstringsAdvanced'), check: (pwd) => !/(.{2,})\1/.test(pwd) },
                    { text: this.lang.getRequirementText('evenDistribution'), check: (pwd) => {
                        const charCounts = {};
                        for (let char of pwd) {
                            charCounts[char] = (charCounts[char] || 0) + 1;
                        }
                        const maxCount = Math.max(...Object.values(charCounts));
                        return maxCount <= Math.ceil(pwd.length / 5);
                    }}
                ]
            },
            10: {
                title: this.lang.t('levels.10.title'),
                requirements: [
                    { text: this.lang.getRequirementText('minLength', 24), check: (pwd) => pwd.length >= 24 },
                    { text: this.lang.getRequirementText('minDigits', 5), check: (pwd) => (pwd.match(/\d/g) || []).length >= 5 },
                    { text: this.lang.getRequirementText('minUppercase', 4), check: (pwd) => (pwd.match(/[A-Z]/g) || []).length >= 4 },
                    { text: this.lang.getRequirementText('minLowercase', 5), check: (pwd) => (pwd.match(/[a-z]/g) || []).length >= 5 },
                    { text: this.lang.getRequirementText('minDifferentSpecialChars', 5), check: (pwd) => {
                        const specials = pwd.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || [];
                        const uniqueSpecials = [...new Set(specials)];
                        return uniqueSpecials.length >= 5;
                    }},
                    { text: this.lang.getRequirementText('noRepeatingChars', 2), check: (pwd) => !/(.)\1/.test(pwd) },
                    { text: this.lang.getRequirementText('noCommonWordsAdvanced'), check: (pwd) => !/password|123456|qwerty|admin|login|welcome|computer|internet|security|master|system|user|guest/i.test(pwd) },
                    { text: this.lang.getRequirementText('noKeyboardSequenceAdvanced'), check: (pwd) => !/qwer|asdf|zxcv|1234|4567|7890|abcd|efgh|ijkl|mnop|qrst|uvwx|yzab/i.test(pwd) },
                    { text: this.lang.getRequirementText('noRepeatingSubstringsAdvanced'), check: (pwd) => !/(.{2,})\1/.test(pwd) },
                    { text: this.lang.getRequirementText('randomDistribution'), check: (pwd) => {
                        const charCounts = {};
                        for (let char of pwd) {
                            charCounts[char] = (charCounts[char] || 0) + 1;
                        }
                        const maxCount = Math.max(...Object.values(charCounts));
                        return maxCount <= Math.max(2, Math.ceil(pwd.length / 8));
                    }},
                    { text: this.lang.getRequirementText('entropyCheck'), check: (pwd) => {
                        const uniqueChars = new Set(pwd.split(''));
                        const entropy = uniqueChars.size / pwd.length;
                        return entropy >= 0.75 && uniqueChars.size >= 16;
                    }}
                ]
            }
        };
    }
        
    initializeGame() {
        this.bindEvents();
        this.showScreen('start-screen');
    }
    
    initializeWebSocket() {
        try {
            this.websocket = new GameWebSocket(this);
            this.websocket.startHeartbeat();
            this.isOnlineMode = true;
            console.log('🌐 線上模式已啟用');
        } catch (error) {
            console.log('🔌 離線模式 - WebSocket 不可用');
            this.isOnlineMode = false;
        }
    }
    
    validatePlayerName() {
        const nameInput = document.getElementById('player-name');
        const nameFeedback = document.getElementById('name-feedback');
        const name = nameInput.value.trim();
        
        if (name.length === 0) {
            nameFeedback.textContent = '';
            nameFeedback.className = 'feedback';
            return false;
        } else if (name.length < 2) {
            nameFeedback.textContent = this.lang.t('validation.nameMinLength');
            nameFeedback.className = 'feedback error';
            return false;
        } else if (name.length > 20) {
            nameFeedback.textContent = this.lang.t('validation.nameMaxLength');
            nameFeedback.className = 'feedback error';
            return false;
        } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5\s_-]+$/.test(name)) {
            nameFeedback.textContent = this.lang.t('validation.nameInvalidChars');
            nameFeedback.className = 'feedback error';
            return false;
        } else {
            nameFeedback.textContent = this.lang.t('validation.nameValid');
            nameFeedback.className = 'feedback success';
            return true;
        }
    }
    
    validateAndStartGame() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput.value.trim();
        
        if (!name) {
            const nameFeedback = document.getElementById('name-feedback');
            nameFeedback.textContent = this.lang.t('validation.nameRequired');
            nameFeedback.className = 'feedback error';
            nameInput.focus();
            return;
        }
        
        if (this.validatePlayerName()) {
            this.playerName = name;
            this.updatePlayerDisplay();
            
            // 發送名稱到伺服器
            if (this.isOnlineMode && this.websocket) {
                this.websocket.setPlayerName(name);
            }
            
            this.startGame();
        }
    }
    
    // 更新連接狀態
    updateConnectionStatus() {
        // 如果有 WebSocket 實例，使用它的方法
        if (this.websocket) {
            this.websocket.updateConnectionStatusDisplay();
        } else {
            // 否則使用備用方法
            const statusElement = document.getElementById('connection-status');
            if (statusElement) {
                const status = statusElement.classList.contains('connected') ? 'connected' : 
                              statusElement.classList.contains('disconnected') ? 'disconnected' : 'connecting';
                statusElement.textContent = this.lang.t(`connectionStatus.${status}`);
            }
        }
    }
    
    updatePlayerDisplay() {
        const playerDisplay = document.getElementById('player-display');
        if (playerDisplay) {
            playerDisplay.textContent = this.playerName || this.lang.t('playerLabel');
        }
    }
    
    bindEvents() {
        // 語言切換按鈕
        document.getElementById('language-btn').addEventListener('click', () => {
            const currentLang = this.lang.getCurrentLanguage();
            const newLang = currentLang === 'zh' ? 'en' : 'zh';
            this.lang.setLanguage(newLang);
        });
        
        // 開始遊戲
        document.getElementById('start-btn').addEventListener('click', () => {
            this.validateAndStartGame();
        });
        
        // 玩家名稱輸入
        document.getElementById('player-name').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.validateAndStartGame();
            }
        });
        
        document.getElementById('player-name').addEventListener('input', () => {
            this.validatePlayerName();
        });
        
        // 檢查密碼
        document.getElementById('check-btn').addEventListener('click', () => {
            this.checkPassword();
        });
        
        // 密碼顯示切換
        document.getElementById('toggle-password').addEventListener('click', () => {
            this.togglePasswordVisibility('password-input');
        });
        
        document.getElementById('quiz-toggle-password').addEventListener('click', () => {
            this.togglePasswordVisibility('quiz-input');
        });
        
        // 輸入即時檢查
        document.getElementById('password-input').addEventListener('input', () => {
            this.realTimeCheck();
        });
        
        // Enter 鍵提交
        document.getElementById('password-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });
        
        document.getElementById('quiz-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitQuiz();
            }
        });
        
        // 抽查相關
        document.getElementById('quiz-submit-btn').addEventListener('click', () => {
            this.submitQuiz();
        });
        
        document.getElementById('quiz-skip-btn').addEventListener('click', () => {
            this.skipQuiz();
        });
        
        // 重新開始
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // 分享成績
        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareScore();
        });
    }
    
    startGame() {
        this.showScreen('game-screen');
        this.loadLevel(1);
        
        // 通知伺服器遊戲開始
        if (this.isOnlineMode && this.websocket) {
            this.websocket.sendGameStart();
        }
    }
    
    loadLevel(level) {
        this.currentLevel = level;
        
        // 獲取動態關卡配置
        const levelRequirements = this.getLevelRequirements();
        const config = levelRequirements[level];
        
        document.getElementById('current-level').textContent = level;
        this.updateChallengeTitle();
        
        // 更新進度條
        const progress = (level / this.maxLevel) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // 渲染要求
        this.updateRequirements();
        
        // 清空輸入
        document.getElementById('password-input').value = '';
        document.getElementById('password-feedback').innerHTML = '';
        
        // 重置處理狀態
        this.isProcessing = false;
        this.setInputsEnabled(true);
    }
    
    renderRequirements(requirements) {
        const container = document.getElementById('requirements');
        const headerText = this.lang.getCurrentLanguage() === 'zh' ? '密碼要求：' : 'Password Requirements:';
        container.innerHTML = `<h4>${headerText}</h4>`;
        
        requirements.forEach((req, index) => {
            const div = document.createElement('div');
            div.className = 'requirement';
            div.innerHTML = `
                <span class="requirement-icon">⭕</span>
                <span>${req.text}</span>
            `;
            container.appendChild(div);
        });
    }
    
    renderQuizRequirements(requirements) {
        const container = document.getElementById('quiz-requirements-list');
        container.innerHTML = '';
        
        requirements.forEach((req, index) => {
            const div = document.createElement('div');
            div.className = 'requirement quiz-requirement';
            div.innerHTML = `
                <span class="requirement-icon">💡</span>
                <span>${req.text}</span>
            `;
            container.appendChild(div);
        });
    }
    
    realTimeCheck() {
        const password = document.getElementById('password-input').value;
        const levelRequirements = this.getLevelRequirements();
        const requirements = levelRequirements[this.currentLevel].requirements;
        const requirementElements = document.querySelectorAll('.requirement');
        
        requirements.forEach((req, index) => {
            const element = requirementElements[index];
            if (req.check(password)) {
                element.className = 'requirement met';
                element.querySelector('.requirement-icon').textContent = '✅';
            } else {
                element.className = 'requirement not-met';
                element.querySelector('.requirement-icon').textContent = '❌';
            }
        });
    }
    
    checkPassword() {
        // 防止重複提交
        if (this.isProcessing) {
            return;
        }
        
        const password = document.getElementById('password-input').value;
        const levelRequirements = this.getLevelRequirements();
        const requirements = levelRequirements[this.currentLevel].requirements;
        const feedback = document.getElementById('password-feedback');
        
        if (!password) {
            this.showFeedback('請輸入密碼！', 'error');
            return;
        }
        
        const failedRequirements = requirements.filter(req => !req.check(password));
        
        if (failedRequirements.length === 0) {
            // 檢查密碼相似度
            const similarityCheck = this.checkPasswordSimilarity(password);
            if (!similarityCheck.isValid) {
                this.showFeedback(`❌ ${similarityCheck.message}`, 'error');
                this.shakeElement('password-input');
                return;
            }
            
            // 設置處理狀態，防止重複提交
            this.isProcessing = true;
            
            // 禁用按鈕和輸入
            this.setInputsEnabled(false);
            
            // 密碼通過
            this.passwords[this.currentLevel] = password;
            this.currentPassword = password;
            this.score += 100; // 每關固定100分
            this.streak++;
            this.updateScore();
            this.updatePasswordHistory();
            
            this.showFeedback('🎉 密碼符合要求！', 'success');
            
            // 添加慶祝效果
            this.celebrateSuccess();
            
            setTimeout(() => {
                if (this.currentLevel >= this.maxLevel) {
                    this.endGame();
                } else {
                    // 檢查是否需要觸發固定抽查
                    const shouldQuiz = this.quizSchedule.includes(this.currentLevel) && 
                                     !this.completedQuizzes.has(this.currentLevel);
                    
                    if (shouldQuiz) {
                        this.completedQuizzes.add(this.currentLevel);
                        this.triggerQuiz();
                    } else {
                        // 通知伺服器關卡完成
                        if (this.isOnlineMode && this.websocket) {
                            this.websocket.sendLevelComplete(this.currentLevel, this.score);
                        }
                        this.loadLevel(this.currentLevel + 1);
                    }
                }
                // 重新啟用輸入
                this.setInputsEnabled(true);
                this.isProcessing = false;
            }, 1500);
            
        } else {
            this.showFeedback(`❌ 密碼不符合要求：${failedRequirements[0].text}`, 'error');
            this.shakeElement('password-input');
            this.streak = 0; // 只重置連擊，不扣分
            this.updateScore();
        }
    }
    
    triggerQuiz() {
        if (Object.keys(this.passwords).length === 0 || this.isProcessing) return;
        
        // 隨機選擇一個已設定的密碼關卡
        const availableLevels = Object.keys(this.passwords);
        this.quizLevel = parseInt(availableLevels[Math.floor(Math.random() * availableLevels.length)]);
        
        // 獲取該關卡的配置
        const levelRequirements = this.getLevelRequirements();
        const levelConfig = levelRequirements[this.quizLevel];
        
        const questionText = this.lang.getCurrentLanguage() === 'zh' 
            ? `請輸入關卡 ${this.quizLevel} (${levelConfig.title}) 時設定的密碼`
            : `Enter the password you set for Level ${this.quizLevel} (${levelConfig.title})`;
        
        document.getElementById('quiz-question').textContent = questionText;
        
        // 顯示該關卡的要求
        this.renderQuizRequirements(levelConfig.requirements);
        
        document.getElementById('quiz-input').value = '';
        document.getElementById('quiz-feedback').innerHTML = '';
        
        // 重置處理狀態並啟用抽查輸入
        this.isProcessing = false;
        this.setQuizInputsEnabled(true);
        
        this.showScreen('quiz-screen');
        this.quizMode = true;
    }
    
    submitQuiz() {
        // 防止重複提交
        if (this.isProcessing) {
            return;
        }
        
        const userInput = document.getElementById('quiz-input').value;
        const correctPassword = this.passwords[this.quizLevel];
        
        if (userInput === correctPassword) {
            this.isProcessing = true;
            this.setQuizInputsEnabled(false);
            
            this.score += 50; // 抽查正確加50分
            this.streak += 1;
            this.showFeedback('🎉 正確！記憶力真好！', 'success', 'quiz-feedback');
            
            setTimeout(() => {
                // 通知伺服器關卡完成
                if (this.isOnlineMode && this.websocket) {
                    this.websocket.sendLevelComplete(this.currentLevel, this.score);
                }
                
                this.showScreen('game-screen');
                this.quizMode = false;
                this.isProcessing = false;
                this.setInputsEnabled(true);
                
                // 進入下一關
                this.loadLevel(this.currentLevel + 1);
            }, 1500);
        } else {
            this.score = Math.max(0, this.score - 20); // 抽查錯誤扣20分
            this.streak = 0;
            this.showFeedback('❌ 密碼不正確，再想想看！', 'error', 'quiz-feedback');
            this.shakeElement('quiz-input');
        }
        
        this.updateScore();
    }
    
    skipQuiz() {
        // 防止重複提交
        if (this.isProcessing) {
            return;
        }
        
        this.isProcessing = true;
        this.setQuizInputsEnabled(false);
        
        this.score = Math.max(0, this.score - 10); // 跳過抽查扣10分
        this.streak = 0;
        this.updateScore();
        
        this.showFeedback('⏭️ 跳過了抽查 (-10分)', 'info', 'quiz-feedback');
        
        setTimeout(() => {
            // 通知伺服器關卡完成
            if (this.isOnlineMode && this.websocket) {
                this.websocket.sendLevelComplete(this.currentLevel, this.score);
            }
            
            this.showScreen('game-screen');
            this.quizMode = false;
            this.isProcessing = false;
            this.setInputsEnabled(true);
            
            // 進入下一關
            this.loadLevel(this.currentLevel + 1);
        }, 1000);
    }
    
    updateScore() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
    }
    
    checkPasswordSimilarity(newPassword) {
        const previousPasswords = Object.values(this.passwords);
        
        for (let i = 0; i < previousPasswords.length; i++) {
            const oldPassword = previousPasswords[i];
            const similarity = this.calculatePasswordSimilarity(newPassword, oldPassword);
            
            if (similarity > 0.6) { // 如果相似度超過60%
                const levelNum = Object.keys(this.passwords)[i];
                return {
                    isValid: false,
                    message: `密碼與關卡 ${levelNum} 的密碼過於相似 (${Math.round(similarity * 100)}%)`
                };
            }
        }
        
        return { isValid: true };
    }
    
    calculatePasswordSimilarity(password1, password2) {
        if (!password1 || !password2) return 0;
        
        // 使用編輯距離 (Levenshtein Distance) 計算相似度
        const len1 = password1.length;
        const len2 = password2.length;
        const matrix = Array(len2 + 1).fill().map(() => Array(len1 + 1).fill(0));
        
        // 初始化矩陣
        for (let i = 0; i <= len1; i++) matrix[0][i] = i;
        for (let j = 0; j <= len2; j++) matrix[j][0] = j;
        
        // 計算編輯距離
        for (let j = 1; j <= len2; j++) {
            for (let i = 1; i <= len1; i++) {
                if (password1[i-1] === password2[j-1]) {
                    matrix[j][i] = matrix[j-1][i-1];
                } else {
                    matrix[j][i] = Math.min(
                        matrix[j-1][i] + 1,    // 刪除
                        matrix[j][i-1] + 1,    // 插入
                        matrix[j-1][i-1] + 1   // 替換
                    );
                }
            }
        }
        
        const editDistance = matrix[len2][len1];
        const maxLength = Math.max(len1, len2);
        
        // 轉換為相似度 (0-1)
        const similarity = 1 - (editDistance / maxLength);
        
        // 額外檢查：子字串重疊
        const commonSubstrings = this.findCommonSubstrings(password1, password2);
        if (commonSubstrings.length > 0) {
            const maxCommonLength = Math.max(...commonSubstrings.map(s => s.length));
            if (maxCommonLength >= 6) { // 如果有長度6以上的共同子字串
                return Math.max(similarity, 0.7); // 提高相似度
            }
        }
        
        return similarity;
    }
    
    findCommonSubstrings(str1, str2, minLength = 3) {
        const commonSubstrings = [];
        
        for (let i = 0; i <= str1.length - minLength; i++) {
            for (let j = minLength; j <= str1.length - i; j++) {
                const substring = str1.substr(i, j);
                if (str2.includes(substring)) {
                    commonSubstrings.push(substring);
                }
            }
        }
        
        // 移除重複的子字串
        return [...new Set(commonSubstrings)];
    }
    
    updatePasswordHistory() {
        this.updatePasswordList();
    }
    
    updatePasswordList() {
        const container = document.getElementById('password-list');
        container.innerHTML = '';
        
        const levelRequirements = this.getLevelRequirements();
        
        Object.entries(this.passwords).forEach(([level, password]) => {
            const div = document.createElement('div');
            div.className = 'password-item';
            const levelText = this.lang.t('levelText');
            div.innerHTML = `
                <span class="password-level">${levelText} ${level}</span>
                <span class="password-hint">${levelRequirements[level].title}</span>
            `;
            container.appendChild(div);
        });
    }
    
    endGame() {
        document.getElementById('final-title').textContent = '🎉 恭喜完成所有關卡！';
        document.getElementById('final-score').textContent = `最終分數: ${this.score} / 1000 分`;
        
        const completedLevels = Object.keys(this.passwords).length;
        const baseScore = completedLevels * 100;
        const bonusScore = this.score - baseScore;
        
        const stats = `
            <div class="stat-item">
                <span>完成關卡</span>
                <span>${completedLevels} / ${this.maxLevel}</span>
            </div>
            <div class="stat-item">
                <span>基礎分數</span>
                <span>${baseScore} 分 (${completedLevels} × 100)</span>
            </div>
            <div class="stat-item">
                <span>抽查獎勵/懲罰</span>
                <span>${bonusScore >= 0 ? '+' : ''}${bonusScore} 分</span>
            </div>
            <div class="stat-item">
                <span>最高連續成功</span>
                <span>${this.streak}</span>
            </div>
        `;
        
        document.getElementById('final-stats').innerHTML = stats;
        this.showScreen('end-screen');
        
        // 通知伺服器遊戲完成
        if (this.isOnlineMode && this.websocket) {
            this.websocket.sendGameComplete(this.score);
        }
        
        // 更新排行榜
        this.updateLeaderboard();
    }
    
    updateLeaderboard() {
        // 添加當前玩家到排行榜
        this.addToLeaderboard(this.playerName, this.score);
        
        // 顯示排行榜
        this.displayLeaderboard();
    }
    
    addToLeaderboard(name, score) {
        // 從本地存儲載入排行榜
        this.loadLeaderboardFromStorage();
        
        // 添加新記錄
        this.leaderboard.push({
            name: name,
            score: score,
            date: new Date().toLocaleDateString()
        });
        
        // 排序並保留前 10 名
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10);
        
        // 保存到本地存儲
        this.saveLeaderboardToStorage();
    }
    
    loadLeaderboardFromStorage() {
        try {
            const stored = localStorage.getItem('passwordGameLeaderboard');
            this.leaderboard = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('載入排行榜失敗:', error);
            this.leaderboard = [];
        }
    }
    
    saveLeaderboardToStorage() {
        try {
            localStorage.setItem('passwordGameLeaderboard', JSON.stringify(this.leaderboard));
        } catch (error) {
            console.error('保存排行榜失敗:', error);
        }
    }
    
    displayLeaderboard() {
        const leaderboardList = document.getElementById('leaderboard-list');
        if (!leaderboardList) return;
        
        leaderboardList.innerHTML = '';
        
        if (this.leaderboard.length === 0) {
            leaderboardList.innerHTML = '<div class="no-records">尚無記錄</div>';
            return;
        }
        
        this.leaderboard.forEach((record, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            
            // 標記當前玩家的記錄
            if (record.name === this.playerName && record.score === this.score) {
                item.classList.add('leaderboard-current');
            }
            
            // 設置排名樣式
            let rankClass = '';
            if (index === 0) rankClass = 'first';
            else if (index === 1) rankClass = 'second';
            else if (index === 2) rankClass = 'third';
            
            item.innerHTML = `
                <div class="leaderboard-rank ${rankClass}">${index + 1}</div>
                <div class="leaderboard-name">${record.name}</div>
                <div class="leaderboard-score">${record.score}</div>
            `;
            
            leaderboardList.appendChild(item);
        });
    }
    
    resetGame() {
        this.currentLevel = 1;
        this.score = 0;
        this.streak = 0;
        this.passwords = {};
        this.currentPassword = '';
        this.quizMode = false;
        this.quizLevel = 1;
        this.isProcessing = false;
        this.completedQuizzes = new Set(); // 重置抽查記錄
        
        // 保留玩家名稱，只重置名稱輸入框的值
        const nameInput = document.getElementById('player-name');
        if (nameInput && this.playerName) {
            nameInput.value = this.playerName;
        }
        
        this.updateScore();
        this.updatePlayerDisplay();
        this.setInputsEnabled(true);
        this.showScreen('start-screen');
    }
    
    shareScore() {
        const playerInfo = this.playerName ? `${this.playerName} ` : '';
        const text = `${playerInfo}在密碼產生器遊戲中獲得了 ${this.score} 分！完成了 ${Object.keys(this.passwords).length} 個關卡的密碼挑戰！🔐`;
        
        if (navigator.share) {
            navigator.share({
                title: '密碼產生器 - 我的成績',
                text: text,
                url: window.location.href
            });
        } else {
            // 複製到剪貼板
            navigator.clipboard.writeText(text).then(() => {
                alert('成績已複製到剪貼板！');
            });
        }
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    showFeedback(message, type, targetId = 'password-feedback') {
        const feedback = document.getElementById(targetId);
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        if (type === 'success') {
            this.pulseElement(feedback);
        }
    }
    
    togglePasswordVisibility(inputId) {
        const input = document.getElementById(inputId);
        const toggleBtn = input.nextElementSibling;
        
        if (input.type === 'password') {
            input.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            input.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }
    
    shakeElement(elementId) {
        const element = document.getElementById(elementId);
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }
    
    pulseElement(element) {
        element.classList.add('pulse');
        setTimeout(() => {
            element.classList.remove('pulse');
        }, 600);
    }
    
    celebrateSuccess() {
        // 使用 confetti 效果 (如果可用)
        if (confetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            // 備用慶祝效果
            this.createFireworks();
        }
    }
    
    createFireworks() {
        // 簡單的 CSS 動畫慶祝效果
        const firework = document.createElement('div');
        firework.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: firework 1s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        // 添加 CSS 動畫
        if (!document.getElementById('firework-style')) {
            const style = document.createElement('style');
            style.id = 'firework-style';
            style.textContent = `
                @keyframes firework {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(20); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }
    
    setInputsEnabled(enabled) {
        const passwordInput = document.getElementById('password-input');
        const checkBtn = document.getElementById('check-btn');
        
        if (passwordInput) passwordInput.disabled = !enabled;
        if (checkBtn) checkBtn.disabled = !enabled;
        
        // 更新按鈕樣式
        if (checkBtn) {
            if (enabled) {
                checkBtn.classList.remove('btn-disabled');
            } else {
                checkBtn.classList.add('btn-disabled');
            }
        }
    }
    
    setQuizInputsEnabled(enabled) {
        const quizInput = document.getElementById('quiz-input');
        const quizSubmitBtn = document.getElementById('quiz-submit-btn');
        const quizSkipBtn = document.getElementById('quiz-skip-btn');
        
        if (quizInput) quizInput.disabled = !enabled;
        if (quizSubmitBtn) quizSubmitBtn.disabled = !enabled;
        if (quizSkipBtn) quizSkipBtn.disabled = !enabled;
        
        // 更新按鈕樣式
        [quizSubmitBtn, quizSkipBtn].forEach(btn => {
            if (btn) {
                if (enabled) {
                    btn.classList.remove('btn-disabled');
                } else {
                    btn.classList.add('btn-disabled');
                }
            }
        });
    }
}

// 初始化遊戲
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGame();
});
