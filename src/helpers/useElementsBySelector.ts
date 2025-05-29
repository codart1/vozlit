import { createSignal, createEffect, onCleanup, Accessor } from 'solid-js';
import { observeSelector, SelectorCallback } from './observeSelector';

/**
 * Options for the useElementsBySelector hook
 */
export interface UseElementsBySelectorOptions {
  /** 
   * Function to filter elements that match the selector 
   */
  filter?: (el: Element) => boolean;
  
  /**
   * Whether to re-query all matching elements on each selector change
   * @default true
   */
  refetchOnSelectorChange?: boolean;
}

/**
 * SolidJS hook that tracks all DOM elements matching a selector as a reactive array.
 * Updates reactively when elements are added or removed from the DOM.
 * 
 * @param selector CSS selector to match elements
 * @param options Additional options for filtering elements
 * @returns A signal containing an array of matched elements
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const [posts] = useElementsBySelector('.message--post');
 * 
 * // With filtering
 * const [userPosts] = useElementsBySelector('.message--post', {
 *   filter: el => el.querySelector('.username')?.textContent === 'CurrentUser',
 * });
 * ```
 */
export function useElementsBySelector(
  selector: string | Accessor<string>,
  options?: UseElementsBySelectorOptions
): [Accessor<Element[]>] {
  const [elements, setElements] = createSignal<Element[]>([]);
  let currentElements = new Set<Element>();
  const getSelector = typeof selector === 'function' ? selector : () => selector;
  const {
    filter,
    refetchOnSelectorChange = true,
  } = options || {};
  
  createEffect(() => {
    const currentSelector = getSelector();
    
    // If selector changed and refetch is enabled, clear current elements
    if (refetchOnSelectorChange) {
      currentElements.clear();
      setElements([]);
    }
    
    // Callback function to handle elements being added
    const handleElement: SelectorCallback = (el) => {
      // Apply filter if provided
      if (filter && !filter(el)) return;
      
      if (!currentElements.has(el)) {
        currentElements.add(el);
        setElements(prev => [...prev, el]);
      }
    };
    
    // Start observing for new elements
    const disconnect = observeSelector(currentSelector, handleElement);
    
    // Also observe removals using MutationObserver
    const removalObserver = new MutationObserver(mutations => {
      let needsUpdate = false;
      
      for (const mutation of mutations) {
        mutation.removedNodes.forEach(node => {
          // If the removed node is one of our tracked elements
          if (node instanceof Element && currentElements.has(node)) {
            currentElements.delete(node);
            needsUpdate = true;
          }
          
          // If the removed node contains any of our tracked elements
          if (node.nodeType === Node.ELEMENT_NODE) {
            currentElements.forEach(el => {
              if (node.contains(el)) {
                currentElements.delete(el);
                needsUpdate = true;
              }
            });
          }
        });
      }
      
      // Only update the signal if elements were actually removed
      if (needsUpdate) {
        setElements(Array.from(currentElements));
      }
    });
    
    // Start observing for removals
    removalObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
    
    // Clean up when the component unmounts or when the selector changes
    onCleanup(() => {
      disconnect();
      removalObserver.disconnect();
      currentElements.clear();
      setElements([]);
    });
  });
  
  return [elements];
}
