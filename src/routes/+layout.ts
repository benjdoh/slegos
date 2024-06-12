import { getContentSectioned } from '$lib/internal/index.js';

export async function load({ params: { slug } }) {
	return {
		slug,
		sections: await getContentSectioned()
	};
}
