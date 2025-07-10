# Network Simulation Applet

A SolidJS-based network simulation component that visualizes network topology and device interactions. This project can be used both as a standalone application for development/testing and as a reusable library component.

## Features

- Interactive network topology visualization
- Support for various network devices (computers, routers, switches, printers, mobile devices, TVs)
- Device configuration and interaction popups
- Forwarding table management
- Multi-language support
- Responsive design with Tailwind CSS

## Dual Usage

### As a Standalone Application (Development Mode)

For development, testing, and demonstration purposes:

```bash
$ npm install # or pnpm install or yarn install
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the standalone application in your browser.

### As a Library Component

To use the NetworkSimulator component in your own SolidJS projects:

```bash
$ npm install network-simulation
```

Then import and use in your SolidJS application:

```jsx
import { NetworkSimulator } from 'network-simulation';

function MyApp() {
  return (
    <div>
      <NetworkSimulator width="600" height="400" />
    </div>
  );
}
```

## Installation

Dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

```bash
$ npm install # or pnpm install or yarn install
```

**Quick start with Make:**
```bash
$ make install  # Install dependencies
$ make dev      # Start development server
$ make build    # Build library
$ make help     # Show all available make targets
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

You can use either npm commands or the convenient Makefile shortcuts:

### Development Mode (Standalone App)

#### `npm run dev` or `make dev`

Runs the standalone development application.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

#### `npm run serve`

Serves the built development version for preview.

### Library Mode

#### `npm run build` or `make build`

Builds the component as a library for distribution to the `dist` folder.<br>
This creates both ES modules and CommonJS formats optimized for use in other projects.

The build is minified and ready for npm publishing or local distribution.

### Make Targets

- `make help` - Show all available make targets
- `make install` - Install dependencies (equivalent to `npm install`)
- `make dev` - Start development server (equivalent to `npm run dev`)
- `make build` - Build library (equivalent to `npm run build`)
- `make manuals` - Build project documentation

## Project Structure

```
/dev/           # Standalone application for development/testing
/src/           # Library source code (NetworkSimulator component)
/dist/          # Built library output (generated)
```

## Publishing

To publish as an npm package:

1. Update version in `package.json`
2. Run `npm run build` to create the library build
3. Run `npm publish` (ensure you're logged in to npm)

## Development

The project uses a dual-build system:
- **Development mode**: Serves a standalone app from the `/dev` folder for testing
- **Library mode**: Builds the component from `/src` for distribution

## Deployment

### Standalone App
You can deploy the development build (`dist-dev` folder) to any static host provider (netlify, surge, now, etc.)

### Library
Publish to npm registry or distribute the `dist` folder for local use.
