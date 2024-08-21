import {
  WIN_MINIMIZE_CHANNEL,
  WIN_MAXIMIZE_CHANNEL,
  WIN_CLOSE_CHANNEL,
  APP_OPEN_DEV_TOOLS_CHANNEL,
  SHELL_OPEN_EXTERNAL_CHANNEL,
  SHELL_OPEN_PATH_CHANNEL,
  DIALOG_SHOW_OPEN_DIALOG_CHANNEL,
  DIALOG_SHOW_SAVE_DIALOG_CHANNEL,
  DIALOG_SHOW_MESSAGE_BOX_CHANNEL,
  DIALOG_SHOW_ERROR_BOX_CHANNEL,
  VIEW_LOAD_CHANNEL,
  VIEW_REMOVE_CHANNEL,
  VIEW_HIDE_CHANNEL,
  VIEW_SHOW_CHANNEL,
  VIEW_SCRAPE_CHANNEL,
  APP_PLATFORM_INFO_CHANNEL,
  APP_RESET_CHANNEL,
  APP_RESET_SETTINGS_CHANNEL,
  APP_RELAUNCH_CHANNEL,
  APP_RELOAD_CHANNEL,
  APP_IS_PACKAGED_CHANNEL,
  APP_QUIT_CHANNEL,
  SYSTEM_PREFERENCES_MEDIA_ACCESS_CHANNEL,
} from './window-channels';

export function exposeWindowContext() {
  const { ipcRenderer } = window.require('electron');

  return {
    electronWindow: {
      minimize: () => ipcRenderer.invoke(WIN_MINIMIZE_CHANNEL),
      maximize: () => ipcRenderer.invoke(WIN_MAXIMIZE_CHANNEL),
      close: () => ipcRenderer.invoke(WIN_CLOSE_CHANNEL),
      openDevTools: () => ipcRenderer.invoke(APP_OPEN_DEV_TOOLS_CHANNEL),
      openExternal: (url: string) =>
        ipcRenderer.invoke(SHELL_OPEN_EXTERNAL_CHANNEL, url),
      openPath: (path: string) =>
        ipcRenderer.invoke(SHELL_OPEN_PATH_CHANNEL, path),
      showOpenDialog: () => ipcRenderer.invoke(DIALOG_SHOW_OPEN_DIALOG_CHANNEL),
      showSaveDialog: () => ipcRenderer.invoke(DIALOG_SHOW_SAVE_DIALOG_CHANNEL),
      showMessageBox: (options: Electron.MessageBoxOptions) =>
        ipcRenderer.invoke(DIALOG_SHOW_MESSAGE_BOX_CHANNEL, options),
      showErrorBox: (title: string, content: string) =>
        ipcRenderer.invoke(DIALOG_SHOW_ERROR_BOX_CHANNEL, title, content),
      loadView: (
        url: string,
        bounds: { x: number; y: number; width: number; height: number },
        options?: { navigatable?: boolean },
      ) => ipcRenderer.invoke(VIEW_LOAD_CHANNEL, url, bounds, options),
      removeView: () => ipcRenderer.invoke(VIEW_REMOVE_CHANNEL),
      hideView: () => ipcRenderer.invoke(VIEW_HIDE_CHANNEL),
      showView: () => ipcRenderer.invoke(VIEW_SHOW_CHANNEL),
      scrapeView: () => ipcRenderer.invoke(VIEW_SCRAPE_CHANNEL),
      getPlatformInfo: () => ipcRenderer.invoke(APP_PLATFORM_INFO_CHANNEL),
      resetApp: () => ipcRenderer.invoke(APP_RESET_CHANNEL),
      resetSettings: () => ipcRenderer.invoke(APP_RESET_SETTINGS_CHANNEL),
      relaunchApp: () => ipcRenderer.invoke(APP_RELAUNCH_CHANNEL),
      reloadApp: () => ipcRenderer.invoke(APP_RELOAD_CHANNEL),
      isPackaged: () => ipcRenderer.invoke(APP_IS_PACKAGED_CHANNEL),
      quitApp: () => ipcRenderer.invoke(APP_QUIT_CHANNEL),
      getSystemPreferencesMediaAccess: () =>
        ipcRenderer.invoke(SYSTEM_PREFERENCES_MEDIA_ACCESS_CHANNEL),
    },
  };
}
