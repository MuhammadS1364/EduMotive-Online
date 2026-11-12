export type ThemeMode = 'light' | 'dark' | 'system';
const KEY = 'edumotive-theme';

export function getTheme(): ThemeMode {
  return (localStorage.getItem(KEY) as ThemeMode) || 'system';
}

export function applyTheme(mode: ThemeMode = getTheme()) {
  const dark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.classList.toggle('dark', dark);
}

export function setTheme(mode: ThemeMode) {
  localStorage.setItem(KEY, mode);
  applyTheme(mode);
}

export function watchSystemTheme() {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const fn = () => getTheme() === 'system' && applyTheme('system');
  mq.addEventListener('change', fn);
  return () => mq.removeEventListener('change', fn);
}
