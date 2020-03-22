//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IStatisticDef, ViewItemStatistic} from './ViewItemStatistic';

// For public views as shared components library, though being opinionated,
// the consistency styling rules or principles may be practiced.
export const useStyles = makeStyles({
	// A margin of 8 around will be just fine.
	// A div parent with `{display: 'flex', flexFlow: 'column nowrap'}` may be added to
	// prevent the auto margins collapsing between adjacent elements.
	// @see https://stackoverflow.com/questions/19718634/how-to-disable-margin-collapsing
	ctn: {margin: '8px'},
	heading: {fontWeight: 'bold', color: '#888', lineHeight: '1.5em'},
	// A padding of 8 will be similarly fine.
	card: {background: 'white', borderRadius: '12px', padding: '8px', margin: '8px 0', display: 'flex', textAlign: 'center'},
});

// [ label | value | total | unit | render ]
export type IStatisticCompressedDef<T = number> = [any, T, T?, string?, ((value: T) => string)?]
// export const dfCompressedStatistic = <T=number>(label: any, value: T, total?: T, unit?: string, render?: (value: T) => string): IStatisticCompressedDef<T> => ([label, value, total, unit, render]);
export const dfCompressedStatistic = (label: any, value: number, total?: number, unit?: string, render?: (value: number) => string): IStatisticCompressedDef => ([label, value, total, unit, render]);

interface IProps {
	title?: string
	description?: string;
	statistics?: IStatisticDef<number>[];
	data?: IStatisticCompressedDef[];
	options?: Partial<IStatisticDef>;
	style?: object;
}

// ViewCardStatistics: A card carrying a group of statistical labels and values.
// ViewPanelStatistics: A group of statistics in a *Panel*, which is usually displayed as *Card*.
export const ViewCardStatistics = React.memo((
	{
		title, description,
		statistics, data, options, style,
	}: IProps,
) => {
	const cls = useStyles();

	statistics = statistics || data?.map(([label, value, total, unit, render]): IStatisticDef => ({label, value, total, unit: unit || options?.unit, render}));

	const renderPanel = () => (
		<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', ...style}}>
			{statistics?.map((statistic, index) => (
				<ViewItemStatistic key={index} {...options} {...statistic}/>
			))}
		</div>
	);

	return title ? (
		<div className={cls.ctn}>
			<div className={cls.heading} title={description}>{title}</div>
			<div className={cls.card}>
				{renderPanel()}
			</div>
		</div>
	) : renderPanel();
});
