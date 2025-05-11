/* @refresh reload */
import { render } from 'solid-js/web';

import './index.scss';
import App from './App/App';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'VozLitRoot';
  document.body.insertBefore(root, document.body.firstChild);

  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
    );
  }

  render(() => <App />, root!);
});

document.documentElement.setAttribute('data-theme', 'pink-light');
