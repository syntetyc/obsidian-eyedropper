# Obsidian Eyedropper

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Obsidian](https://img.shields.io/badge/obsidian-1.5.0+-purple.svg)

A powerful color picker plugin for Obsidian that uses the native EyeDropper API to select colors from anywhere on your screen and insert them directly into your notes.

## ✨ Features

### 🎨 **Advanced Color Picking**
- **Native EyeDropper API**: Pick colors from anywhere on your screen using the browser's built-in eyedropper tool
- **Fallback Support**: Automatic fallback to manual color input when EyeDropper API is not available
- **Real-time Selection**: Instant color preview while picking

### 🎯 **Flexible Output Formats**
- **HEX Format**: `#FF5733` (wrapped in inline code to prevent Obsidian tags)
- **RGBA Format**: `rgba(255, 87, 51, 1)`
- **Both Formats**: `#FF5733 (rgba(255, 87, 51, 1))`

### 🔧 **Comprehensive Settings**
- **Output Format**: Choose between HEX, RGBA, or both formats
- **Uppercase HEX**: Toggle between uppercase and lowercase HEX values
- **Alpha Channel**: Include transparency support in RGBA format
- **Default Alpha**: Set default transparency value (0.0 to 1.0) with slider control
- **Auto Copy**: Automatically copy selected colors to clipboard
- **Space After**: Add space after inserted color for better formatting
- **Color Preview**: Show/hide visual color preview circle next to color codes

### 🎨 **Visual Color Preview**
- **Color Circle**: Small colored circle displayed next to color codes for instant visual reference
- **Toggle Option**: Enable or disable color preview through settings
- **CSS Styling**: Beautifully styled circular preview with border

### ⚡ **Smart Integration**
- **Tag Prevention**: HEX colors are wrapped in inline code to prevent Obsidian from interpreting them as tags
- **Clipboard Integration**: Seamless copy-to-clipboard functionality
- **Editor Integration**: Direct insertion at cursor position

## 🚀 Installation

### Method 1: Manual Installation
1. Download the latest release from GitHub
2. Extract the files to your Obsidian plugins folder:
   ```
   .obsidian/plugins/obsidian-eyedropper/
   ```
3. Copy these files to the plugin folder:
   - `main.js`
   - `manifest.json`
   - `styles.css`
4. Restart Obsidian
5. Enable the plugin in Settings → Community Plugins

### Method 2: BRAT (Beta Reviewer's Auto-update Tool)
1. Install the BRAT plugin
2. Add this repository URL
3. Enable the plugin

## 📖 Usage

### Basic Usage
1. **Open Command Palette**: Press `Ctrl/Cmd + P`
2. **Search for Color Picker**: Type "Pick color" or "Eyedropper"
3. **Select Command**: Choose "Pick color with eyedropper"
4. **Pick Color**: Use the eyedropper tool to select any color from your screen
5. **Insert**: The color will be automatically inserted at your cursor position

### Keyboard Shortcut
- Default: No shortcut assigned
- You can assign a custom shortcut in Settings → Hotkeys → "Pick color with eyedropper"

### Output Examples

**With Color Preview (Default):**
```
🟢 `#FF5733`
🔵 rgba(52, 152, 219, 0.8)
🟡 `#F1C40F` (rgba(241, 196, 15, 1))
```

**Without Color Preview:**
```
`#FF5733`
rgba(52, 152, 219, 0.8)
`#F1C40F` (rgba(241, 196, 15, 1))
```

## 🔧 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/syntetyc/obsidian-eyedropper.git

# Navigate to project directory
cd obsidian-eyedropper

# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode (watch for changes)
npm run dev
```

### Project Structure
```
obsidian-eyedropper/
├── main.ts          # Main plugin code
├── manifest.json    # Plugin manifest
├── styles.css       # Plugin styles
├── package.json     # Dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── esbuild.config.mjs # Build configuration
└── doc/
    └── readme.md    # This file
```

## 🌟 Browser Compatibility

The EyeDropper API is supported in:
- ✅ Chrome 95+
- ✅ Edge 95+
- ✅ Opera 81+
- ❌ Firefox (fallback to manual input)
- ❌ Safari (fallback to manual input)

*Note: When EyeDropper API is not available, the plugin automatically falls back to a manual color input dialog.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Follow TypeScript best practices
2. Maintain compatibility with Obsidian API
3. Test thoroughly before submitting
4. Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the amazing [Obsidian](https://obsidian.md) community
- Uses the native [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper)
- Inspired by the need for better color management in note-taking

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/syntetyc/obsidian-eyedropper/issues)
- **Discussions**: [GitHub Discussions](https://github.com/syntetyc/obsidian-eyedropper/discussions)
- **Author**: [@syntetyc](https://www.syntetyc.com)

---

**Made with ❤️ for the Obsidian community**
