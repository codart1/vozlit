we use this one shot script to generate the stickers:

```js
(() => {
  // 1. Pack name (same as before)
  const fullTitle = document.querySelector('title').textContent;
  const name = fullTitle.replace(/\s*-\s*Download Stickers.*$/, '').trim();

  // 2. Grab each <img> whose class contains Pack_stickerThumb
  const stickers = Array.from(
    document.querySelectorAll('img[class*="Pack_stickerThumb"]')
  ).map((img) => {
    const url = img.src;
    // Get just the filename portion
    const filename = url.split('/').pop();
    // Unique sticker‐level id: filename minus the ".thumb128.png"
    const id = filename.replace(/\.thumb128\.png$/, '');
    return { id, url };
  });

  // 3. Build the object and copy it
  const result = { name, stickers };
  console.log(result);
})();
```

Paste it into the console of the page: https://www.sigstick.com/pack/vts7EkMn9KqT9l3lg4ff (for example)
