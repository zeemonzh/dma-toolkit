const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow = null;
let agentProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
    resizable: false,
    frame: false,
    transparent: true,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#00000000'
  });

  mainWindow.loadFile('index.html');
  
  // Remove menu bar
  mainWindow.setMenuBarVisibility(false);

  // Handle window close button
  mainWindow.on('close', () => {
    stopAgent();
  });
}

function getAgentPath() {
  const isDev = process.env.NODE_ENV === 'development' || process.argv.includes('--dev');
  let agentPath;
  
  if (isDev) {
    // In development, look for the binary in debug and release folders
    const debugPath = path.join(__dirname, '..', 'target', 'debug', 'dma-toolkit-agent');
    const releasePath = path.join(__dirname, '..', 'target', 'release', 'dma-toolkit-agent');
    
    // On Windows, append .exe
    const debugPathExe = debugPath + '.exe';
    const releasePathExe = releasePath + '.exe';
    
    if (fs.existsSync(debugPathExe)) {
      return debugPathExe;
    } else if (fs.existsSync(releasePathExe)) {
      return releasePathExe;
    } else if (fs.existsSync(debugPath)) {
      return debugPath;
    } else if (fs.existsSync(releasePath)) {
      return releasePath;
    }
  } else {
    // In production, look in the resources directory
    agentPath = path.join(process.resourcesPath, 'agent', 'dma-toolkit-agent');
    const agentPathExe = agentPath + '.exe';
    
    if (fs.existsSync(agentPathExe)) {
      return agentPathExe;
    } else if (fs.existsSync(agentPath)) {
      return agentPath;
    }
  }
  
  return null;
}

function stopAgent() {
  if (agentProcess) {
    try {
      // On Windows, we need to kill the entire process tree
      const kill = require('tree-kill');
      kill(agentProcess.pid, 'SIGTERM', (err) => {
        if (err) {
          console.error('Error killing agent process:', err);
        }
      });
    } catch (error) {
      console.error('Error stopping agent:', error);
      // Fallback to regular kill if tree-kill fails
      agentProcess.kill();
    }
    agentProcess = null;
  }
}

function startAgent() {
  const agentPath = getAgentPath();
  
  if (!agentPath) {
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? 'Agent binary not found. Please build the agent first using "cargo build" in the agent directory.'
      : 'Agent binary not found. Please reinstall the application.';
      
    dialog.showErrorBox('Agent Not Found', errorMessage);
    mainWindow.webContents.send('agent-error', 'Agent binary not found');
    return;
  }

  try {
    agentProcess = spawn(agentPath);

    agentProcess.stdout.on('data', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('agent-output', data.toString());
      }
    });

    agentProcess.stderr.on('data', (data) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('agent-error', data.toString());
      }
    });

    agentProcess.on('error', (error) => {
      console.error('Failed to start agent:', error);
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('agent-error', error.message);
        dialog.showErrorBox('Agent Error', `Failed to start agent: ${error.message}`);
      }
    });

    agentProcess.on('close', (code) => {
      console.log('Agent closed with code:', code);
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('agent-closed', code);
      }
    });
  } catch (error) {
    console.error('Failed to spawn agent:', error);
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('agent-error', error.message);
      dialog.showErrorBox('Agent Error', `Failed to spawn agent: ${error.message}`);
    }
  }
}

// Add IPC handlers
ipcMain.on('restart-agent', () => {
  stopAgent();
  setTimeout(startAgent, 1000);
});

app.whenReady().then(() => {
  createWindow();
  startAgent();
});

app.on('window-all-closed', () => {
  stopAgent();
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    startAgent();
  }
}); 