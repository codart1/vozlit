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

    /** XF API response wrapper */
    interface ApiResponse<T> {
      request: Request;
      response: Response;
      data: T;
    }

    /** AJAX helper: wraps jQuery.ajax + CSRF + JSON handling */
    function ajax<T = any>(
      method: 'get' | 'post' | 'GET' | 'POST',
      url: string,
      data?: Record<string, any>
    ): Promise<ApiResponse<T>>;

    /** AJAX helper with callback: wraps jQuery.ajax + CSRF + JSON handling */
    function ajax<T = any>(
      method: 'get' | 'post' | 'GET' | 'POST',
      url: string,
      data?: Record<string, any>,
      callback?: (
        data: ApiResponse<T>,
        status: string,
        xhr: JQuery.jqXHR<ApiResponse<T>>
      ) => void
    ): Promise<ApiResponse<T>>;

    /** After an AJAX call with HTML + headHtml, swap them in */
    function setupPage(response: {
      html: string;
      headHtml: string;
      title?: string;
    }): void;

    /** The injected page config object */
    const config: Config;

    /** Canonicalize a URL using the site's base URL */
    function canonicalizeUrl(url: string): string;

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
