import {
  JSX,
  Show,
  createEffect,
  mergeProps,
  onCleanup,
  splitProps,
} from 'solid-js';
import style from './modal.module.scss';

export interface ModalProps {
  children: JSX.Element;
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'center' | 'top';
  class?: string;
  footer?: JSX.Element;
}

export function Modal(props: ModalProps) {
  const merged = mergeProps(
    {
      size: 'md',
      position: 'center',
      title: '',
    },
    props
  );

  const [local, others] = splitProps(merged, [
    'children',
    'isOpen',
    'onClose',
    'title',
    'size',
    'position',
    'class',
    'footer',
  ]);

  // Close modal on ESC key
  createEffect(() => {
    if (local.isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          local.onClose?.();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      onCleanup(() => {
        document.removeEventListener('keydown', handleKeyDown);
      });
    }
  });

  // Prevent body scrolling when modal is open
  createEffect(() => {
    if (local.isOpen) {
      document.body.style.overflow = 'hidden';

      onCleanup(() => {
        document.body.style.overflow = '';
      });
    }
  });

  return (
    <Show when={local.isOpen}>
      <>
        <div class={style.backdrop} onClick={local.onClose} />
        <div
          class={style.modal}
          classList={{
            [style[`modal-${local.size}`]]: true,
            [style[`position-${local.position}`]]: true,
            [local.class as string]: Boolean(local.class),
          }}
        >
          <div class={style.modalContent}>
            <Show when={local.title}>
              <div class={style.modalHeader}>{local.title}</div>
            </Show>
            <div class={style.modalBody}>{local.children}</div>
            <Show when={local.footer}>
              <div class={style.modalFooter}>{local.footer}</div>
            </Show>
          </div>
        </div>
      </>
    </Show>
  );
}

export default Modal;
