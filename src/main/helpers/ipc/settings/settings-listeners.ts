import {
  SETTINGS_MODE_GET,
  SETTINGS_MODE_SET,
  SETTINGS_MODE_GET_LIBRARY,
  SETTINGS_MODE_SET_LIBRARY,
} from './settings-channels';
import settings from 'electron-settings';
import { LIBRARY_PATH_SUFFIX } from '@/constants';
import { ipcMain, app } from 'electron';
import path from 'path';
import fs from 'fs-extra';

const libraryPath = () => {
  const _library = settings.getSync('library');

  if (!_library || typeof _library !== 'string') {
    settings.setSync(
      'library',
      process.env.LIBRARY_PATH ||
        path.join(app.getPath('documents'), LIBRARY_PATH_SUFFIX),
    );
  } else if (path.parse(_library).base !== LIBRARY_PATH_SUFFIX) {
    settings.setSync('library', path.join(_library, LIBRARY_PATH_SUFFIX));
  }

  const library = settings.getSync('library') as string;
  fs.ensureDirSync(library);

  return library;
};

const cachePath = () => {
  const tmpDir = path.join(libraryPath(), 'cache');
  fs.ensureDirSync(tmpDir);

  return tmpDir;
};

export function addSettingsEventListeners() {
  ipcMain.handle(SETTINGS_MODE_GET, (_event, key) => {
    return settings.getSync(key);
  });

  ipcMain.handle(SETTINGS_MODE_SET, (_event, key, value) => {
    settings.setSync(key, value);
  });

  ipcMain.handle(SETTINGS_MODE_GET_LIBRARY, (_event) => {
    libraryPath();
    return settings.getSync('library');
  });

  ipcMain.handle(SETTINGS_MODE_SET_LIBRARY, (_event, library) => {
    if (path.parse(library).base === LIBRARY_PATH_SUFFIX) {
      settings.setSync('library', library);
    } else {
      const dir = path.join(library, LIBRARY_PATH_SUFFIX);
      fs.ensureDirSync(dir);
      settings.setSync('library', dir);
    }
  });
}

export default {
  cachePath,
  libraryPath,
  addSettingsEventListeners,
};
