#!/usr/bin/env node

// 開發伺服器啟動腳本
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 啟動密碼產生器遊戲開發伺服器...\n');

// 啟動 Vite 開發伺服器
const vite = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
});

vite.on('close', (code) => {
    console.log(`\n開發伺服器已停止 (退出代碼: ${code})`);
});

vite.on('error', (err) => {
    console.error('啟動開發伺服器時發生錯誤:', err);
});

// 優雅地處理程式中斷
process.on('SIGINT', () => {
    console.log('\n正在關閉開發伺服器...');
    vite.kill('SIGINT');
});

process.on('SIGTERM', () => {
    console.log('\n正在關閉開發伺服器...');
    vite.kill('SIGTERM');
});
