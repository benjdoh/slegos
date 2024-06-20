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
// @ts-expect-error no types
import autoImport from 'sveltekit-autoimport';

export default defineConfig({
	plugins: [
		autoImport({
			components: ['./src/lib/components']
		}),
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
