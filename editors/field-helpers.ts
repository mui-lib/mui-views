//

type funcGetErrorText = (value: string) => string | undefined;

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


export const EditorFieldHelper = {
	obsoleteErrorChecker,
	newErrorChecker,
};
