import { get, readonly, writable, type Readable } from 'svelte/store';

export const useAverage = (num: Readable<number>) => {
	history = [...history, num];

	if (history.length < 0) return;
	if (history.length === 1) return history[0];

	return history.reduce((p, c) => p + c) / history.length;
};
