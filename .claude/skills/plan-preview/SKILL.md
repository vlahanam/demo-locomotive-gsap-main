---
name: plan-preview
description: Preview markdown files in a directory with a beautiful web interface. Features professional dark sidebar with search, syntax highlighting with Highlight.js, GitHub-flavored markdown support, and responsive design. Use when you need to preview plans, documentation, or any markdown files in a clean, readable format.
license: MIT
allowed-tools:
  - Bash
  - Read
  - Write
---

# Plan Preview Skill

Beautiful markdown preview server with professional UI and syntax highlighting.

## Capabilities

- **Recursive Markdown Scanning**: Automatically finds all `.md` files in directory and subdirectories
- **Professional UI**: Dark sidebar with organized file navigation
- **Search Functionality**: Quick file search in sidebar
- **Syntax Highlighting**: Code blocks with Highlight.js (GitHub Dark theme)
- **GitHub-Flavored Markdown**: Full GFM support including tables, task lists, strikethrough
- **Responsive Design**: Works on desktop and mobile
- **Real-time Navigation**: Click files to instantly preview

## Usage

### Basic Usage

Preview markdown files in a directory:

```bash
python3 .claude/skills/plan-preview/scripts/preview_server.py [directory]
```

### Examples

```bash
# Preview current directory
python3 .claude/skills/plan-preview/scripts/preview_server.py .

# Preview docs folder
python3 .claude/skills/plan-preview/scripts/preview_server.py ./docs

# Preview plans folder
python3 .claude/skills/plan-preview/scripts/preview_server.py ./plans
```

Server will start at: **http://localhost:5555**

## Features

### Sidebar Navigation
- Organized by directory structure
- Search functionality
- Active file highlighting
- Smooth hover effects

### Markdown Rendering
- Headers with proper hierarchy
- Code blocks with syntax highlighting
- Tables with clean styling
- Blockquotes with accent border
- Links with hover effects
- Images with responsive sizing
- Lists (ordered and unordered)
- Horizontal rules

### Code Highlighting
- **Prism.js** - Industry-standard syntax highlighter
- Supports 100+ languages (JS, TS, Python, Bash, JSON, YAML, etc.)
- **Tomorrow Night** theme (professional dark theme)
- **Line numbers** included automatically
- Syntax-aware coloring with proper token detection
- No highlighting artifacts or selection issues

## Dependencies

```
Flask>=2.3.0
markdown>=3.5.0
```

Install with:
```bash
pip3 install Flask markdown
```

## Technical Details

- **Port**: 5555 (default, auto-cleanup if occupied)
- **Framework**: Flask (Python web framework)
- **Markdown Parser**: Python-Markdown with GFM extensions
- **Syntax Highlighter**: Prism.js (CDN) with line numbers plugin
- **Styling**: Custom CSS with professional design system
- **Port Management**: Automatic detection and cleanup of occupied ports

## File Structure

```
plan-preview/
├── SKILL.md              # This file
├── scripts/
│   └── preview_server.py # Main server script
└── requirements.txt      # Python dependencies
```

## Integration with Commands

This skill is used by the `/preview-plan` command:

```bash
/preview-plan ./docs
```

The command automatically:
1. Activates this skill
2. Starts the preview server
3. Opens http://localhost:5555 for viewing

## Keyboard Shortcuts

- **Ctrl+C**: Stop the server
- **Search**: Type in sidebar to filter files

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers

## Security Notes

- Server binds to `0.0.0.0` (all interfaces)
- For production, consider adding authentication
- Only serves markdown files (safe)
- No file upload capability
- Read-only access

## Troubleshooting

### Port Already in Use
If port 5555 is occupied:
```bash
# Kill existing process
lsof -ti :5555 | xargs kill -9
```

### Dependencies Not Found
Install Python packages:
```bash
pip3 install -r .claude/skills/plan-preview/requirements.txt
```

### Markdown Not Rendering
Check file encoding is UTF-8:
```bash
file -I your-file.md
```

## Examples

### Preview Project Documentation
```bash
python3 .claude/skills/plan-preview/scripts/preview_server.py ./docs
```

### Preview Implementation Plans
```bash
python3 .claude/skills/plan-preview/scripts/preview_server.py ./plans
```

### Preview README Files
```bash
python3 .claude/skills/plan-preview/scripts/preview_server.py .
```

## Future Enhancements

- [ ] Live reload on file changes
- [ ] Dark/light theme toggle
- [ ] Export to PDF
- [ ] Table of contents auto-generation
- [ ] Full-text search across all files
- [ ] Markdown editing capability
- [ ] Git diff view for changed files

## License

MIT License - Free to use and modify
