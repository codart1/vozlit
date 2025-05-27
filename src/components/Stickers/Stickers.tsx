import type FE from 'froala-editor';
import { createSignal, For, Show } from 'solid-js';
import { Modal, Tabs, TabItem } from '../../ui';
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
  const [activeTabIndex, setActiveTabIndex] = createSignal(0);
  const [selectedSticker, setSelectedSticker] = createSignal<string | null>(
    null
  );
  const [showModal, setShowModal] = createSignal(false);

  const activeCollection = () => collections[activeTabIndex()];

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

  // Convert collections to TabItem format
  const tabItems: TabItem[] = collections.map((collection, index) => ({
    id: index,
    label: collection.name,
    icon: collection.stickers.length > 0 ? collection.stickers[0].url : undefined
  }));

  // Render tab content
  const renderTabContent = () => (
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
  );

  return (
    <div class={styles.container}>
      <Tabs 
        tabs={tabItems} 
        defaultActiveIndex={0}
        onTabChange={setActiveTabIndex}
        showActiveIndicator={true}
        maxLabelLength={30}
        renderTabContent={() => renderTabContent()}
      />
      
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
