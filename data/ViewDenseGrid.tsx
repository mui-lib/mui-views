//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {clx} from '../utils/clx';

// Consider to support the configure of size with "large=64px", "56", "normal=48", "40", "small=32".
// Consider the feature of responsive sizing, with a fix number columns.
const size = 54;

const item = {
	display: 'flex', justifyContent: 'center', alignItems: 'center',
	width: size, height: size, borderRadius: '50%',
	cursor: 'pointer', fontFamily: 'sans-serif', overflow: 'hidden',
};

const useStyles = makeStyles({
	root: {margin: '0', display: 'flex', flexFlow: 'row wrap', background: '#f3f3f3', padding: '12px 8px'},
	item: {...item, fontSize: '24px', color: '#888', fontWeight: 'bold'},

	border: {border: '1px solid #fff'},
	// black -> dark -> light -> white
	dark: {color: '#555'},

	selected: {background: '#0090f0', color: '#fff'},
	square: {borderRadius: '8px'},

	bundle: {
		...item,
		flexFlow: 'column nowrap',
	},
	value: {color: '#666', fontSize: '1.25em', fontWeight: 'bold'},
	$value: {color: '#fff'},
	label: {color: '#aaa', fontSize: '0.8em'},
	$label: {color: '#f6f6f6'},
});

interface IGridEntry {
	label?: string;
	value?: string;
	color?: string;
}

// [ value, label, color ]
export type ICompGridEntry = [string | number, string | undefined, string | undefined]
export const dfCompGridEntry = (value: string | number, label?: string, color?: string): ICompGridEntry => [value, label, color];

interface IGridOptions {
	// Specify the number of columns.
	columns?: number;
	// The labels for each columns.
	labels?: string[];
	// Count vertically.
	vertical?: boolean;
}

// Styling items.
interface ItemOptions {
	border?: boolean;
	text?: 'dark' | 'light';
	// Selected item.
	square?: boolean;
}

interface IProps extends IGridOptions, ItemOptions {
	data?: ICompGridEntry[];

	// theme?: ISelectableTheme;
}

// A dense grid containing usually indexed entries like a calendar.
// Consider to implement a real calendar, and a real seats table, instead of a generic so-called grid.
export const ViewDenseGrid = (
	{
		columns, labels, vertical,
		border, text,
		square,
		data,
	}: IProps,
) => {
	const cls = useStyles();
	if (labels) {columns = labels.length;}

	const [target, setTarget] = React.useState<ICompGridEntry>();

	const rdSimpleItem = (item: ICompGridEntry, index: number, selected: boolean) => (
		<div
			key={index}
			className={clx(
				cls.item,
				border && cls.border,
				text === 'dark' && cls.dark,
				selected && cls.selected,
				square && cls.square,
			)}
			style={selected ? {background: item[2]} : {color: item[2]}}
			onClick={() => selected ? setTarget(undefined) : setTarget(item)}
		>
			{item[0] === undefined ? index : item[0]}
		</div>
	);

	const rdComplexItem = (item: ICompGridEntry, index: number, selected: boolean) => (
		<div
			key={index}
			className={clx(
				cls.bundle,
				border && cls.border,
				text === 'dark' && cls.dark,
				selected && cls.selected,
				square && cls.square,
			)}
			style={selected ? {background: item[2]} : undefined}
			onClick={() => selected ? setTarget(undefined) : setTarget(item)}
		>
			<div className={clx(cls.value, selected && cls.$value)} style={selected ? undefined : {color: item[2]}}>{item[0] === undefined ? index : item[0]}</div>
			<div className={clx(cls.label, selected && cls.$label)} style={selected ? undefined : {color: item[2]}}>{item[1]}</div>
		</div>
	);

	return (
		<div className={cls.root}>
			{data?.map((item, index) => item[1] ? rdComplexItem(item, index, item === target) : rdSimpleItem(item, index, item === target))}
		</div>
	);
};
