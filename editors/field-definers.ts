//

import {_CommonFields} from 'src/mui-lib/editors/commons';
import {IEnvironment, IFieldDefinition, IInputFieldDefinition, IMultipleSelectorFieldDefinition, ISelectorItem, ISingleSelectorFieldDefinition} from 'src/mui-lib/editors/definitions';
import {
	FieldAutoCompleteOff, FieldMarginDense,
	FieldTypeGroupedCheckboxes, FieldTypeRadio, FieldTypeSingleSelector, FieldTypeString,
	FieldVariantOutlined,
} from 'src/mui-lib/editors/instances';

// The global options for all applications.
const mAppFieldDefaultOptions = {
	required: true, fullWidth: true,
	type: FieldTypeString, variant: FieldVariantOutlined,
	margin: FieldMarginDense, multiline: false,
	autoComplete: FieldAutoCompleteOff,
};

type funcGetErrorText = (value: string) => string | undefined;

interface IFieldOptions {
	type?: _CommonFields.IFieldTypeText;
	getPlaceholder?: (env?: IEnvironment, field?: IFieldDefinition, value?: string) => string | undefined;
	multiline?: boolean;
}

interface IFieldDefiners {
	df: (
		id: string, label: string, placeholder: string, getErrorText?: funcGetErrorText, extras?: IFieldOptions,
	) => IInputFieldDefinition;
	dfSingleSelector: (
		id: string, label: string, values: ISelectorItem[], getErrorText?: funcGetErrorText, placeholder?: string,
	) => ISingleSelectorFieldDefinition;
	dfGroupedCheckBoxes: (
		id: string, label: string, direction: _CommonFields.IFieldGroupFlexDirection, values: ISelectorItem[], getErrorText?: funcGetErrorText, placeholder?: string,
	) => IMultipleSelectorFieldDefinition;
	dfGroupedRadios: (
		id: string, label: string, direction: _CommonFields.IFieldGroupFlexDirection, values: ISelectorItem[], getErrorText?: funcGetErrorText, placeholder?: string,
	) => ISingleSelectorFieldDefinition;
}

// A template to build standard field programmatically more fast.
export const newEditorFieldDefiners = (options?: object): IFieldDefiners => {
	const ops = {...mAppFieldDefaultOptions, ...options};

	const df = (
		id: string, label: string, placeholder: string, getErrorText?: funcGetErrorText,
		extras?: { type?: _CommonFields.IFieldTypeText },
	): IInputFieldDefinition => ({
		...ops, ...extras, id, label, placeholder,
		required: Boolean(getErrorText), getErrorText,
	});

	const dfSingleSelector = (
		id: string, label: string, values: _CommonFields.ISelectorItem[], getErrorText?: funcGetErrorText, placeholder: string = '',
	): ISingleSelectorFieldDefinition => ({
		...ops, type: FieldTypeSingleSelector,
		id, label, values, placeholder,
		required: Boolean(getErrorText), getErrorText,
	});

	const dfGroupedCheckBoxes = (
		id: string, label: string, direction: _CommonFields.IFieldGroupFlexDirection, values: _CommonFields.ISelectorItem[], getErrorText?: funcGetErrorText, placeholder: string = '',
	): IMultipleSelectorFieldDefinition => ({
		...ops, type: FieldTypeGroupedCheckboxes, direction,
		id, label, values, placeholder,
		required: Boolean(getErrorText), getErrorText,
	});

	const dfGroupedRadios = (
		id: string, label: string, direction: _CommonFields.IFieldGroupFlexDirection, values: ISelectorItem[], getErrorText?: funcGetErrorText, placeholder: string = '',
	): ISingleSelectorFieldDefinition => ({
		...ops, type: FieldTypeRadio, direction,
		id, label, values, placeholder,
		required: Boolean(getErrorText), getErrorText,
	});

	return {df, dfSingleSelector, dfGroupedRadios, dfGroupedCheckBoxes};
};
