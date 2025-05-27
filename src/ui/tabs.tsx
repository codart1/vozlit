import { createSignal, For, JSX, Show } from 'solid-js';
import styles from './tabs.module.scss';

export interface TabItem {
  id: string | number;
  label: string;
  icon?: string;
  content?: JSX.Element;
  disabled?: boolean;
}

export type TabVariant = 'default' | 'pills' | 'underline' | 'minimal';
export type TabSize = 'small' | 'medium' | 'large';
export type TabOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  renderTabContent?: (tab: TabItem, index: number) => JSX.Element;
  showActiveIndicator?: boolean;
  maxLabelLength?: number;
  variant?: TabVariant;
  size?: TabSize;
  orientation?: TabOrientation;
  fullWidth?: boolean;
  class?: string;
  tabsClass?: string;
  contentClass?: string;
  contentHeight?: string; // Custom height for tab content container
}

export function Tabs(props: TabsProps) {
  const [activeTabIndex, setActiveTabIndex] = createSignal(props.defaultActiveIndex || 0);

  // Function to truncate tab label if it exceeds maxLabelLength characters
  const truncateLabel = (label: string) => {
    const maxLength = props.maxLabelLength || 30;
    return label.length > maxLength ? `${label.substring(0, maxLength)}...` : label;
  };

  const handleTabClick = (index: number, event: MouseEvent, disabled: boolean = false) => {
    if (disabled) return;
    
    event.preventDefault();
    setActiveTabIndex(index);
    if (props.onTabChange) {
      props.onTabChange(index);
    }
  };

  const activeTab = () => props.tabs[activeTabIndex()];

  // Generate class names based on props
  const containerClasses = () => {
    const classes = [styles.tabsContainer];
    
    if (props.orientation === 'vertical') {
      classes.push(styles.vertical);
    }
    
    if (props.class) {
      classes.push(props.class);
    }
    
    return classes.join(' ');
  };

  const tabsClasses = () => {
    const classes = [styles.tabs];
    
    if (props.variant) {
      classes.push(styles[props.variant]);
    }
    
    if (props.size) {
      classes.push(styles[props.size]);
    }
    
    if (props.fullWidth) {
      classes.push(styles.fullWidth);
    }
    
    if (props.orientation === 'vertical') {
      classes.push(styles.verticalTabs);
    }
    
    if (props.tabsClass) {
      classes.push(props.tabsClass);
    }
    
    return classes.join(' ');
  };
  
  // Get inline styles for the tab content container
  const contentStyle = () => {
    if (props.contentHeight) {
      return { maxHeight: props.contentHeight };
    }
    return {};
  };

  return (
    <div class={containerClasses()}>
      <div class={tabsClasses()}>
        <For each={props.tabs}>
          {(tab, index) => (
            <button
              class={`${styles.tab} ${
                activeTabIndex() === index() ? styles.active : ''
              } ${tab.disabled ? styles.disabled : ''}`}
              onClick={(e) => handleTabClick(index(), e, tab.disabled)}
              title={tab.label}
              disabled={tab.disabled}
              data-tab-id={tab.id}
            >
              <div class={styles.tabContent}>
                <Show when={tab.icon}>
                  <div class={styles.tabIconWrapper}>
                    <img
                      src={tab.icon}
                      alt=""
                      class={styles.tabIcon}
                    />
                    <Show when={props.showActiveIndicator && activeTabIndex() === index()}>
                      <div class={styles.activeIndicator} />
                    </Show>
                  </div>
                </Show>
                <span class={styles.tabName}>
                  {truncateLabel(tab.label)}
                </span>
              </div>
            </button>
          )}
        </For>
      </div>

      <div 
        class={`${styles.tabContentContainer} ${props.contentClass || ''}`}
        style={contentStyle()}
      >
        <Show 
          when={props.renderTabContent}
          fallback={
            <Show 
              when={activeTab()?.content} 
              fallback={<div class={styles.emptyContent}>No content available</div>}
            >
              {activeTab().content}
            </Show>
          }
        >
          {props.renderTabContent?.(activeTab(), activeTabIndex())}
        </Show>
      </div>
    </div>
  );
}
