import { error } from '@sveltejs/kit';
import { PATH_REGEX, getContentSectioned, getContents } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	const pages = getContents();
	let match: (typeof pages)[0] | null = null;

	for await (const [path, resolver] of pages) {
		const _path = path.replace(PATH_REGEX, '').replace(' ', '-');
		const { metadata } = await resolver();

		if (`/${metadata.section.toLowerCase()}/${_path}` !== `/${slug}`) continue;

		match = [path, resolver];

		break;
	}
	console.log(await getContentSectioned());

	const page = await match?.[1]?.();
	if (!page) error(404, 'Page not found');
	if (!page.metadata?.name) error(500, 'Provide name metadata');

	return {
		component: page.default,
		meta: page.metadata
	};
}
