export type CreateAverageOptions = {
	default?: number;
};

export function createAverage() {
	const history = $state<number[]>([]);

	return {
		useAverage(num: number) {
			history.push(num);
		},
		get value() {
			if (history.length < 1) return null;

			return history.reduce((p, v) => p + v) / history.length;
		}
	};
}
