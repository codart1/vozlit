import { createSignal, type Component, Show } from 'solid-js';
import style from './App.module.scss';
import {
  ThemeSettings,
  initializeTheme,
} from '../components/ThemeSettings/ThemeSettings';
import { EditorSticker } from '../components/Stickers/EditorSticker';
import { UserVFX } from '../components/UserVFX/UserVFX';
import { SettingsIcon, CloseIcon } from '../ui/icons';

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
          <SettingsIcon size={18} />
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
            <CloseIcon size={20} />
          </button>
        </div>

        <div
          class={style['drawer-content']}
        >
          <ThemeSettings />
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      <Show when={isDrawerOpen()}>
        <div class={style.overlay} onClick={() => setIsDrawerOpen(false)} />
      </Show>

      <EditorSticker />
      <UserVFX />
    </>
  );
};

export default App;
