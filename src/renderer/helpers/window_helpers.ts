import { SUFFIX } from '@/constants';
export async function minimizeWindow() {
  await window[SUFFIX as keyof typeof window].electronWindow.minimize();
}
export async function maximizeWindow() {
  await window[SUFFIX as keyof typeof window].electronWindow.maximize();
}
export async function closeWindow() {
  await window[SUFFIX as keyof typeof window].electronWindow.close();
}
