import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import UnoCSS from 'unocss/vite';
import {
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
	presetIcons,
	presetUno
} from 'unocss';
import mdx from '@mdx-js/rollup';

export default defineConfig({
	plugins: [
		UnoCSS({
			transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()],
			presets: [presetUno(), presetIcons()]
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
