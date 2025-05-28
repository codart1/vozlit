// Helper to observe when elements matching a selector are added to the DOM (including initial ones)
// Usage: observeSelector('.my-class', el => { ... })

export type SelectorCallback = (el: Element) => void;

/**
 * Observe when elements matching a selector are added to the DOM (including initial ones).
 * Returns a disconnect function to stop observing.
 */
export function observeSelector(selector: string, callback: SelectorCallback): () => void {
  // Fire for initial elements
  document.querySelectorAll(selector).forEach(el => callback(el));

  // Observe future additions
  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        // Check the node itself
        if (node.matches(selector)) callback(node);
        // Check descendants
        node.querySelectorAll?.(selector)?.forEach(el => callback(el));
      });
    }
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  return () => observer.disconnect();
}
