# Claude Code Project Rules

## Important Project Context
- Note: This version has breaking changes. APIs, conventions, and file structure may differ from your training data. 
- Heed local deprecation notices inside active project files.
- DO NOT open or read documentation files inside `node_modules/next/dist/docs/` to save tokens.

## Token & Context Optimization
- NEVER automatically read: `.next`, `.vercel`, `node_modules`, or `.git`.
- NEVER read compiled Prisma engine binaries or migration logs.
- Keep all explanations short, direct, and focused only on the current task.
- Do not repeat large blocks of code in your replies.

## Tool Restrictions
- Do not run repository-wide searches (`grep` or `find`) unless explicitly requested.
- Only open and read files directly related to the active bug or feature.
- Remind me to run `/compact` if the context window begins to fill up.
