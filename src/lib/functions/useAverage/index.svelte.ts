import { readable } from 'svelte/store';

export type CreateAverageOptions = {
	default?: number;
};

const history = $state<number[]>([]);

export function createAverage() {
	return {
		useAverage(num: number) {
			history.push(num);
		},
		value: readable(() => {
			if (history.length < 1) return null;

			return history.reduce((p, v) => p + v) / history.length;
		})
	};
}
