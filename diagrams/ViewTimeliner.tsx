import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper, {Orientation} from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {ViewMarkdown} from 'src/mui-views/docs/ViewMarkdown';
import {clx} from 'src/mui-views/utils/clx';

export interface ITimelinerEntry {
	name: string
	index?: number;
	icon?: string;
	description?: string;
	// A tag, which is often a readable time, or etc.
	time?: string;
}

const useStyles = makeStyles({
	ctn: {borderRadius: 8},
	label: {fontSize: '1.1em'},
	activeLabel: {color: '#099', fontSize: '1.25em'},
	content: {color: 'gray'},
	activeContent: {color: '#6aa'},
});

interface IProps {
	step?: number;
	entries: ITimelinerEntry[];
	orientation?: Orientation;
	desc?: boolean;
	// noSteps?: boolean; // use no linear steps.
	linear?: boolean; // The steps before the current step will be marked as done.
	expand?: boolean;
}

export const ViewTimeliner = React.memo((
	{
		entries, step = -1,
		orientation = 'vertical', desc, expand, linear,
	}: IProps,
) => {
	const cls = useStyles();

	const rdEntries = () => entries.map((
		{name, description, icon, index, time}: ITimelinerEntry, ith: number,
	) => (
		<Step key={name}>
			<StepLabel {...(desc ? {icon: entries.length - ith} : undefined)}>
				<div className={clx(cls.label, ith === step && cls.activeLabel)}>
					<span>{time || ''} </span>
					<b>{name}</b>
				</div>
			</StepLabel>
			<StepContent {...(expand ? {active: true} : undefined)} className={clx(cls.content, ith === step && cls.activeContent)}>
				{description ? (
					<ViewMarkdown md={description || ''}/>
				) : undefined}
			</StepContent>
		</Step>
	));

	return (
		<Stepper
			className={cls.ctn} orientation={orientation}
			activeStep={step} nonLinear={!linear}
		>
			{rdEntries()}
		</Stepper>
	);
});