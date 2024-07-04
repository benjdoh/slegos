/**
 * Cubic bezier points
 */
export type CubicBezierPoints = [number, number, number, number];

/**
 * Easing function
 */
export type EasingFunction = (n: number) => number;

/**
 * Transition options
 */
export interface TransitionOptions {
	/**
	 * Manually abort a transition
	 */
	abort?: () => any;

	/**
	 * Fires when the value is updated
	 */
	update?: (v: number) => any;

	/**
	 * Transition duration in milliseconds
	 */
	duration?: number;

	/**
	 * Easing function or cubic bezier points for calculating transition values
	 */
	transition?: EasingFunction | CubicBezierPoints;
}

export interface CreateTransitionOptions extends TransitionOptions {
	/**
	 * Milliseconds to wait before starting transition
	 */
	delay?: number;

	/**
	 * The initial value
	 */
	initial?: number;

	/**
	 * Callback to execute after transition finishes
	 */
	onFinished?: () => void;

	/**
	 * Callback to execute after transition starts
	 */
	onStarted?: () => void;
}
