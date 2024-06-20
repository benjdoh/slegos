import { get, readable, type Writable } from 'svelte/store';

const history = $state<number[]>([]);

export function useAverage(num: Writable<number>) {
	num.subscribe((v) => {
		history.push(v);
	});

	readable(() => {
		return history.reduce((p, v) => p + v) / history.length;
	});

	return;
}
