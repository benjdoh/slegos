import type { SvelteComponent } from 'svelte';

type Metadatas = 'description' | 'section' | 'name';

// export function getContents() {
// 	return Object.entries(
// 		import.meta.glob<{
// 			default: SvelteComponent;
// 			metadata: Record<Metadatas, string>;
// 		}>('/src/lib/functions/**/index.md')
// 	);
// }

export const PATH_REGEX = /\/src\/lib\/functions\/|.md|\/index|\/demo/g;

export type GetContentsItem = {
	name: string;
	description: string;
	section: string;
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: SvelteComponent<Record<string, any>, any, any>;
};

export async function getContents() {
	const pages = Object.entries(
		import.meta.glob<{
			default: SvelteComponent;
			metadata: Record<Metadatas, string>;
		}>('/src/lib/functions/**/index.md')
	);

	const sections: Array<GetContentsItem> = [];

	for (const [path, resolver] of pages) {
		const { default: component, metadata } = await resolver();

		if (!metadata.section) continue;

		sections.push({ ...metadata, name: path.replace(PATH_REGEX, ''), path, component });
	}

	return sections;
}
