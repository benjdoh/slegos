import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { kebabCase as _kebab } from 'scule';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export function kebabCase(str: string) {
	return _kebab(str.replace(/[-/\s]+/g, '-'));
}

export function kebabURL(str: string) {
	return str.split('/').map(kebabCase).join('/');
}
