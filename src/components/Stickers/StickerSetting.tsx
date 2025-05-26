import { For } from 'solid-js';
import { collections } from './collections';
import styles from './StickerSetting.module.scss';

export function StickerSetting() {
  return (
    <div class={styles.container}>
      <h2>Sticker Collections</h2>
      
      <div class={styles.collectionList}>
        <For each={collections}>
          {(collection) => (
            <div class={styles.collectionItem}>
              <div class={styles.collectionName}>{collection.name}</div>
              <div class={styles.previewRow}>
                <For each={collection.stickers.slice(0, 5)}>
                  {(sticker) => (
                    <div class={styles.previewSticker}>
                      <img src={sticker.url} alt={sticker.id} />
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
