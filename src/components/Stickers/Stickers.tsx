import type FE from 'froala-editor';
import { createSignal, For, Show } from 'solid-js';
import { collections } from './collections';
import { StickerCollection } from './types';
import styles from './Stickers.module.scss';
import { Button } from '../../ui/button';

interface StickersProps {
  editor: FE;
}

// Define sticker width options
const STICKER_WIDTHS = [
  { label: 'Default', value: '' },
  { label: '64px', value: '64px' },
  { label: '128px', value: '128px' },
];

export function Stickers(props: StickersProps) {
  const [activeTab, setActiveTab] = createSignal(0);
  const [selectedSticker, setSelectedSticker] = createSignal<string | null>(
    null
  );
  const [selectedWidth, setSelectedWidth] = createSignal(
    STICKER_WIDTHS[0].value
  ); // Default to first option
  const [showModal, setShowModal] = createSignal(false);

  const activeCollection = () => collections[activeTab()];

  const insertSticker = (url: string, width?: string) => {
    const styleAttr = width ? `style="width: ${width};"` : '';
    props.editor.html.insert(
      `<img src="${url}" alt="vozlit-sticker" ${styleAttr} />`
    );
    // props.editor.events.trigger('contentChanged');
    closeModal();
  };

  const handleStickerClick = (url: string, event: MouseEvent) => {
    event.stopPropagation();
    setSelectedSticker(url);
    setSelectedWidth(STICKER_WIDTHS[0].value); // Reset to default width
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSticker(null);
    setShowModal(false);
  };

  // Function to truncate collection name if it exceeds 30 characters
  const truncateName = (name: string) => {
    return name.length > 30 ? `${name.substring(0, 30)}...` : name;
  };

  return (
    <div class={styles.container}>
      <div class={styles.tabs}>
        <For each={collections}>
          {(collection: StickerCollection, index) => (
            <button
              class={`${styles.tab} ${
                activeTab() === index() ? styles.active : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(index());
              }}
              title={collection.name}
            >
              <div class={styles.tabContent}>
                <Show when={collection.stickers.length > 0}>
                  <div class={styles.tabIconWrapper}>
                    <img
                      src={collection.stickers[0].url}
                      alt=""
                      class={styles.tabIcon}
                    />
                    <Show when={activeTab() === index()}>
                      <div class={styles.activeIndicator} />
                    </Show>
                  </div>
                </Show>
                <span class={styles.tabName}>
                  {truncateName(collection.name)}
                </span>
              </div>
            </button>
          )}
        </For>
      </div>

      <Show
        when={activeCollection().stickers.length > 0}
        fallback={<div>No stickers found</div>}
      >
        <div class={styles.stickerGrid}>
          <For each={activeCollection().stickers}>
            {(sticker) => (
              <div
                class={styles.stickerItem}
                onClick={(e) => handleStickerClick(sticker.url, e)}
              >
                <img src={sticker.url} alt={sticker.id} />
              </div>
            )}
          </For>
        </div>
      </Show>

      {/* Size selection modal */}
      <Show when={showModal()}>
        <div class={styles.backdrop} onClick={closeModal}></div>
        <div class={styles.sizeModal}>
          <div class={styles.modalContent}>
            <div class={styles.modalHeader}>Select sticker size</div>

            <div class={styles.previewArea}>
              <img
                src={selectedSticker() || ''}
                alt="Sticker preview"
                class={styles.stickerPreview}
                style={{ width: selectedWidth() || 'auto' }}
              />
            </div>

            <div class={styles.sizeOptions}>
              <For each={STICKER_WIDTHS}>
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

            <div class={styles.modalActions}>
              <Button 
                variant="cancel" 
                size="sm" 
                onClick={closeModal}
                class={styles.actionButton}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  return insertSticker(selectedSticker()!, selectedWidth());
                }}
                class={styles.actionButton}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
