import { SUFFIX } from '@/constants';
import { exposeThemeContext } from '@/main/helpers/ipc/theme/theme-context';
import { exposeWindowContext } from '@/main/helpers/ipc/window/window-context';
import { exposeSettingsContext } from '@/main/helpers/ipc/settings/settings-context';

export default function exposeContexts() {
  const { contextBridge } = window.require('electron');

  contextBridge.exposeInMainWorld(SUFFIX, {
    ...exposeWindowContext(),
    ...exposeThemeContext(),
    ...exposeSettingsContext(),
  });
}
