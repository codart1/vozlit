import { createResource, Show } from 'solid-js';
import { Modal } from '../../ui/modal';
import styles from './MemberInfo.module.scss';

type PostHistoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
};

export function PostHistoryModal(props: PostHistoryModalProps) {
  // Only fetch data when the modal is open
  const fetchPostHistory = async () => {
    if (!props.username || !props.isOpen) return null;
    try {
      // This will now handle the two-step process internally
      const response = await fetchUserPostsHistory(props.username);
      
      // Check if we got valid content
      if (!response?.data?.html?.content) {
        console.warn(
          'No post history content returned for user:',
          props.username
        );
      }
      return response;
    } catch (error) {
      console.error('Error fetching post history:', error);
      return null;
    }
  };

  // Create resource with source function that triggers the fetch when isModalOpen changes
  const [postHistory, { refetch }] = createResource(
    () => props.isOpen,
    fetchPostHistory
  );

  // Handle errors in loading
  const handleRefresh = () => {
    if (!postHistory.loading) {
      refetch();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={`Post History: ${props.username || ''}`}
      size="lg"
    >
      <div class={styles.postHistoryContainer}>
        <Show
          when={!postHistory.loading}
          fallback={<div class={styles.loading}>Loading post history...</div>}
        >
          <Show
            when={postHistory()?.data?.html?.content}
            fallback={
              <div class={styles.errorMessage}>
                <p>No post history available for {props.username}</p>
                <p class={styles.errorDetail}>
                  User may not have any posts, or there was an error processing 
                  the search request. Check the console for more details.
                </p>
                <div class={styles.refreshButton} onClick={handleRefresh}>
                  Try again
                </div>
              </div>
            }
          >
            <div innerHTML={postHistory()?.data.html.content} />

            {/* Process pagination links to work within our modal */}
            <div class={styles.modalFooter}>
              <div class={styles.footerNote}>
                Note: Click on any post title to view the full thread
              </div>
            </div>
          </Show>
        </Show>
      </div>
    </Modal>
  );
}

async function fetchUserPostsHistory(username: string) {
  console.log(`Fetching posts for user: ${username}`);
  
  try {
    // Step 1: Make initial search request to get the redirect URL
    const initialSearchUrl = XF.canonicalizeUrl('search/search');
    console.log(`STEP 1: Making initial search request to: ${initialSearchUrl}`);
    
    // First request to get the redirect URL
    const initialResponse = await XF.ajax<InitialSearchResponse>('GET', initialSearchUrl, {
      'c[users]': username,
      o: 'relevance',
      _xfResponseType: 'json',
    });
    
    // Log the response for debugging
    console.log('STEP 1 Response:', {
      status: initialResponse.data.status,
      redirect: initialResponse.data.redirect,
    });
    
    // Check if we got a redirect URL
    if (!initialResponse?.data?.redirect) {
      console.error('No redirect URL found in the initial search response');
      return null;
    }
    
    // Extract the redirect URL and ensure it has the _xfResponseType parameter
    let redirectUrl = initialResponse.data.redirect;
    
    // Add _xfResponseType=json if it's not already there
    if (!redirectUrl.includes('_xfResponseType=json')) {
      redirectUrl += redirectUrl.includes('?') ? '&_xfResponseType=json' : '?_xfResponseType=json';
    }
    
    console.log(`STEP 2: Following redirect to: ${redirectUrl}`);
    
    // Step 2: Make request to the redirect URL to get the actual content
    const finalResponse = await XF.ajax<XFApiResponse>('GET', redirectUrl, {});
    
    // Log success
    console.log(`STEP 2 Complete: Received ${finalResponse.data.html?.content?.length || 0} bytes of content`);
    
    return finalResponse;
  } catch (error) {
    console.error('Error in fetchUserPostsHistory:', error);
    throw error;
  }
}

// Type for the initial search response that contains the redirect URL
type InitialSearchResponse = {
  status: string;
  message: string;
  redirect: string; // URL to redirect to for actual search results
  visitor: {
    conversations_unread: string;
    alerts_unviewed: string;
    total_unread: string;
  };
};

// Define the response type for the final search results
type XFApiResponse = {
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
};
