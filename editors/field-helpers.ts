//

import {ISelectorItem} from 'src/mui-lib/editors/definitions';

type funcGetErrorText = (value: string) => string | undefined;

/* The definer of field checker for errors with hints and limits. */

interface ILimitHint {
	limit: number;
	hint?: string;
}

const obsoleteErrorChecker = (
	hint: string, min?: ILimitHint, max?: ILimitHint,
): funcGetErrorText =>
	(value: string): string | undefined => {
		if (!value) {return hint;}
		if (min && value.length < min.limit) {return min.hint || hint;}
		if (max && max.limit > 0 && value.length > max.limit) {return max.hint || hint;}
		return;
	};

interface IMinMaxLimit {
	min?: number;
	max?: number;
	minHint?: string;
	maxHint?: string;
	hint?: string;
}

const newErrorChecker = (
	notice: string, {min, max, hint = notice, minHint = hint, maxHint = hint}: IMinMaxLimit = {},
): funcGetErrorText =>
	(value: string): string | undefined => {
		if (!value) {return notice;}
		if (min && value.length < min) {return minHint;}
		if (max && max > 0 && value.length > max) {return maxHint;}
		return;
	};

/* The definer of options for single(radios) and multiple(checkboxes) selector. */

const newFieldOptions = <T extends string = string>(enums: { [key: string]: string }, keys?: T[]): ISelectorItem[] =>
	(keys || Object.keys(enums)).map(key => ({label: enums[key] || key, value: key}));

const dfFieldOptions = (options: [string, string | undefined][]): ISelectorItem[] =>
	options.map(([value, label]) => ({label: label || value, value}));


export const EditorFieldHelper = {
	obsoleteErrorChecker,
	newErrorChecker,

	newFieldOptions,
	dfFieldOptions,
};
