import type FE from 'froala-editor';
import { createSignal, For, Show } from 'solid-js';
import { collections } from './collections';
import { StickerCollection } from './types';
import styles from './Stickers.module.scss';

interface StickersProps {
  editor: FE;
}

export function Stickers(props: StickersProps) {
  const [activeTab, setActiveTab] = createSignal(0);

  const activeCollection = () => collections[activeTab()];

  const insertSticker = (url: string) => {
    props.editor.html.insert(
      `<img src="${url}" alt="vozlit-sticker" style="width: 512px;" />`
    );
    // props.editor.events.trigger('contentChanged');
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
                onClick={() => insertSticker(sticker.url)}
              >
                <img src={sticker.url} alt={sticker.id} />
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
