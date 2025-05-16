// Make this an "external module" so we can import if needed,
// but also augment the global scope.
export {};

declare global {
  namespace XF {
    /** Configuration injected on each page */
    interface Config {
      csrf: string;
      version: string;
      frontend: {
        dir: string;
      };
      requestUri: string;
      // add other properties as you discover them…
    }

    /** AJAX helper: wraps jQuery.ajax + CSRF + JSON handling */
    function ajax(
      method: 'get' | 'post',
      url: string,
      data?: Record<string, any>
    ): JQuery.jqXHR<any>;

    /** After an AJAX call with HTML + headHtml, swap them in */
    function setupPage(response: {
      html: string;
      headHtml: string;
      title?: string;
    }): void;

    /** The injected page config object */
    const config: Config;

    namespace StyleVariation {
      /**
       * Updates the current style variation.
       * @param variation The variation name to switch to.
       */
      function updateVariation(variation: string): void;
    }
  }
}

// Ensure the file is treated as a module
export as namespace XF;
