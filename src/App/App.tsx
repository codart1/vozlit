import { createSignal, type Component, Show } from 'solid-js';
import style from './App.module.scss';
import {
  ThemeSettings,
  initializeTheme,
} from '../components/ThemeSettings/ThemeSettings';
import { EditorSticker } from '../components/Stickers/EditorSticker';

// Initialize theme as soon as possible to avoid flickering
initializeTheme();

const App: Component = () => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <div class={style.bar}>
        <div
          class={style['toggle-button']}
          onClick={() => setIsDrawerOpen(true)}
          title="Cài đặt VozLit"
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
          <div class={style['drawer-title']}>Cài đặt VozLit</div>
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
          <ThemeSettings />
          <div
            class="uti-bubble-bg"
            style={{
              height: '400px',
            }}
          >
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
            <div class="bubble"></div>
          </div>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      <Show when={isDrawerOpen()}>
        <div class={style.overlay} onClick={() => setIsDrawerOpen(false)} />
      </Show>

      <EditorSticker />
    </>
  );
};

export default App;
