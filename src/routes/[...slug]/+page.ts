import { error } from '@sveltejs/kit';
import { getContents } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	const pages = await getContents();
	let match: (typeof pages)[0] | null = null;

	for await (const page of pages) {
		const path = `/${page.section.toLowerCase()}/${page.name}`;

		if (path === `/${slug}`) {
			match = page;

			break;
		}
	}

	if (!match) error(404, 'Page not found');

	return match;
}
