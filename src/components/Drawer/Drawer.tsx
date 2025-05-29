import { createSignal, type Component, Show, JSX } from 'solid-js';
import { SettingsIcon, CloseIcon } from '../../ui/icons';
import style from './Drawer.module.scss';

export interface DrawerProps {
  title: string;
  children: JSX.Element;
}

export const Drawer: Component<DrawerProps> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal(false);

  return (
    <>
      {/* Floating Toggle Button */}
      <div class={style.bar}>
        <div
          class={style['toggle-button']}
          onClick={() => setIsDrawerOpen(true)}
          title={props.title}
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
          <div class={style['drawer-title']}>{props.title}</div>
          <button
            class={style['close-button']}
            onClick={() => setIsDrawerOpen(false)}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        <div class={style['drawer-content']}>
          {props.children}
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      <Show when={isDrawerOpen()}>
        <div class={style.overlay} onClick={() => setIsDrawerOpen(false)} />
      </Show>
    </>
  );
};
