// 多語言翻譯對象
const translations = {
    zh: {
        // 頁面標題和標題
        pageTitle: '密碼產生器 - Password Creator',
        gameTitle: '🔐 密碼產生器',
        gameSubtitle: '挑戰你的密碼創造技能！',
        
        // 語言切換
        languageSwitch: '語言 / Language',
        
        // 歡迎頁面
        welcomeTitle: '歡迎來到密碼挑戰！',
        welcomeDescription: [
            '這個遊戲將測試你創建和記住複雜密碼的能力。',
            '隨著關卡進行，密碼要求會越來越複雜，',
            '並且會隨機要求你重新輸入之前設定的密碼！'
        ],
        
        // 分數制度
        scoringTitle: '🏆 分數制度',
        scoringRules: [
            '每關完成：<strong>+100分</strong>',
            '抽查正確：<strong>+50分</strong>',
            '抽查錯誤：<strong>-20分</strong>',
            '跳過抽查：<strong>-10分</strong>',
            '滿分：<strong>1000分</strong> (10關)'
        ],
        quizNote: '📝 注意：所有玩家都會在第3、5、7、9關後進行密碼抽查',
        
        // 玩家輸入
        playerNameLabel: '請輸入你的名稱：',
        playerNamePlaceholder: '輸入你的遊戲名稱...',
        startButton: '開始遊戲',
        
        // 遊戲介面
        levelText: '關卡',
        passwordInputLabel: '請輸入符合要求的密碼：',
        passwordInputPlaceholder: '輸入你的密碼...',
        checkPasswordButton: '檢查密碼',
        passwordHistoryTitle: '已設定的密碼：',
        
        // 抽查介面
        quizTitle: '🎯 密碼抽查！',
        quizRequirementsTitle: '該關卡的密碼要求：',
        quizInputLabel: '請輸入該關卡的密碼：',
        quizInputPlaceholder: '回憶一下...',
        quizSubmitButton: '確認',
        quizSkipButton: '跳過 (-10分)',
        
        // 結束畫面
        congratulationsTitle: '🎉 恭喜完成！',
        leaderboardTitle: '🏆 排行榜',
        restartButton: '再玩一次',
        shareButton: '分享成績',
        
        // 側邊欄
        playerLabel: '玩家',
        scoreLabel: '分數',
        streakLabel: '連續成功',
        connectionStatus: {
            connecting: '連接中...',
            connected: '已連線',
            disconnected: '離線'
        },
        
        // 關卡標題
        levels: {
            1: { title: '基礎入門' },
            2: { title: '添加數字' },
            3: { title: '大小寫混合' },
            4: { title: '特殊符號登場' },
            5: { title: '避免重複字符' },
            6: { title: '避免常見模式' },
            7: { title: '避免鍵盤順序' },
            8: { title: '高級安全要求' },
            9: { title: '專家級挑戰' },
            10: { title: '終極密碼大師' }
        },
        
        // 密碼要求
        requirements: {
            minLength: (n) => `至少 ${n} 個字符`,
            minDigits: (n) => n === 1 ? '包含至少 1 個數字' : `包含至少 ${n} 個數字`,
            uppercase: '包含大寫字母',
            lowercase: '包含小寫字母',
            minUppercase: (n) => `包含至少 ${n} 個大寫字母`,
            minLowercase: (n) => `包含至少 ${n} 個小寫字母`,
            specialChars: '包含特殊符號 (!@#$%^&*)',
            specialCharsGeneral: '包含特殊符號',
            minSpecialChars: (n) => `包含至少 ${n} 個特殊符號`,
            minDifferentSpecialChars: (n) => `包含至少 ${n} 個不同的特殊符號`,
            noRepeatingChars: (n) => `不能有連續 ${n} 個相同字符`,
            noCommonWords: '不能包含常見單詞 (password, 123456)',
            noCommonWordsExtended: '不能包含常見單詞',
            noCommonWordsAdvanced: '不能包含任何常見單詞或模式',
            noKeyboardSequence: '不能包含鍵盤順序 (qwer, 1234)',
            noKeyboardSequenceAdvanced: '不能包含任何鍵盤順序',
            noRepeatingSubstrings: '不能包含重複子字串 (abab)',
            noRepeatingSubstringsAdvanced: '不能包含重複子字串',
            evenDistribution: '字符分佈要均勻',
            randomDistribution: '字符完全隨機分佈',
            entropyCheck: '通過高級熵值檢查'
        },
        
        // 驗證訊息
        validation: {
            nameRequired: '請輸入你的名稱！',
            nameMinLength: '名稱至少需要 2 個字符',
            nameMaxLength: '名稱不能超過 20 個字符',
            nameInvalidChars: '名稱只能包含字母、數字、中文、空格、底線和連字符',
            nameValid: '✓ 名稱有效'
        },
        
        // 遊戲訊息
        messages: {
            passwordCorrect: '密碼正確！',
            passwordIncorrect: '密碼錯誤，請重試',
            levelComplete: '關卡完成！',
            gameComplete: '遊戲完成！',
            quizCorrect: '抽查正確！',
            quizIncorrect: '抽查錯誤',
            quizSkipped: '跳過抽查'
        },
        
        // 通知訊息
        notifications: {
            playerStarted: (name) => `${name} 開始了遊戲`,
            playerProgress: (name, level, score) => `${name} 完成關卡 ${level}，分數：${score}`,
            playerCompleted: (name, score) => `${name} 完成遊戲！最終分數：${score}`,
            playerDisconnected: (name) => `${name} 離線了`,
            nameUpdated: (name) => `玩家名稱已更新為：${name}`,
            reconnecting: (attempt) => `嘗試重新連線... (第 ${attempt} 次)`
        },
        
        // 全球統計
        globalStats: {
            title: '🌍 全球排行榜',
            onlinePlayers: '線上玩家',
            gamesCompleted: '完成遊戲數',
            averageScore: '平均分數',
            scoreUnit: '分',
            noPlayersData: '暫無玩家數據'
        },
        
        // 通知訊息
        notifications: {
            playerStarted: (playerName) => `${playerName} 開始了遊戲！`,
            playerProgress: (playerName, level, score) => `${playerName} 完成了關卡 ${level}！分數：${score}`,
            playerCompleted: (playerName, finalScore) => `🎉 ${playerName} 完成了整個遊戲！最終分數：${finalScore}`,
            playerDisconnected: (playerName) => `${playerName} 離開了遊戲`,
            nameUpdated: (name) => `名稱已更新為：${name}`,
            reconnecting: (attempt, max) => `重新連線中... (${attempt}/${max})`,
            offlineMode: '離線模式'
        },
        
        // 全球統計
        globalStats: {
            title: '🏆 全球排行榜',
            onlinePlayers: '線上玩家',
            gamesCompleted: '完成遊戲',
            noPlayersData: '暫無排行榜資料',
            scoreUnit: '分'
        }
    },
    
    en: {
        // 頁面標題和標題
        pageTitle: 'Password Creator - 密碼產生器',
        gameTitle: '🔐 Password Creator',
        gameSubtitle: 'Challenge Your Password Creation Skills!',
        
        // 語言切換
        languageSwitch: 'Language / 語言',
        
        // 歡迎頁面
        welcomeTitle: 'Welcome to Password Challenge!',
        welcomeDescription: [
            'This game will test your ability to create and remember complex passwords.',
            'As you progress through levels, password requirements become increasingly complex,',
            'and you\'ll be randomly asked to re-enter previously set passwords!'
        ],
        
        // 分數制度
        scoringTitle: '🏆 Scoring System',
        scoringRules: [
            'Level Complete: <strong>+100 points</strong>',
            'Quiz Correct: <strong>+50 points</strong>',
            'Quiz Wrong: <strong>-20 points</strong>',
            'Quiz Skipped: <strong>-10 points</strong>',
            'Perfect Score: <strong>1000 points</strong> (10 levels)'
        ],
        quizNote: '📝 Note: All players will have password quizzes after levels 3, 5, 7, 9',
        
        // 玩家輸入
        playerNameLabel: 'Enter your name:',
        playerNamePlaceholder: 'Enter your game name...',
        startButton: 'Start Game',
        
        // 遊戲介面
        levelText: 'Level',
        passwordInputLabel: 'Enter a password that meets the requirements:',
        passwordInputPlaceholder: 'Enter your password...',
        checkPasswordButton: 'Check Password',
        passwordHistoryTitle: 'Set Passwords:',
        
        // 抽查介面
        quizTitle: '🎯 Password Quiz!',
        quizRequirementsTitle: 'Requirements for this level:',
        quizInputLabel: 'Enter the password for this level:',
        quizInputPlaceholder: 'Try to remember...',
        quizSubmitButton: 'Submit',
        quizSkipButton: 'Skip (-10 points)',
        
        // 結束畫面
        congratulationsTitle: '🎉 Congratulations!',
        leaderboardTitle: '🏆 Leaderboard',
        restartButton: 'Play Again',
        shareButton: 'Share Score',
        
        // 側邊欄
        playerLabel: 'Player',
        scoreLabel: 'Score',
        streakLabel: 'Streak',
        connectionStatus: {
            connecting: 'Connecting...',
            connected: 'Connected',
            disconnected: 'Offline'
        },
        
        // 關卡標題
        levels: {
            1: { title: 'Basic Start' },
            2: { title: 'Add Numbers' },
            3: { title: 'Mixed Case' },
            4: { title: 'Special Characters' },
            5: { title: 'Avoid Repeating' },
            6: { title: 'Avoid Common Patterns' },
            7: { title: 'Avoid Keyboard Sequences' },
            8: { title: 'Advanced Security' },
            9: { title: 'Expert Challenge' },
            10: { title: 'Ultimate Password Master' }
        },
        
        // 密碼要求
        requirements: {
            minLength: (n) => `At least ${n} characters`,
            minDigits: (n) => n === 1 ? 'Contains at least 1 digit' : `Contains at least ${n} digits`,
            uppercase: 'Contains uppercase letters',
            lowercase: 'Contains lowercase letters',
            minUppercase: (n) => `Contains at least ${n} uppercase letters`,
            minLowercase: (n) => `Contains at least ${n} lowercase letters`,
            specialChars: 'Contains special characters (!@#$%^&*)',
            specialCharsGeneral: 'Contains special characters',
            minSpecialChars: (n) => `Contains at least ${n} special characters`,
            minDifferentSpecialChars: (n) => `Contains at least ${n} different special characters`,
            noRepeatingChars: (n) => `No more than ${n-1} consecutive identical characters`,
            noCommonWords: 'No common words (password, 123456)',
            noCommonWordsExtended: 'No common words',
            noCommonWordsAdvanced: 'No common words or patterns',
            noKeyboardSequence: 'No keyboard sequences (qwer, 1234)',
            noKeyboardSequenceAdvanced: 'No keyboard sequences',
            noRepeatingSubstrings: 'No repeating substrings (abab)',
            noRepeatingSubstringsAdvanced: 'No repeating substrings',
            evenDistribution: 'Even character distribution',
            randomDistribution: 'Completely random character distribution',
            entropyCheck: 'Passes advanced entropy check'
        },
        
        // 驗證訊息
        validation: {
            nameRequired: 'Please enter your name!',
            nameMinLength: 'Name must be at least 2 characters',
            nameMaxLength: 'Name cannot exceed 20 characters',
            nameInvalidChars: 'Name can only contain letters, numbers, Chinese characters, spaces, underscores and hyphens',
            nameValid: '✓ Valid name'
        },
        
        // 遊戲訊息
        messages: {
            passwordCorrect: 'Password correct!',
            passwordIncorrect: 'Password incorrect, please try again',
            levelComplete: 'Level complete!',
            gameComplete: 'Game complete!',
            quizCorrect: 'Quiz correct!',
            quizIncorrect: 'Quiz incorrect',
            quizSkipped: 'Quiz skipped'
        },
        
        // 通知訊息
        notifications: {
            playerStarted: (name) => `${name} started the game`,
            playerProgress: (name, level, score) => `${name} completed level ${level}, score: ${score}`,
            playerCompleted: (name, score) => `${name} completed the game! Final score: ${score}`,
            playerDisconnected: (name) => `${name} went offline`,
            nameUpdated: (name) => `Player name updated to: ${name}`,
            reconnecting: (attempt) => `Attempting to reconnect... (attempt ${attempt})`
        },
        
        // 全球統計
        globalStats: {
            title: '🌍 Global Leaderboard',
            onlinePlayers: 'Online Players',
            gamesCompleted: 'Games Completed',
            averageScore: 'Average Score',
            scoreUnit: ' pts',
            noPlayersData: 'No player data available'
        },
        
        // 通知訊息
        notifications: {
            playerStarted: (playerName) => `${playerName} started the game!`,
            playerProgress: (playerName, level, score) => `${playerName} completed level ${level}! Score: ${score}`,
            playerCompleted: (playerName, finalScore) => `🎉 ${playerName} completed the entire game! Final score: ${finalScore}`,
            playerDisconnected: (playerName) => `${playerName} left the game`,
            nameUpdated: (name) => `Name updated to: ${name}`,
            reconnecting: (attempt, max) => `Reconnecting... (${attempt}/${max})`,
            offlineMode: 'Offline mode'
        },
        
        // 全球統計
        globalStats: {
            title: '🏆 Global Leaderboard',
            onlinePlayers: 'Online Players',
            gamesCompleted: 'Games Completed',
            noPlayersData: 'No leaderboard data',
            scoreUnit: 'pts'
        }
    }
};

// 語言管理器
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('game-language') || 'zh';
        this.translations = translations;
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('game-language', lang);
        this.updatePageLanguage();
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    t(key, params = null) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                value = undefined;
                break;
            }
        }
        
        // 如果找不到翻譯，嘗試使用中文版本
        if (value === undefined) {
            value = this.translations['zh'];
            for (const k of keys) {
                if (value && typeof value === 'object') {
                    value = value[k];
                } else {
                    value = key; // 如果都找不到，返回 key
                    break;
                }
            }
        }
        
        // 如果是函數，調用它
        if (typeof value === 'function') {
            if (Array.isArray(params)) {
                // 如果參數是數組，展開傳遞
                return value(...params);
            } else if (params !== null) {
                // 如果是單個參數
                return value(params);
            } else {
                // 沒有參數
                return value();
            }
        }
        
        return value || key;
    }
    
    updatePageLanguage() {
        // 更新 HTML lang 屬性
        document.documentElement.lang = this.currentLanguage === 'zh' ? 'zh-TW' : 'en';
        
        // 更新頁面標題
        document.title = this.t('pageTitle');
        
        // 更新所有帶有 data-translate 屬性的元素
        this.updateTranslatableElements();
        
        // 更新語言切換按鈕文本
        this.updateLanguageButton();
        
        // 觸發自定義事件通知其他組件語言已變更
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: this.currentLanguage } 
        }));
    }
    
    updateTranslatableElements() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.t(key);
            
            if (Array.isArray(translation)) {
                // 如果是數組，用 <br> 連接
                element.innerHTML = translation.join('<br>');
            } else {
                element.textContent = translation;
            }
        });
        
        // 更新帶有 data-translate-html 屬性的元素（允許 HTML）
        const htmlElements = document.querySelectorAll('[data-translate-html]');
        htmlElements.forEach(element => {
            const key = element.getAttribute('data-translate-html');
            const translation = this.t(key);
            
            if (Array.isArray(translation)) {
                // 如果是數組，創建 <li> 列表
                if (key === 'scoringRules') {
                    element.innerHTML = translation.map(rule => `<li>${rule}</li>`).join('');
                } else {
                    element.innerHTML = translation.map(item => `<p>${item}</p>`).join('');
                }
            } else {
                element.innerHTML = translation;
            }
        });
        
        // 更新 placeholder 屬性
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            element.placeholder = this.t(key);
        });
    }
    
    updateLanguageButton() {
        const languageBtn = document.getElementById('language-btn');
        if (languageBtn) {
            languageBtn.textContent = this.currentLanguage === 'zh' ? 'English' : '中文';
        }
    }
    
    // 獲取當前語言的關卡要求文本
    getLevelRequirements(level) {
        const levelData = this.translations[this.currentLanguage].levels[level];
        return levelData ? levelData.title : `Level ${level}`;
    }
    
    // 獲取要求文本的翻譯
    getRequirementText(type, param = null) {
        const req = this.translations[this.currentLanguage].requirements[type];
        if (typeof req === 'function' && param !== null) {
            return req(param);
        }
        return req || type;
    }
}

// 導出語言管理器實例
export default new LanguageManager();
