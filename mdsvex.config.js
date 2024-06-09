import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import slug from 'rehype-slug';
import externalLinks from 'remark-external-links';
import { getHighlighter } from 'shiki';

const config = defineConfig({
	extensions: ['.md'],

	highlight: {
		highlighter: async (code, lang) => {
			const highlighter = await getHighlighter({
				themes: ['catppuccin-frappe', 'catppuccin-latte'],
				langs: ['svelte']
			});
			await highlighter.loadLanguage('javascript', 'typescript');
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang: lang || 'text',
					themes: { light: 'catppuccin-latte', dark: 'catppuccin-frappe' }
				})
			);
			return `<div class="shiki-wrapper">{@html  \`${html}\`}<div copy-code="${escapeSvelte(code)}"></div></div>`;
		}

	},

	smartypants: {
		dashes: 'oldschool'
	},

	//@ts-expect-error idk
	remarkPlugins: [[externalLinks, { target: '_blank', rel: 'noopener noreferrer' }]],
	//@ts-expect-error idk
	rehypePlugins: [slug]
});

export default config;
