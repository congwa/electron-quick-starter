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
      set: () => ipcRenderer.invoke(SETTINGS_MODE_GET),
      get: () => ipcRenderer.invoke(SETTINGS_MODE_SET),
      getLibrary: () => ipcRenderer.invoke(SETTINGS_MODE_GET_LIBRARY),
      setLibrary: () => ipcRenderer.invoke(SETTINGS_MODE_SET_LIBRARY),
    },
  };
}
