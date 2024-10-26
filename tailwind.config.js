import { createPreset } from 'fumadocs-ui/tailwind-plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/fumadocs-ui/dist/**/*.js',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
  ],
  presets: [
    createPreset({
      preset: 'default',
      addGlobalColors: true,
    }),
  ],
};
