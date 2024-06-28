import { get, writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunc = (...args: any) => void;

export function useDebounceFn(func: AnyFunc, ms?: number) {
	const last = writable<{
		func: AnyFunc | null;
		symbol: symbol;
		stamp: number;
	}>({
		stamp: Date.now(),
		symbol: Symbol('Debounce function'),
		func: null
	});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any) => {
		const thisSymbol = Symbol('Debounce function');
		last.set({
			func,
			symbol: thisSymbol,
			stamp: Date.now()
		});

		setTimeout(() => {
			if (get(last).symbol !== thisSymbol) return;

			func(...args);
		}, ms || 500);
	};
}
