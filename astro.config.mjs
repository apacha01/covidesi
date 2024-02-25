import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: 'https://apacha01.github.io',
	base: '/covidesi',
	integrations: [tailwind()]
});