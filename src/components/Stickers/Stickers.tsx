import type FE from 'froala-editor';
import { createSignal, For, Show } from 'solid-js';
import { Modal } from '../../ui';
import { collections } from './collections';
import styles from './Stickers.module.scss';
import { StickerSizeModal } from './StickerSizeModal';
import { StickerCollection } from './types';

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
  const [showModal, setShowModal] = createSignal(false);

  const activeCollection = () => collections[activeTab()];

  const insertSticker = (width?: string) => {
    const url = selectedSticker();
    if (!url) return;

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

      <div class={styles.stickerContent}>
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
      </div>

      <Modal
        isOpen={showModal()}
        onClose={closeModal}
        size="sm"
        position="center"
        title="Select sticker size"
      >
        <StickerSizeModal
          stickerUrl={selectedSticker() || ''}
          options={STICKER_WIDTHS}
          onConfirm={insertSticker}
          onCancel={closeModal}
          initialWidth={STICKER_WIDTHS[0].value}
        />
      </Modal>
    </div>
  );
}
