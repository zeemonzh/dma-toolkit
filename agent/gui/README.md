# DMA Toolkit Agent GUI

A sleek Electron-based GUI for the DMA Toolkit Agent that matches the main webapp's design.

## Features

- Frameless, modern window design
- Matches the webapp's dark theme with red accents
- Shows agent connection status
- Automatic agent process management
- System tray integration

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Run in development mode:
```bash
npm run dev
```

## Building

To create a production build:

```bash
npm run build
```

The built application will be available in the `dist` directory.

## Theme

The GUI uses the same theme as the main webapp:
- Dark background with blur effects
- Red accent colors (#e9213d, #dc2626, #ef4444)
- Animated elements for better UX
- Modern, minimal design

## Notes

- The GUI automatically starts and manages the Rust agent process
- The window is draggable from any point
- Close button is in the top-right corner
- Status indicator shows if the agent is running 