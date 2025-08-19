# 🔐 Password Creator Game

A challenging password creation and memory game with multiplayer online competition and real-time leaderboards.

## 🎮 Game Features

### Core Gameplay
- **10 Progressive Levels**: From simple length requirements to complex special character combinations
- **Fixed Quiz System**: Password memory tests after levels 3, 5, 7, and 9
- **Unified Scoring System**: All players compete under the same standards, max score 1200
- **Password Similarity Check**: Prevents players from using overly similar passwords
- **Multilingual Support**: Chinese and English interface

### Multiplayer Features
- **Real-time Online Leaderboard**: Shows all players' real-time scores and rankings
- **WebSocket Real-time Communication**: Player progress synchronized in real-time
- **Fair Competition Environment**: Fixed quiz schedule ensures fair competition

### Technical Features
- **Modern Frontend**: Built with Vite, supports hot reload
- **Responsive Design**: Adapted for various devices and screen sizes
- **ES6 Modular**: Clean code structure
- **WebSocket Communication**: Stable real-time multiplayer functionality

## 🏆 Scoring System

| Action | Score Change |
|--------|--------------|
| Complete Level | +100 points |
| Quiz Correct | +50 points |
| Quiz Wrong | -20 points |
| Skip Quiz | -10 points |
| **Total Max** | **1200 points** |

**Quiz Schedule**: All players will have password memory quizzes after completing levels 3, 5, 7, and 9

**Score Breakdown**: 10 levels (1000 pts) + 4 quizzes (200 pts) = 1200 points maximum

## 🚀 Quick Start

### Requirements
- Node.js 16+ 
- npm or yarn

### Installation

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

## 🌐 Live Demo

- **Azure (Recommended)**: https://password-creater-game-dhefa2f2ecfmbaah.eastasia-01.azurewebsites.net/
- **GitHub Pages**: https://lin3598197.github.io/Password-creater/

## 📁 Project Structure

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

## 🎯 Level Design

### Level Progression
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

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start frontend development server
npm run server     # Start WebSocket server
npm run dev-full   # Start both frontend and backend
npm run build      # Build production version
npm run preview    # Preview production version
```

### Development Environment
- **Frontend**: Vite + ES6 modules
- **Backend**: Node.js + WebSocket (ws)
- **Styling**: Native CSS + responsive design
- **State Management**: Native JavaScript classes

## 🎨 Customization

### Modify Level Requirements
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

### Modify Quiz Schedule
Edit the `quizSchedule` array in `script.js`:

```javascript
this.quizSchedule = [3, 5, 7, 9]; // Quiz levels
```

## 📱 Responsive Support

- **Desktop**: Full feature experience
- **Tablet**: Optimized touch interface
- **Mobile**: Adapted for small screen display

## 🤝 Contributing

1. Fork this project
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Thanks to all contributors and test players
- Built with [Vite](https://vitejs.dev/)
- WebSocket powered by [ws](https://github.com/websockets/ws)

## 📞 Contact

If you have any questions or suggestions:
- Open an Issue
- Submit a Pull Request
- Contact maintainer

---

🎮 **Start your password challenge journey!** 🎮
