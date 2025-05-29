# SolidJS DOM Element Helpers

This directory contains helper functions for working with DOM elements in a reactive way with SolidJS.

## observeSelector

Observe when elements matching a selector are added to the DOM (including initial ones).

```ts
const cleanup = observeSelector('.post-content', (element) => {
  console.log('Found a new post:', element);
});

// Call cleanup() when you no longer need to observe
```

## useElementsBySelector

A SolidJS hook that maintains a reactive array of DOM elements matching a given CSS selector.
The array updates automatically when elements are added to or removed from the DOM.

### Basic Usage

```tsx
import { useElementsBySelector } from '../helpers';

const MyComponent = () => {
  const [posts] = useElementsBySelector('.message--post');
  
  // The posts array is reactive and will update when elements are added/removed
  return (
    <div>
      <p>Found {posts().length} posts</p>
      <For each={posts()}>
        {(post) => (
          <div>Post ID: {post.id}</div>
        )}
      </For>
    </div>
  );
};
```

### Advanced Usage with Options

```tsx
// With filtering and mapping
const [userPosts] = useElementsBySelector<PostData>('.message--post', {
  // Only track posts from a specific user
  filter: (el) => el.querySelector('.username')?.textContent === 'CurrentUser',
  
  // Map each element to a custom data structure
  map: (el) => ({ 
    id: el.id, 
    content: el.querySelector('.message-content')?.textContent 
  })
});

// Now userPosts() will be an array of PostData objects
```

### Options

The hook accepts an optional options object:

- `filter`: A function to filter elements that match the selector
- `map`: A function to transform elements into a different data structure
- `refetchOnSelectorChange`: Whether to re-query for all elements when the selector changes (default: `true`)
