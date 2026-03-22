---
description: Preview markdown files in a directory with live preview server
argument-hint: [path]
---

Start a local preview server at http://localhost:5555 to view all markdown files in the specified directory with a sidebar navigation and live preview.

**Your Task:**

1. **Activate the `plan-preview` skill** first

2. Determine the target directory:
   - If user provided a path in arguments: `$ARGUMENTS`
   - If no arguments: use current working directory

3. Start the preview server by running:
   ```bash
   python3 .claude/skills/plan-preview/scripts/preview_server.py <target-directory>
   ```

4. Inform the user:
   - The server is running at http://localhost:5555
   - Tell them how many markdown files were found
   - Explain they can press Ctrl+C to stop the server
   - Explain the server provides:
     - Professional dark sidebar with search functionality
     - Organized file navigation by directory
     - Syntax highlighting for code blocks (Prism.js)
     - GitHub-flavored markdown rendering
     - Mermaid diagram rendering (flowcharts, sequence diagrams, etc.)
     - Clean, responsive design

**Example:**
```bash
# Preview current directory
python3 .claude/skills/plan-preview/scripts/preview_server.py .

# Preview specific directory
python3 .claude/skills/plan-preview/scripts/preview_server.py ./docs

# Preview plans folder
python3 .claude/skills/plan-preview/scripts/preview_server.py ./plans
```

**Dependencies:**
The skill will check for required Python packages (Flask, markdown). If missing, install with:
```bash
pip3 install -r .claude/skills/plan-preview/requirements.txt
```

**IMPORTANT:** Run the command in the background or let it run continuously. The user will manually stop it with Ctrl+C when done.
