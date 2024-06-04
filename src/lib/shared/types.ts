import { type Readable, type Writable } from 'svelte/store';

export type MaybeReadable<T> = T | Readable<T>;
export type MaybeWritable<T> = T | Writable<T>;

export type MaybeWriteableOrReadable<T> = MaybeReadable<T> | MaybeWritable<T>;

export type Fn = (...args: any) => void;

export interface ConfigurableWindow {
	/*
	 * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
	 */
	window?: Window;
}

export interface ConfigurableDocument {
	/*
	 * Specify a custom `document` instance, e.g. working with iframes or in testing environments.
	 */
	document?: Document;
}

export interface Position {
	x: number;
	y: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Stoppable {
	isPending: Readable<boolean>;
	stop: Fn;
	start: Fn;
}

export interface Pausable {
	isActive: Readable<boolean>;
	pause: Fn;
	resume: Fn;
	changeIntervalTime: (time: number) => void;
}
