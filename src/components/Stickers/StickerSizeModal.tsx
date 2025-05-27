import { createSignal, For } from 'solid-js';
import { ActionButtons } from '../../ui';
import styles from './StickerSizeModal.module.scss';

export interface StickerSizeOption {
  label: string;
  value: string;
}

export interface StickerSizeModalProps {
  stickerUrl: string;
  onConfirm: (width: string) => void;
  onCancel: () => void;
  options: StickerSizeOption[];
  initialWidth?: string;
}

export function StickerSizeModal(props: StickerSizeModalProps) {
  const [selectedWidth, setSelectedWidth] = createSignal(
    props.initialWidth || props.options[0].value
  );

  const handleConfirm = (e?: MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    props.onConfirm(selectedWidth());
  };

  return (
    <div class={styles.container}>
      <div class={styles.previewArea}>
        <img
          src={props.stickerUrl || ''}
          alt="Sticker preview"
          class={styles.stickerPreview}
          style={{ width: selectedWidth() || 'auto' }}
        />
      </div>

      <div class={styles.sizeOptions}>
        <For each={props.options}>
          {(option) => (
            <button
              class={`${styles.sizeOption} ${
                selectedWidth() === option.value ? styles.active : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedWidth(option.value);
              }}
            >
              {option.label}
            </button>
          )}
        </For>
      </div>

      <ActionButtons
        onCancel={props.onCancel}
        onConfirm={handleConfirm}
        size="sm"
      />
    </div>
  );
}
