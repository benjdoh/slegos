import { getContents } from '$lib/internal/utils.js';
import { PATH_REGEX } from './+page.js';

export async function load({ params: { slug } }) {
	const pages = getContents();

	const sections: Record<string, Array<{ id: string; name: string }>> = {};

	for (const [path, resolver] of pages) {
		const _path = path.replace(PATH_REGEX, '');
		const [section, id] = _path.split('/');

		if (!sections[section]) sections[section] = [];

		const component = await resolver();

		sections[section].push({
			name: component.metadata.title,
			id
		});
	}

	return {
		slug,
		sections
	};
}
