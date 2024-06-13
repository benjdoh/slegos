import type { SvelteComponent } from 'svelte';

type Metadatas = 'description' | 'section' | 'name';

export function getContents() {
	return Object.entries(
		import.meta.glob<{
			default: SvelteComponent;
			metadata: Record<Metadatas, string>;
		}>('/src/lib/functions/**/index.md')
	);
}

export const PATH_REGEX = /\/src\/lib\/functions\/|.md|\/index|\/demo/g;

type GetContentSectionedItem = {
	name: string;
	description: string;
	section: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: SvelteComponent<Record<string, any>, any, any>;
};

export type GetContentSectionedReturn = Record<string, Array<GetContentSectionedItem>>;

export async function getContentSectioned() {
	const pages = getContents();

	const sections: GetContentSectionedReturn = {};

	for (const [path, resolver] of pages) {
		const { default: component, metadata } = await resolver();

		if (!metadata.section) continue;
		if (!sections[metadata.section]) sections[metadata.section] = [];

		sections[metadata.section].push({ ...metadata, name: path.replace(PATH_REGEX, ''), component });
	}

	return sections;
}
