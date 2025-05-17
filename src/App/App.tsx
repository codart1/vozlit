import { createSignal, type Component, createEffect, For } from 'solid-js';
import style from './App.module.scss';

const App: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [currentTheme, setCurrentTheme] = createSignal('pink-light');

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
    setCurrentTheme(theme);
    setIsOpen(false);
  };

  // Get initial theme
  createEffect(() => {
    const theme =
      document.documentElement.getAttribute('data-theme') || 'pink-light';
    setCurrentTheme(theme);
  });

  return (
    <div class={style.bar}>
      <div class="uti-relative">
        <button
          class={style['theme-button']}
          onClick={() => setIsOpen((prev) => !prev)}
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
          Theme
        </button>
        <div
          classList={{
            [style.floating]: true,
            'uti-no-pointer': !isOpen(),
          }}
        >
          <div
            classList={{
              [style['popup-panel']]: true,
              'uti-slide-in': isOpen(),
              'uti-slide-out': !isOpen(),
            }}
          >
            <div class={style['theme-list']}>
              <For each={themes}>
                {(theme) => (
                  <div
                    class={style['theme-item']}
                    onClick={() => setTheme(theme.id)}
                    classList={{ active: theme.id === currentTheme() }}
                  >
                    <div
                      class={style['color-preview']}
                      style={{
                        'background-color': theme.previewBg,
                        'border-top': `4px solid ${theme.previewAccent}`,
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
      </div>
    </div>
  );
};

export default App;
