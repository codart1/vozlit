import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';
import fs from 'fs';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// Tampermonkey metadata header
const userscriptHeader = `// ==UserScript==
// @name         VozLit
// @namespace    http://vozlit.com/
// @version      0.1
// @description  Make voz great again!
// @author       Zollback
// @match        https://voz.vn/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

`;

export default defineConfig({
  plugins: [
    solidPlugin(),
    {
      name: 'tampermonkey-header',
      writeBundle(options, bundle) {
        // Get the main output file from the bundle
        const mainFile = Object.keys(bundle).find((filename) =>
          filename.endsWith('.js')
        );
        if (mainFile) {
          const filePath = resolve(options.dir || '.', mainFile);
          const content = fs.readFileSync(filePath, 'utf8');
          fs.writeFileSync(filePath, userscriptHeader + content);
        }
      },
    },
    libInjectCss(),
  ],
  build: {
    target: 'esnext',
    minify: true, // Optional: easier debugging when false
    cssCodeSplit: false, // Keep CSS in the same file
    assetsInlineLimit: 100000000, // Ensure all assets are inlined
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['iife'],
      name: 'SolidUserScript',
      fileName: () => 'userscript.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    port: 3000,
  },
});
