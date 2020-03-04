//
//

import React from 'react';
import clsx from 'clsx';
import {onContextMenuPrevented, onOtherMouseButtonsClicked} from '../../mui-lib/helpers/mouse-event';
import {useStyles} from './ViewInformativeTable.styles';

// [ label, value, flexLabel, flexValue ]
export type ISingleLabelValue = [string | any, any, number?, number?]
export type IRowLabelValue = ISingleLabelValue | (ISingleLabelValue[])

type IMode = 'text' | 'card' | 'table';

interface IProps {
	// TO-DO Support multiple modes:
	// [ A. Text Mode(minWidth=120) | B.1 Card with Inner Title | B.2 Card with Overflowed Title | C.1 Border-less Table | C.2 Table(Bordered Table) ]
	// There are basically two kind of views currently:
	// 1. Table-mode View
	// 2. Text-mode View
	mode: 'text' | 'card' | 'table';
	// For those modes, optional title can take into effect controlling the opinionated view as a "inline-block"-displayed panel.
	// - Title-less
	title?: string,
	// - Inner-Title
	// - Outer-Title
	overflowedTitle?: boolean;
	description?: string;
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
		mode, title, overflowedTitle, description,
		dataset, className, style, separator,
		padding = 8, borderRadius, flexLabel = 1, flexValue = 2, styleLabel, styleValue,
	},
) => {
	const cls = useStyles();

	const [$mode, setMode] = React.useState<IMode>(() => mode);
	const [$overflowedTitle, setOverflowedTitle] = React.useState<boolean | undefined>(() => overflowedTitle);
	mode = $mode;
	overflowedTitle = $overflowedTitle;

	dataset = dataset.filter((row: IRowLabelValue) => Boolean(row));

	const renderComplexRow = (ith: number, bundles: ISingleLabelValue[]) => (
		<div className={clsx(cls.ctnTableRow, {[cls.ctnTableRowsFollowed]: ith !== 0})} key={ith}>
			{bundles.map(([label, value, fLabel, fValue], index) => (
				<div key={index} className={cls.ctnCellLabelValue}>
					<div className={cls.ctnTableLabel} style={{
						flex: fLabel || flexLabel,
						borderRadius: borderRadius && (ith === 0 || ith === dataset.length - (mode === 'card' && !overflowedTitle ? 0 : 1)) ? (
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

	const onRightButtonClicked = () => setOverflowedTitle(!overflowedTitle);
	const onMiddleButtonClicked = () => setMode(mode === 'card' ? 'text' : 'table');
	const onMouseUpEvent = onOtherMouseButtonsClicked(onRightButtonClicked, onMiddleButtonClicked);

	const renderCardTable = () => (
		<div className={cls.card} style={borderRadius ? {borderRadius, ...style} : style}>
			{renderComplexRow(0, [[(
				<span className={cls.heading} style={{color: '#396', fontSize: 'large'}} title={description} onMouseUp={onMouseUpEvent} onContextMenu={onContextMenuPrevented}>{title}</span>
			), '']])}
			{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index + 1, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);

	const renderCard = () => (
		<div style={borderRadius ? {borderRadius, ...style} : style}>
			<div className={cls.heading} style={{}} title={description} onMouseUp={onMouseUpEvent} onContextMenu={onContextMenuPrevented}>{title}</div>
			<div className={cls.card}>
				{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
			</div>
		</div>
	);

	const renderTable = () => (
		<div className={className ? [cls.ctnTableRoot, className].join(' ') : cls.ctnTableRoot} style={borderRadius ? {borderRadius, ...style} : style}>
			{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);

	const renderTextView = () => (
		<div>
			<div className={cls.heading} style={{}} title={description} onMouseUp={onMouseUpEvent} onContextMenu={onContextMenuPrevented}>{title}</div>
			{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);
	const renderTextCard = () => (
		<div>
			<div className={cls.heading} style={{}} title={description} onMouseUp={onMouseUpEvent} onContextMenu={onContextMenuPrevented}>{title}</div>
			{dataset.map((row: IRowLabelValue, index) => renderComplexRow(index, Array.isArray(row[0]) ? row : [row] as ISingleLabelValue[]))}
		</div>
	);

	switch (mode) {
		case 'card':
			return overflowedTitle ? renderCard() : renderCardTable();
		case 'table':
			return renderTable();
		case 'text':
			return overflowedTitle ? renderTextCard() : renderTextView();
		default:
			return renderTable();
	}
});
