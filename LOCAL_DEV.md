# Running Locally

This monorepo contains the Create T3 App CLI and documentation website.

## Quick Start

### With pnpm (Recommended)

```bash
pnpm install
pnpm run dev
```

### With npm

```bash
npm install --legacy-peer-deps
npm run dev
```

## Preview the App

### Local Machine
If running on your local machine, open your browser to:

**http://localhost:4321**

### Remote/Container Environment (VS Code, GitHub Codespaces, Claude Code)

The dev server binds to `0.0.0.0` for accessibility in containers. Access it via:

1. **Automatic Port Forwarding**: VS Code and GitHub Codespaces will automatically forward port 4321
   - Look for a notification about port forwarding
   - Or check the "Ports" panel in VS Code (View → Ports)
   - Click the forwarded URL to open in your browser

2. **Manual Port Forwarding**: If automatic forwarding doesn't work
   - In VS Code: Open the Ports panel and click "Forward a Port"
   - Enter port `4321`
   - Access the forwarded URL provided

3. **Claude Code Web**: The terminal will display the network URL:
   ```
   ┃ Network  http://21.0.0.82:4321/
   ```
   Use the preview/port forwarding features provided by your environment.

## What's Running

The `dev` script starts the documentation website (Astro) located in the `www` directory.

## Troubleshooting

**ERR_CONNECTION_REFUSED on localhost:4321?**
- You're likely running in a container/remote environment
- Use the port forwarding methods above instead of direct localhost access
- Check your IDE's Ports panel for forwarded URLs

**GitHub API Rate Limiting?**
- Create a `.env` file in the `www` directory
- Add: `PUBLIC_GITHUB_TOKEN=your_token_here`
- This is optional and only affects the GitHub stars counter

## Notes

- This project uses **pnpm workspaces** and is optimized for pnpm
- If using npm, the `--legacy-peer-deps` flag is required due to peer dependency conflicts
- The dev server binds to `0.0.0.0` for accessibility in containers and preview environments
- Default port is **4321** (Astro's standard port)
