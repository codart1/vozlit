import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';
import fs from 'fs';

// Tampermonkey metadata header
const userscriptHeader = `// ==UserScript==
// @name         VozLit
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make voz great again!
// @author       Zollback
// @match        https://voz.vn/*
// @grant        none
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
  ],
  build: {
    target: 'esnext',
    minify: false, // Optional: easier debugging when false
    cssCodeSplit: false, // Keep CSS in the same file
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'), // Update to your entry file
      formats: ['iife'], // Immediately-Invoked Function Expression format
      name: 'SolidUserScript', // Global variable name
      fileName: () => 'userscript.js', // Output file name
    },
    rollupOptions: {
      output: {
        // Ensure all assets are included in the main file
        inlineDynamicImports: true,
      },
    },
  },
  server: {
    port: 3000,
  },
});
