import { createSignal } from 'solid-js';
import { Tabs, TabItem } from '../../ui';
import styles from './TabsExample.module.scss';

export function TabsExample() {
  const [activeTabIndex, setActiveTabIndex] = createSignal(0);
  
  // Sample tab data
  const tabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'Basic Tab',
      icon: 'https://via.placeholder.com/24',
      content: <div class={styles.tabContent}>This is the content of Tab 1</div>
    },
    {
      id: 'tab2',
      label: 'Tab with Icon',
      icon: 'https://via.placeholder.com/24/ff0000',
      content: <div class={styles.tabContent}>This is the content of Tab 2 with a red icon</div>
    },
    {
      id: 'tab3',
      label: 'Tab with Very Long Label That Should be Truncated',
      content: <div class={styles.tabContent}>This tab has a long name that will be truncated</div>
    },
    {
      id: 'tab4',
      label: 'Disabled Tab',
      disabled: true,
      content: <div class={styles.tabContent}>This content should not be accessible</div>
    }
  ];

  // Custom tab content renderer (optional)
  const renderCustomTabContent = (tab: TabItem) => (
    <div class={styles.customContent}>
      <h3>{tab.label}</h3>
      <p>This is custom rendered content for tab: {tab.id}</p>
    </div>
  );

  return (
    <div class={styles.container}>
      <h2>Default Tabs Example</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          onTabChange={setActiveTabIndex}
          showActiveIndicator={true}
          maxLabelLength={20}
        />
      </div>

      <h2>Pills Variant Tabs</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={1}
          variant="pills"
          onTabChange={setActiveTabIndex}
          showActiveIndicator={true}
        />
      </div>

      <h2>Minimal Variant Tabs</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={2}
          variant="minimal"
          onTabChange={setActiveTabIndex}
        />
      </div>
      
      <h2>Size Variants</h2>
      <div class={styles.exampleBox}>
        <h3>Small Tabs</h3>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          size="small"
          onTabChange={setActiveTabIndex}
        />
        
        <h3>Large Tabs</h3>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          size="large"
          onTabChange={setActiveTabIndex}
        />
      </div>

      <h2>Vertical Orientation</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          orientation="vertical"
          onTabChange={setActiveTabIndex}
        />
      </div>
      
      <h2>Custom Content Height</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          onTabChange={setActiveTabIndex}
          contentHeight="200px"
        />
      </div>

      <h2>Full Width Tabs</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={0}
          fullWidth={true}
          onTabChange={setActiveTabIndex}
        />
      </div>

      <h2>Tabs with Custom Content Renderer</h2>
      <div class={styles.exampleBox}>
        <Tabs 
          tabs={tabs} 
          defaultActiveIndex={1}
          onTabChange={setActiveTabIndex}
          renderTabContent={renderCustomTabContent}
          showActiveIndicator={true}
        />
      </div>
    </div>
  );
}
