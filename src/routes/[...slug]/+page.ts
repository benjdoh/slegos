import { error } from '@sveltejs/kit';
import { PATH_REGEX, getContents, kebabURL } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	const pages = getContents();

	const match = pages.find(([path]) => {
		const _path = kebabURL(path.replace(PATH_REGEX, '').replace(' ', '-'));

		if (_path === `/${slug}`) return true;
	});

	const page = await match?.[1]?.();
	if (!page) error(404, 'Page not found');
	if (!page.metadata?.title) error(500, 'Provide title metadata');

	return {
		component: page.default,
		meta: page.metadata,
		path: match?.[0],
		section: match?.[0].replace(PATH_REGEX, '').split('/')[1]
	};
}
