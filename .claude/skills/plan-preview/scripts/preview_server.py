#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Markdown Preview Server - Professional Edition
Beautiful markdown preview with syntax highlighting using Flask
"""

import os
import sys
import socket
import subprocess
import re
from pathlib import Path
from urllib.parse import quote
from flask import Flask, render_template_string, request
import markdown
from markdown.extensions import fenced_code, tables, toc
from markdown.preprocessors import Preprocessor
from markdown.extensions import Extension

PORT = 5555

def check_and_kill_port(port):
    """Check if port is in use and kill the process"""
    try:
        # Check if port is in use
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        result = sock.connect_ex(('localhost', port))
        sock.close()

        if result == 0:
            print(f"\n⚠️  Port {port} is already in use. Attempting to free it...")
            try:
                # Use lsof to find and kill the process
                cmd = f"lsof -ti :{port}"
                result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
                if result.stdout.strip():
                    pids = result.stdout.strip().split('\n')
                    for pid in pids:
                        subprocess.run(f"kill -9 {pid}", shell=True)
                    print(f"✅ Successfully killed processes on port {port}")
                    import time
                    time.sleep(1)  # Wait for port to be released
                else:
                    print(f"⚠️  No process found on port {port}")
            except Exception as e:
                print(f"❌ Error killing process: {e}")
                print(f"Please manually kill the process on port {port}")
                sys.exit(1)
    except Exception as e:
        print(f"Error checking port: {e}")

# Check and kill port before starting
check_and_kill_port(PORT)

# Get target directory from command line or use current directory
target_dir = sys.argv[1] if len(sys.argv) > 1 else '.'
absolute_target_dir = Path(target_dir).resolve()

if not absolute_target_dir.exists():
    print(f"\n❌ Error: Directory not found: {absolute_target_dir}")
    sys.exit(1)

if not absolute_target_dir.is_dir():
    print(f"\n❌ Error: Path is not a directory: {absolute_target_dir}")
    sys.exit(1)

app = Flask(__name__)

# Add custom Jinja2 filter for URL encoding
@app.template_filter('urlencode')
def urlencode_filter(s):
    """URL encode a string for use in query parameters"""
    if s is None:
        return ''
    return quote(str(s), safe='')

# Custom Mermaid preprocessor to convert mermaid code blocks to divs
class MermaidPreprocessor(Preprocessor):
    def run(self, lines):
        new_lines = []
        in_mermaid = False
        mermaid_content = []

        for line in lines:
            if line.strip().startswith('```mermaid'):
                in_mermaid = True
                mermaid_content = []
                continue
            elif line.strip() == '```' and in_mermaid:
                in_mermaid = False
                # Create a div with mermaid class and the diagram code
                mermaid_code = '\n'.join(mermaid_content)
                new_lines.append(f'<div class="mermaid">{mermaid_code}</div>')
                continue

            if in_mermaid:
                mermaid_content.append(line)
            else:
                new_lines.append(line)

        return new_lines

class MermaidExtension(Extension):
    def extendMarkdown(self, md):
        md.preprocessors.register(MermaidPreprocessor(md), 'mermaid', 175)

# Configure markdown with extensions
# Use fenced_code instead of codehilite to work with Prism.js
md = markdown.Markdown(
    extensions=[
        'fenced_code',
        'tables',
        'toc',
        'nl2br',
        'sane_lists',
        'attr_list',
        MermaidExtension()
    ],
    extension_configs={
        'fenced_code': {
            'lang_prefix': 'language-'  # Prism.js expects this prefix
        }
    }
)

def find_markdown_files(directory):
    """Recursively find all markdown files"""
    files = []
    try:
        for item in directory.rglob('*.md'):
            # Skip hidden folders and node_modules
            if any(part.startswith('.') or part == 'node_modules' for part in item.parts):
                continue
            files.append(item)
    except Exception as e:
        print(f"Error scanning directory: {e}")
    return sorted(files)

def group_files_by_directory(files, base_dir):
    """Group files by their directory"""
    groups = {}
    for file in files:
        relative_path = file.relative_to(base_dir)
        dir_name = str(relative_path.parent) if str(relative_path.parent) != '.' else 'Root'
        if dir_name not in groups:
            groups[dir_name] = []
        groups[dir_name].append({
            'name': file.name,
            'path': str(relative_path),
            'full_path': str(file)
        })
    return dict(sorted(groups.items()))

# HTML Template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }} - Documentation Preview</title>

    <!-- Prism.js for syntax highlighting -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-tsx.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-yaml.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-markdown.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css">

    <!-- Mermaid.js for diagram rendering -->
    <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        window.mermaid = mermaid;
        mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            themeVariables: {
                primaryColor: '#2563eb',
                primaryTextColor: '#1e293b',
                primaryBorderColor: '#3b82f6',
                lineColor: '#64748b',
                secondaryColor: '#f1f5f9',
                tertiaryColor: '#f8fafc'
            }
        });
    </script>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #2563eb;
            --primary-dark: #1e40af;
            --bg-primary: #0f172a;
            --bg-secondary: #1e293b;
            --bg-tertiary: #334155;
            --text-primary: #f8fafc;
            --text-secondary: #cbd5e1;
            --text-tertiary: #94a3b8;
            --border: #334155;
            --success: #10b981;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
            display: flex;
            height: 100vh;
            background: #f8fafc;
            color: #1e293b;
            overflow: hidden;
        }

        /* Sidebar */
        .sidebar {
            width: 320px;
            background: var(--bg-primary);
            color: var(--text-primary);
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--border);
            flex-shrink: 0;
        }

        .sidebar-header {
            padding: 24px 20px;
            background: var(--bg-secondary);
            border-bottom: 1px solid var(--border);
        }

        .sidebar-header h1 {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 16px;
            color: var(--text-primary);
        }

        .search-box input {
            width: 100%;
            padding: 10px 12px;
            background: var(--bg-tertiary);
            border: 1px solid var(--border);
            border-radius: 6px;
            color: var(--text-primary);
            font-size: 14px;
            transition: all 0.2s;
        }

        .search-box input:focus {
            outline: none;
            border-color: var(--primary);
            background: var(--bg-primary);
        }

        .search-box input::placeholder {
            color: var(--text-tertiary);
        }

        .sidebar-content {
            flex: 1;
            overflow-y: auto;
            padding: 12px;
        }

        .dir-group {
            margin-bottom: 20px;
        }

        .dir-name {
            color: var(--text-tertiary);
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 8px 12px;
            margin-bottom: 4px;
        }

        .file-link {
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-secondary);
            text-decoration: none;
            padding: 10px 12px;
            margin: 2px 0;
            border-radius: 6px;
            font-size: 14px;
            transition: all 0.2s;
        }

        .file-link:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
        }

        .file-link.active {
            background: var(--primary);
            color: white;
        }

        .file-icon {
            font-size: 16px;
            flex-shrink: 0;
        }

        .file-name {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Main content */
        .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .content-header {
            background: white;
            padding: 20px 40px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .content-title {
            font-size: 24px;
            font-weight: 600;
            color: #1e293b;
        }

        .badge {
            background: #f1f5f9;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }

        .markdown-container {
            flex: 1;
            overflow-y: auto;
            background: #f8fafc;
        }

        .markdown {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            min-height: calc(100vh - 80px);
        }

        /* Markdown styles */
        .markdown h1 {
            font-size: 36px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 24px;
            padding-bottom: 12px;
            border-bottom: 2px solid #e2e8f0;
            line-height: 1.2;
        }

        .markdown h2 {
            font-size: 28px;
            font-weight: 600;
            color: #1e293b;
            margin: 32px 0 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e2e8f0;
            line-height: 1.3;
        }

        .markdown h3 {
            font-size: 22px;
            font-weight: 600;
            color: #334155;
            margin: 28px 0 12px;
            line-height: 1.4;
        }

        .markdown h4 {
            font-size: 18px;
            font-weight: 600;
            color: #475569;
            margin: 24px 0 10px;
        }

        .markdown p {
            margin: 16px 0;
            line-height: 1.7;
            color: #334155;
            font-size: 16px;
        }

        .markdown code {
            background: #f1f5f9;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
            font-size: 14px;
            color: #e11d48;
            border: 1px solid #e2e8f0;
        }

        .markdown pre {
            background: #2d2d2d !important;
            padding: 0 !important;
            border-radius: 8px;
            overflow-x: auto;
            margin: 24px 0;
            border: 1px solid #404040;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
        }

        .markdown pre code {
            background: none !important;
            padding: 20px !important;
            border: none !important;
            font-size: 14px;
            line-height: 1.6;
            display: block;
            font-family: 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace;
        }

        .markdown pre[class*="language-"] {
            background: #2d2d2d !important;
            margin: 24px 0;
        }

        .markdown code[class*="language-"] {
            background: none !important;
            text-shadow: none;
            /* Let Prism.js handle colors */
        }

        /* Prism line numbers */
        .line-numbers .line-numbers-rows {
            border-right: 1px solid #404040;
        }

        .line-numbers-rows > span:before {
            color: #6b7280;
        }

        .markdown ul, .markdown ol {
            margin: 16px 0;
            padding-left: 32px;
        }

        .markdown li {
            margin: 8px 0;
            line-height: 1.7;
            color: #334155;
        }

        .markdown blockquote {
            border-left: 4px solid var(--primary);
            padding: 16px 20px;
            margin: 24px 0;
            background: #f8fafc;
            border-radius: 0 6px 6px 0;
        }

        .markdown a {
            color: var(--primary);
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
        }

        .markdown a:hover {
            border-bottom-color: var(--primary);
        }

        .markdown table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            font-size: 14px;
        }

        .markdown table th,
        .markdown table td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
        }

        .markdown table th {
            background: #f8fafc;
            font-weight: 600;
            color: #0f172a;
        }

        .markdown hr {
            border: none;
            border-top: 2px solid #e2e8f0;
            margin: 32px 0;
        }

        .markdown img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 24px 0;
        }

        /* Mermaid diagrams */
        .markdown .mermaid {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
            text-align: center;
            overflow-x: auto;
        }

        .markdown .mermaid svg {
            max-width: 100%;
            height: auto;
        }

        /* Welcome screen */
        .welcome {
            text-align: center;
            padding: 80px 40px;
        }

        .welcome-icon {
            font-size: 64px;
            margin-bottom: 24px;
        }

        .welcome h1 {
            font-size: 32px;
            color: #0f172a;
            margin-bottom: 16px;
            border: none;
            padding: 0;
        }

        .welcome p {
            color: #64748b;
            font-size: 16px;
            margin: 8px 0;
        }

        .welcome .stats {
            display: inline-block;
            margin-top: 24px;
            padding: 16px 32px;
            background: #f1f5f9;
            border-radius: 8px;
            font-weight: 600;
            color: var(--primary);
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            background: transparent;
        }

        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>
<body>
    <aside class="sidebar">
        <div class="sidebar-header">
            <h1>📚 Documentation</h1>
            <div class="search-box">
                <input type="text" id="search" placeholder="Search files..." />
            </div>
        </div>
        <nav class="sidebar-content" id="file-list">
            {% for dir_name, files in groups.items() %}
            <div class="dir-group">
                <div class="dir-name">📂 {{ dir_name }}</div>
                {% for file in files %}
                <a href="/?file={{ file.path | urlencode }}"
                   class="file-link {% if file.path == current_file %}active{% endif %}"
                   data-filename="{{ file.name | lower }}">
                    <span class="file-icon">📄</span>
                    <span class="file-name">{{ file.name }}</span>
                </a>
                {% endfor %}
            </div>
            {% endfor %}
        </nav>
    </aside>

    <main class="content">
        {% if content %}
        <div class="content-header">
            <div class="content-title">{{ title }}</div>
            <div class="file-info">
                <span class="badge">{{ file_count }} files</span>
            </div>
        </div>
        <div class="markdown-container">
            <article class="markdown">{{ content | safe }}</article>
        </div>
        {% else %}
        <div class="markdown-container">
            <div class="markdown">
                <div class="welcome">
                    <div class="welcome-icon">📚</div>
                    <h1>Markdown Preview Server</h1>
                    <p>Select a file from the sidebar to preview</p>
                    <div class="stats">{{ file_count }} markdown files found</div>
                </div>
            </div>
        </div>
        {% endif %}
    </main>

    <script>
        // Syntax highlighting with Prism.js and Mermaid diagram rendering
        document.addEventListener('DOMContentLoaded', async () => {
            // Add line-numbers class to all pre elements
            document.querySelectorAll('pre code').forEach((block) => {
                if (block.parentElement.tagName === 'PRE') {
                    block.parentElement.classList.add('line-numbers');
                }
            });

            // Trigger Prism highlighting
            Prism.highlightAll();

            // Render Mermaid diagrams
            if (window.mermaid) {
                try {
                    await window.mermaid.run({
                        querySelector: '.mermaid'
                    });
                } catch (error) {
                    console.error('Mermaid rendering error:', error);
                }
            }
        });

        // Search functionality
        const searchInput = document.getElementById('search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const fileLinks = document.querySelectorAll('.file-link');

                fileLinks.forEach(link => {
                    const filename = link.getAttribute('data-filename');
                    if (filename.includes(query)) {
                        link.style.display = 'flex';
                    } else {
                        link.style.display = 'none';
                    }
                });

                // Hide empty directory groups
                document.querySelectorAll('.dir-group').forEach(group => {
                    const visibleLinks = Array.from(group.querySelectorAll('.file-link'))
                        .filter(link => link.style.display !== 'none');
                    group.style.display = (visibleLinks.length === 0 && query !== '') ? 'none' : 'block';
                });
            });
        }
    </script>
</body>
</html>"""

@app.route('/')
def index():
    files = find_markdown_files(absolute_target_dir)
    groups = group_files_by_directory(files, absolute_target_dir)

    requested_file = request.args.get('file')
    content = None
    title = 'Documentation'

    if requested_file:
        file_path = absolute_target_dir / requested_file
        if file_path.exists():
            with open(file_path, 'r', encoding='utf-8') as f:
                markdown_content = f.read()
            content = md.convert(markdown_content)
            title = file_path.stem

    return render_template_string(
        HTML_TEMPLATE,
        groups=groups,
        current_file=requested_file,
        content=content,
        title=title,
        file_count=len(files)
    )

if __name__ == '__main__':
    files = find_markdown_files(absolute_target_dir)
    print(f"\n✨ Markdown Preview Server - Professional Edition")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"🌐 URL:       http://localhost:{PORT}")
    print(f"📁 Directory: {absolute_target_dir}")
    print(f"📑 Files:     {len(files)} markdown files")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"\n💡 Features:")
    print(f"   • Professional dark sidebar with search")
    print(f"   • Syntax highlighting with Prism.js + line numbers")
    print(f"   • GitHub-flavored markdown support")
    print(f"   • Mermaid diagram rendering")
    print(f"   • Auto port checking and cleanup")
    print(f"   • Responsive design\n")
    print(f"Press Ctrl+C to stop the server\n")

    app.run(host='0.0.0.0', port=PORT, debug=False)
