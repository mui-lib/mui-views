//
//

import React from 'react';
import clsx from 'clsx';
import {useStyles} from './ViewInformativeTable.styles';

// [ label, value, flexLabel, flexValue ]
export type ISingleLabelValue = [string | any, any, number?, number?]
export type IRowLabelValue = ISingleLabelValue | (ISingleLabelValue[])

interface IProps {
	// TO-DO Support multiple modes:
	// [ A. Text Mode(minWidth=120) | B.1 Card with Inner Title | B.2 Card with Overflowed Title | C.1 Border-less Table | C.2 Table(Bordered Table) ]
	mode: 'text' | 'card' | 'table';
	title?: string,
	// In the mode.
	dataset: (IRowLabelValue | undefined)[];

	// Style for the overall table.
	className?: string;
	style?: object;
	separator?: string;

	// Styles for labels and values.
	padding?: string | number;
	borderRadius?: number;
	flexLabel?: number;
	flexValue?: number;
	styleLabel?: object;
	styleValue?: object;
}

// A view component exhibit #Labels and corresponding #Values.
// Like [#Descriptions](https://ant.design/components/descriptions) in Ant Design.
// This like exactly the table view of keys and values, and hence may be named as #TableOfKeysAndValues.
export const ViewInformativeTable = React.memo<IProps>((
	{
		mode, title,
		dataset, className, style, separator,
		padding = 8, borderRadius, flexLabel = 1, flexValue = 2, styleLabel, styleValue,
	},
) => {
	const cls = useStyles();

	dataset = dataset.filter((row: IRowLabelValue) => Boolean(row));

	const renderComplexRow = (ith: number, bundles: ISingleLabelValue[]) => (
		<div className={clsx(cls.ctnTableRow, {[cls.ctnTableRowsFollowed]: ith !== 0})} key={ith}>
			{bundles.map(([label, value, fLabel, fValue], index) => (
				<div key={index} className={cls.ctnCellLabelValue}>
					<div className={cls.ctnTableLabel} style={{
						flex: fLabel || flexLabel,
						borderRadius: borderRadius && (ith === 0 || ith === dataset.length - 1) ? (
							ith === 0 ? borderRadius + 'px 0px 0px 0px' : '0 0 0 ' + borderRadius + 'px'
						) : undefined,
						...styleLabel,
					}}>
						<div className={cls.ctnTableLabelDiv} style={{padding}}>{label}{separator}</div>
					</div>
					<div className={cls.ctnTableValue} style={{flex: fValue || flexValue, ...styleValue}}>
						<div className={cls.ctnTableValueDiv} style={{padding}}>{value}</div>
					</div>
				</div>
			))}
		</div>
	);

	return mode == 'card' ? (
		<div>
			<div>{title}</div>
			<div>
				{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
			</div>
		</div>
	) : (
		<div className={className ? [cls.ctnTableRoot, className].join(' ') : cls.ctnTableRoot} style={borderRadius ? {borderRadius, ...style} : style}>
			{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);
});
