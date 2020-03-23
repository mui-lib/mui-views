//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const size = 54;

const item = {
	display: 'flex', justifyContent: 'center', alignItems: 'center',
	width: size, height: size,
	cursor: 'pointer',
};

const useStyles = makeStyles({
	root: {margin: '0', display: 'flex', flexFlow: 'row wrap', background: '#f3f3f3', padding: '12px 8px'},
	item: {...item, color: '#888', fontWeight: 'bold'},

	border: {border: '1px solid #fff'},
	// black -> dark -> light -> white
	dark: {color: '#555'},


	selected: {background: '#0090f0', color: '#fff', borderRadius: '50%'},
	square: {borderRadius: '8px'},
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

const clsx = (...cls: (string | boolean | undefined)[]) => cls.filter(t => Boolean(t)).join(' ');

// A dense grid containing usually indexed entries like a calendar.
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

	const rdSimpleItem = (item: ICompGridEntry, index: number) => (
		<div
			key={index}
			className={clsx(
				cls.item,
				border && cls.border,
				text === 'dark' && cls.dark,
				item === target && cls.selected,
				square && cls.square,
			)}
			onClick={() => setTarget(item)}
		>
			{item[0] === undefined ? index : item[0]}
		</div>
	);

	return (
		<div className={cls.root}>
			{data?.map(rdSimpleItem)}
		</div>
	);
};


