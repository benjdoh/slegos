import type { SvelteComponent } from 'svelte';

export function getContents() {
	return Object.entries(
		import.meta.glob<{
			default: SvelteComponent;
			metadata: Record<string, string>;
		}>('/src/lib/**/index.md')
	);
}

export const PATH_REGEX = /\/src\/lib|.md|\/index|\/demo/g;

export async function getContentSectioned() {
	const pages = getContents();

	const sections: Record<string, Array<string>> = {};

	for (const [path, resolver] of pages) {
		const _path = path.replace(PATH_REGEX, '');
		const section = _path.split('/')[1];

		if (!sections[section]) sections[section] = [];

		const component = await resolver();

		sections[section].push(component.metadata.title);
	}

	return sections;
}
