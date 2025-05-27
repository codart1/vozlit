import { For, createSignal } from 'solid-js';
import { collections } from './collections';
import styles from './StickerSetting.module.scss';
import { Tabs, TabItem } from '../../ui';

export function StickerSetting() {
  const [activeTabIndex, setActiveTabIndex] = createSignal(0);
  
  // Create tab items from collections
  const collectionTabs: TabItem[] = collections.map((collection, index) => ({
    id: `collection-${index}`, // Generate id from index since it's not in the structure
    label: collection.name,
    icon: collection.stickers[0]?.url, // Use the first sticker as the icon
    content: (
      <div class={styles.collectionContent}>
        <div class={styles.stickerGrid}>
          <For each={collection.stickers}>
            {(sticker) => (
              <div class={styles.stickerItem}>
                <img src={sticker.url} alt={sticker.id} />
              </div>
            )}
          </For>
        </div>
      </div>
    )
  }));
  
  return (
    <div class={styles.container}>
      <h2>Sticker Collections</h2>
      
      <Tabs
        tabs={collectionTabs}
        defaultActiveIndex={0}
        onTabChange={setActiveTabIndex}
        showActiveIndicator={true}
        variant="pills"
        maxLabelLength={20}
        contentHeight="300px"
      />
    </div>
  );
}
