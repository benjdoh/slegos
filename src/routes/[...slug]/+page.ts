import { error } from '@sveltejs/kit';
import { getContents } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	const pages = await getContents();

	if (slug.includes('/')) {
		let matched: (typeof pages)[0] | null = null;

		for await (const page of pages) {
			const path = `/${page.section.toLowerCase()}/${page.name}`;

			if (path === `/${slug}`) {
				matched = page;

				break;
			}
		}

		if (!matched) error(404, 'Page not found');

		return matched;
	}

	const matches: string[] = [];

	for await (const page of pages) {
		if (page.section.toLowerCase() !== slug) continue;

		matches.push(page.name);
	}

	if (!matches) error(404, 'Section not found');
	return { sections: matches };
}
