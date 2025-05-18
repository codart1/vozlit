import { createSignal, type Component, createEffect, For, Show } from 'solid-js';
import style from './App.module.scss';

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
 */
document.documentElement.setAttribute('data-theme', getThemeFromStorage());

const App: Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);
  const [currentTheme, setCurrentTheme] = createSignal(getThemeFromStorage());

  const themes = [
    {
      id: 'pink-light',
      name: 'Pink Light',
      previewBg: '#f3f0f2',
      previewAccent: '#eb5889',
    },
    {
      id: 'pink-dark',
      name: 'Pink Dark',
      previewBg: '#32252a',
      previewAccent: '#eb5889',
    },
    {
      id: 'button-blue-light',
      name: 'Blue Light',
      previewBg: '#e4e8e9',
      previewAccent: '#26b3eb',
    },
    {
      id: 'button-blue-dark',
      name: 'Blue Dark',
      previewBg: '#232729',
      previewAccent: '#26b3eb',
    },
  ];

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
    <>
      {/* Floating Toggle Button */}
      <div class={style.bar}>
        <div 
          class={style['toggle-button']}
          onClick={() => setIsDrawerOpen(true)}
          title="VozLit Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      </div>
      
      {/* Drawer */}
      <div 
        classList={{
          [style.drawer]: true, 
          [style.open]: isDrawerOpen(),
        }}
      >
        <div class={style['drawer-header']}>
          <div class={style['drawer-title']}>VozLit Settings</div>
          <button 
            class={style['close-button']}
            onClick={() => setIsDrawerOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class={style['drawer-content']}>
          <button
            class={style['theme-button']}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"></path>
            </svg>
            Theme Settings
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
      </div>
      
      {/* Overlay to close drawer when clicking outside */}
      <Show when={isDrawerOpen()}>
        <div 
          class={style.overlay}
          onClick={() => setIsDrawerOpen(false)}
        />
      </Show>
    </>
  );
};

export default App;
