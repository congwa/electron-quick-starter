import { app, BrowserWindow, protocol, net, Menu } from 'electron';
import registerListeners from './helpers/listeners-register';
import path from 'path';
import settings from '@/main/settings';
import contextMenu from 'electron-context-menu';
import { SUFFIX } from '@/constants';
import fs from 'fs-extra';

app.commandLine.appendSwitch('enable-features', 'SharedArrayBuffer');

// Add context menu
contextMenu({
  showSearchWithGoogle: false,
  showInspectElement: false,
  showLookUpSelection: false,
  showLearnSpelling: false,
  showSelectAll: false,
  labels: {
    copy: '复制',
    cut: '剪切',
    paste: '粘贴',
    selectAll: '全选',
  },
  shouldShowMenu: (_event, params) => {
    return params.isEditable || !!params.selectionText;
  },
});

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'accompany',
    privileges: {
      standard: true,
      secure: true,
      bypassCSP: true,
      allowServiceWorkers: true,
      supportFetchAPI: true,
      stream: true,
      codeCache: true,
      corsEnabled: true,
    },
  },
]);

const inDevelopment = process.env.NODE_ENV === 'development';

if (require('electron-squirrel-startup')) {
  app.quit();
}

function createWindow() {
  const preload = path.join(__dirname, 'preload.js');
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: inDevelopment,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: false,

      preload: preload,
    },
    titleBarStyle: 'hidden',
  });
  registerListeners(mainWindow);
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  if (!app.isPackaged) {
    import('electron-devtools-installer')
      .then((mymodule: any) => {
        const installExtension = mymodule.default.default;
        installExtension(mymodule.default.REACT_DEVELOPER_TOOLS, {
          loadExtensionOptions: {
            allowFileAccess: true,
          },
        });
      })
      .catch((err) => console.log('An error occurred: ', err));
  }

  protocol.handle(SUFFIX, (request) => {
    let url = request.url.replace(SUFFIX + '://', '');
    if (url.match(/library\/(audios|videos|recordings|speeches|segments)/g)) {
      url = url.replace('library/', '');
      url = path.join(settings.libraryPath(), url);
    } else if (url.startsWith('library')) {
      url = url.replace('library/', '');
      url = path.join(settings.libraryPath(), url);
    }

    return net.fetch(`file:///${url}`);
  });
  createWindow();
});

//osX only
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Clean up cache folder before quit
app.on('before-quit', () => {
  try {
    fs.emptyDirSync(settings.cachePath());
  } catch (err) {}
});

//osX only ends
