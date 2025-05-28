import { observeSelector } from '../../helpers/observeSelector';

const SCRIPT_AUTHOR = 'zollback2';

export function UserVFX() {
  observeSelector('.message-cell--user', (el) => {
    /**
     * Maybe there is a nested element looking like this:
     * <span itemprop="name">camael</span>
     * We can use it to get the username
     */
    const usernameElement = el.querySelector('[itemprop="name"]');
    const username = usernameElement ? usernameElement.textContent : 'unknown';

    if (username === SCRIPT_AUTHOR) {
      el.classList.add('uti-bubble-bg');
      // append 5 bubble elements
      for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        el.appendChild(bubble);
      }
    }

    /**
     * Maybe there is a nested element looking like this:
     * <h5 class="userTitle message-userTitle" dir="auto" itemprop="jobTitle">Senior Member</h5>
     * If so, change the text to "Chủ tịt VozLit 🔥"
     */
    const jobTitleElement = el.querySelector('[itemprop="jobTitle"]');
    if (jobTitleElement) {
      jobTitleElement.textContent = 'Chủ tịt VozLit 🔥';
    }
  });
  return <></>;
}
