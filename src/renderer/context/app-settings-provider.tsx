import React from 'react';
import { SUFFIX } from '@/constants';

const defaultElectronWindow: ElectronWindow = {
  minimize: () => Promise.resolve(),
  maximize: () => Promise.resolve(),
  close: () => Promise.resolve(),
  openDevTools: () => Promise.resolve(),
  openExternal: (url: string) => Promise.resolve(),
  openPath: (path: string) => Promise.resolve(),
  showOpenDialog: () => Promise.resolve({ filePaths: [], canceled: false }),
  showSaveDialog: () => Promise.resolve({ filePath: '', canceled: false }),
  showMessageBox: () =>
    Promise.resolve({ response: 0, checkboxChecked: false }),
  showErrorBox: (title: string, content: string) => Promise.resolve(),
  loadView: (
    url: string,
    bounds: { x: number; y: number; width: number; height: number },
    options?: { navigatable?: boolean },
  ) => Promise.resolve(),
  removeView: () => Promise.resolve(),
  hideView: () => Promise.resolve(),
  showView: () => Promise.resolve(),
  scrapeView: () => Promise.resolve(''),
  getPlatformInfo: () => Promise.resolve({}),
  resetApp: () => Promise.resolve(),
  resetSettings: () => Promise.resolve(),
  relaunchApp: () => Promise.resolve(),
  reloadApp: () => Promise.resolve(),
  isPackaged: () => Promise.resolve(false),
  quitApp: () => Promise.resolve(),
  getSystemPreferencesMediaAccess: () => Promise.resolve({}),
};

const defaultSettingsModeContext: SettingsModeContext = {
  get: () => Promise.resolve(false),
  set: () => Promise.resolve(),
  getLibrary: () => Promise.resolve(),
  setLibrary: () => Promise.resolve(false),
};

const defaultThemeModeContext: ThemeModeContext = {
  toggle: () => Promise.resolve(false), // 默认实现返回 false，表示当前主题未切换
  dark: () => Promise.resolve(), // 默认实现为 void，表示成功设置为暗黑模式
  light: () => Promise.resolve(), // 默认实现为 void，表示成功设置为亮色模式
  system: () => Promise.resolve(true), // 默认实现返回 true，表示系统主题设置成功
  current: () => Promise.resolve('system'), // 默认实现返回 'system'，表示当前主题为系统默认
};

// 创建一个包含默认实现的 AppType
const defaultAppType: AppType = {
  themeMode: defaultThemeModeContext,
  electronWindow: defaultElectronWindow,
  settingsMode: defaultSettingsModeContext,
};

type AppSettingsProviderState = {
  App?: AppType;
};

const initialState: AppSettingsProviderState = {};

export const AppSettingsProviderContext =
  React.createContext<AppSettingsProviderState>(initialState);

export const AppSettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let App = window[SUFFIX as keyof typeof window] || {};

  if (!App?.electronWindow) {
    (window as any)[SUFFIX as keyof any] = defaultAppType;
    App = defaultAppType;
  }

  return (
    <AppSettingsProviderContext.Provider
      value={{
        App,
      }}
    >
      {children}
    </AppSettingsProviderContext.Provider>
  );
};
