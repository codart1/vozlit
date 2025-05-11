import { createSignal, type Component } from 'solid-js';
import style from './App.module.scss';

const App: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const themes = [
    'pink-light',
    'pink-dark',
    'button-blue-light',
    'button-blue-dark',
  ];

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div class={style.bar}>
      <div class="uti-relative">
        <button
          onClick={() => {
            console.log('click');
            return setIsOpen((prev) => !prev);
          }}
        >
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
            <button onClick={() => setTheme('pink-dark')}>Pink Dark</button>
            <button onClick={() => setTheme('pink-light')}>Pink Light</button>
            <button onClick={() => setTheme('button-blue-dark')}>
              Button Blue Dark
            </button>
            <button onClick={() => setTheme('button-blue-light')}>
              Button Blue Light
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
