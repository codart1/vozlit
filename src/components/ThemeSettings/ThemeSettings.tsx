import { createSignal, type Component, createEffect, For } from 'solid-js';
import style from './ThemeSettings.module.scss';
import { ThemeIcon } from '../../ui/icons';

// Theme constants
const THEME_STORAGE_KEY = 'voz-lit-theme';
const DEFAULT_THEME = 'pink-light';

// Helper functions for theme management
const getThemeFromStorage = (): string => {
  return localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
};

const saveThemeToStorage = (theme: string): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

/**
 * Set theme as soon as possible to avoid flickering.
 * This can be called from outside the component
 */
const initializeTheme = (): void => {
  document.documentElement.setAttribute('data-theme', getThemeFromStorage());
};

/**
 * Get the current theme from storage
 */
const getCurrentTheme = (): string => {
  return getThemeFromStorage();
};

// Export the functions
export { initializeTheme, getCurrentTheme };

export interface ThemeOption {
  id: string;
  name: string;
  previewBg: string;
  previewAccent: string;
}

export const themes: ThemeOption[] = [
  {
    id: 'pink-light',
    name: 'Hồng Sáng',
    previewBg: '#f3f0f2',
    previewAccent: '#eb5889',
  },
  {
    id: 'pink-dark',
    name: 'Hồng Tối',
    previewBg: '#32252a',
    previewAccent: '#eb5889',
  },
  {
    id: 'button-blue-light',
    name: 'Xanh Sáng',
    previewBg: '#e4e8e9',
    previewAccent: '#26b3eb',
  },
  {
    id: 'button-blue-dark',
    name: 'Xanh Tối',
    previewBg: '#232729',
    previewAccent: '#26b3eb',
  },
];

interface ThemeSettingsProps {}

export const ThemeSettings: Component<ThemeSettingsProps> = () => {
  const [currentTheme, setCurrentTheme] = createSignal(getThemeFromStorage());

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    saveThemeToStorage(theme);
    setCurrentTheme(theme);
  };

  // Set initial theme on component mount
  createEffect(() => {
    const theme = getThemeFromStorage();
    document.documentElement.setAttribute('data-theme', theme);
    setCurrentTheme(theme);
  });

  return (
    <div class={style['theme-settings']}>
      <button class={style['theme-button']}>
        <ThemeIcon size={16} />
        Cài đặt giao diện
      </button>

      <div class={style['theme-list']}>
        <For each={themes}>
          {(theme) => (
            <div
              class={style['theme-item']}
              onClick={() => setTheme(theme.id)}
              classList={{ [style.active]: theme.id === currentTheme() }}
            >
              <div
                class={style['color-preview']}
                style={{
                  'background-color': theme.previewBg,
                  'border-top': `2px solid ${theme.previewAccent}`,
                  'box-shadow':
                    theme.id === currentTheme()
                      ? `0 0 0 2px ${theme.previewAccent}`
                      : '',
                }}
              />
              <span class={style['theme-name']}>{theme.name}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
