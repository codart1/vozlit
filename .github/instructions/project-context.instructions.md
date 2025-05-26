---
applyTo: '**'
---

This project is for developing a tampermonkey script that enhance the functionality of the forum powered by Xenforo: voz.vn

Tech stack:

- pnpm
- typescript
- solidjs
- vite
- tampermonkey
- css modules (support by vite)

We modify the build step to always output a single script, all of the assets are bundled into the script (css, js).

- Our extension will provide custom features for the forum, such as:
  - Custom stickers
  - Custom themes
- For custom features that show some UI, we use solidjs to build the UI. Always try to match the current color themes (utilizing predefined css variable from the root `index.css`) and maintain a clean and aesthetic design.
 
