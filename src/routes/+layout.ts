import { getContents } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	return {
		slug,
		pages: await getContents()
	};
}
