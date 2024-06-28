import {
	defineConfig,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	theme: {
		colors: {
			brand: '#d43008'
		}
	},
	transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()]
});
