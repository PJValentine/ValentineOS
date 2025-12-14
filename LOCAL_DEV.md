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

Once running, open your browser to:

**http://localhost:4321**

The terminal will display both local and network URLs when the server starts.

## What's Running

The `dev` script starts the documentation website (Astro) located in the `www` directory.

## Notes

- This project uses **pnpm workspaces** and is optimized for pnpm
- If using npm, the `--legacy-peer-deps` flag is required due to peer dependency conflicts
- The dev server binds to `0.0.0.0` for accessibility in containers and preview environments
- Default port is **4321** (Astro's standard port)
