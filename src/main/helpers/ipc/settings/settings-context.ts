import {
  SETTINGS_MODE_GET,
  SETTINGS_MODE_SET,
  SETTINGS_MODE_GET_LIBRARY,
  SETTINGS_MODE_SET_LIBRARY,
} from './settings-channels';

export function exposeSettingsContext() {
  const { ipcRenderer } = window.require('electron');
  return {
    settingsMode: {
      set: (args) => ipcRenderer.invoke(SETTINGS_MODE_GET, ...args),
      get: () => ipcRenderer.invoke(SETTINGS_MODE_SET),
      getLibrary: () => ipcRenderer.invoke(SETTINGS_MODE_GET_LIBRARY),
      setLibrary: (args) => ipcRenderer.invoke(SETTINGS_MODE_SET_LIBRARY, ...args),
    },
  };
}
