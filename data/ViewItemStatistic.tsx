//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	item: {margin: '8px 12px'},
	label: {color: '#888', margin: '8px'},

	singleValue: {fontSize: 'xx-large', fontWeight: 'bold', color: '#3a3', textAlign: 'center'},

	values: {fontWeight: 'bold', margin: '8px'},
	value: {fontSize: 'xx-large', color: '#3a3'},
	slash: {fontSize: 'x-large', color: '#999', margin: '0 4px'},
	total: {fontSize: 'large', color: '#666'},

	secondary: {color: '#fa4'},
});

export interface IStatisticDef<T = number> {
	label: string;
	value: T;
	total?: T;
	unit?: string;
	render?: (value: T) => string;
}

export type IStatisticCompressedDef<T = number> = [any, T, T?, string?, ((value: T) => string)?]

// Displaying a single value as an single or standalone item.
export const ViewItemStatistic = React.memo((props: IStatisticDef<number>) => {
	const cls = useStyles();
	const {label, value, total = '', unit = '', render} = props;
	const renderSimpleValue = () => (
		<div className={cls.singleValue} title={render ? render(value) : value + unit}>
			{render ? render(value) : value}
		</div>
	);
	const renderValueSlashTotal = () => (
		<div className={cls.values}>
			<span className={cls.value}>{value}</span>
			<span className={cls.slash}>/</span>
			<span className={cls.total}>{total}</span>
		</div>
	);
	return (
		<div className={cls.item}>
			<div className={cls.label}>{label}</div>
			{total ? renderValueSlashTotal() : renderSimpleValue()}
		</div>
	);
});

