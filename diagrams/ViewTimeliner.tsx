import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper, {Orientation} from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import {ViewMarkdown} from 'src/mui-views/docs/ViewMarkdown';
import {clx} from 'src/mui-views/utils/clx';

export interface ITimelinerEntry {
	name: string
	index?: number;
	icon?: string | number | React.ReactNode;
	description?: string | React.ReactNode;
	// A tag, which is often a readable time, or etc.
	time?: string | React.ReactNode;
}

const useStyles = makeStyles({
	ctn: {borderRadius: 8},
	ctnWithExtraPaddingLeft: {
		borderRadius: 8,
		'& .MuiStepConnector-vertical': {padding: '0 0 8px 60px'},
	},

	stepWithExtraPaddingLeft: {position: 'relative', paddingLeft: '60px'},
	time: {position: 'absolute', left: '0', width: '52px', textAlign: 'right'},

	label: {fontSize: '1.1em'},
	activeLabel: {color: '#099', fontSize: '1.25em'},
	content: {color: 'gray'},
	activeContent: {color: '#6aa'},
});

interface IProps {
	background?: string;

	step?: number;
	entries: ITimelinerEntry[];
	orientation?: Orientation;
	desc?: boolean;
	// noSteps?: boolean; // use no linear steps.
	linear?: boolean; // The steps before the current step will be marked as done.
	// Do expend the description, by default, yes.
	expand?: boolean;
	markdown?: boolean; // Support description in markdown format.
}

export const ViewTimeliner = React.memo((
	{
		background,
		entries, step = -1,
		orientation = 'vertical', desc, expand, linear,
		markdown,
	}: IProps,
) => {
	const cls = useStyles();

	const hasTime = Boolean(entries.find(en => Boolean(en.time)));

	const rdEntries = () => entries.map((
		{name, description, icon, index, time}: ITimelinerEntry, ith: number,
	) => (
		<Step key={name} className={hasTime ? cls.stepWithExtraPaddingLeft : undefined}>
			<StepLabel icon={icon} {...(desc ? {icon: entries.length - ith} : undefined)}>
				<div className={clx(cls.label, ith === step && cls.activeLabel)}>
					{hasTime ? <span className={cls.time}>{time || ''} </span> : undefined}
					<b>{name}</b>
				</div>
			</StepLabel>
			<StepContent
				// @ts-ignore
				active={expand !== false} className={clx(cls.content, ith === step && cls.activeContent)}>
				{typeof description === 'string' ? (
					(markdown ? <ViewMarkdown md={description || ''}/> : <Typography>{description}</Typography>)
					// (markdown ? <ViewMarkdown md={description || ''}/> : description)
				) : description}
			</StepContent>
		</Step>
	));

	return (
		<Stepper
			className={hasTime ? cls.ctnWithExtraPaddingLeft : cls.ctn} style={{background}} orientation={orientation}
			activeStep={step} nonLinear={!linear}
		>
			{rdEntries()}
		</Stepper>
	);
});
