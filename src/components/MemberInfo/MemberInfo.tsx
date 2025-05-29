import { For } from 'solid-js';
import { Portal } from 'solid-js/web';
import { useElementsBySelector } from '../../helpers';

export function MemberInfo() {
  const [elements] = useElementsBySelector('.message-cell--user');

  const processedElements = () => {
    return elements().map((el) => {
      // find the child with class: message-user
      const container = el.querySelector('.message-user')!;
      const username = container
        .querySelector('.message-name a')
        ?.textContent?.trim();
      return {
        container,
        username,
      };
    });
  };

  return (
    <For each={processedElements()}>
      {({ container, username }) => (
        <MemberInfoItem container={container} username={username} />
      )}
    </For>
  );
}

type MemberInfoItemProps = {
  container: Element;
  username?: string;
};

function MemberInfoItem(props: MemberInfoItemProps) {
  return (
    <Portal mount={props.container}>
      <div
        onClick={async () => {
          if (!props.username) {
            console.warn('Username not found for member info item');
            return;
          }
          const postHistory = await fetchUserPostsHistory(props.username);
          console.log('User posts history:', postHistory);
        }}
      >
        Show posts history
      </div>
    </Portal>
  );
}

function fetchUserPostsHistory(username: string) {
  return XF.ajax<{
    status: string;
    html: {
      content: string;
      title: string;
      css: string[];
    };
    visitor: {
      conversations_unread: string;
      alerts_unviewed: string;
      total_unread: string;
    };
  }>('GET', XF.canonicalizeUrl('search/1935757/'), {
    'c[users]': username,
    o: 'relevance',
    _xfResponseType: 'json',
  });
}

/**
 * Each message-cell--user element looks like this:
 * ```html
 * <div class="message-cell message-cell--user">
						

	<section class="message-user" itemprop="author" itemscope="" itemtype="https://schema.org/Person" itemid="https://voz.vn/u/crazy9x256.1410876/">

		
			<meta itemprop="url" content="https://voz.vn/u/crazy9x256.1410876/">
		

		<div class="message-avatar ">
			<div class="message-avatar-wrapper">
				<a href="/u/crazy9x256.1410876/" class="avatar avatar--m avatar--default avatar--default--dynamic" data-user-id="1410876" data-xf-init="member-tooltip" style="background-color: #1f3d7a; color: #7094db" id="js-XFUniqueId24">
			<span class="avatar-u1410876-m" role="img" aria-label="crazy9x256">C</span> 
		</a>
				
			</div>
		</div>
		<div class="message-userDetails">
			<h4 class="message-name"><a href="/u/crazy9x256.1410876/" class="username " dir="auto" data-user-id="1410876" data-xf-init="member-tooltip" id="js-XFUniqueId25" data-xf-pointer-type="mouse"><span itemprop="name">crazy9x256</span></a></h4>
			<h5 class="userTitle message-userTitle" dir="auto" itemprop="jobTitle">Senior Member</h5>
			
		</div>
		
			
			
		
		<span class="message-userArrow"></span>
	<div>Test...</div></section>

					</div>
 * ```
 */
