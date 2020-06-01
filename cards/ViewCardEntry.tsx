import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export interface IViewCardEntry {
	name: string;
	image?: string;
	description?: string;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		margin: '8px 1%', padding: 16, minWidth: 200, cursor: 'pointer',
		background: '#fff', boxSizing: 'border-box', width: '48%',
		display: 'flex', flexFlow: 'column nowrap',
	},

	head: {display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'},
	avatar: {width: 36, height: 36, margin: '0 12px 0 0'},
	avatar$large: {width: 45, height: 45, margin: '0 12px 0 0'},
	name: {flex: 1, fontSize: '1.35em', color: '#099', fontWeight: 'bold'},
	name$large: {flex: 1, fontSize: '1.75em', color: '#099', fontWeight: 'bold'},

	body: {height: '64px', overflow: 'hidden', background: '#fcfcfc', margin: '5px 0'},
	description: {color: '#666', wordBreak: 'break-all'},

	tail: {display: 'flex', flexFlow: 'row nowrap'},
	iconGithub: {color: '#666', cursor: 'pointer'},
}));

interface IProps {
	size?: 'large' | 'small' | 'default';
	entry: IViewCardEntry;
	onClick?: React.MouseEventHandler;
}

export const ViewCardEntry = React.memo((
	{size, entry, onClick}: IProps,
) => {
	const cls = useStyles();

	const {name, description, image} = entry;

	const renderHead = () => (
		<div className={cls.head}>
			{image ? (
				<div className={size === 'large' ? cls.avatar$large : cls.avatar}>
					<img className={size === 'large' ? cls.avatar$large : cls.avatar} src={image}/>
				</div>
			) : undefined}
			<div className={size === 'large' ? cls.name$large : cls.name}>{name}</div>
		</div>
	);

	const renderBody = () => description ? (
		<div className={cls.body}>
			<Typography variant='body1' component='p' className={cls.description}>{description}</Typography>
		</div>
	) : undefined;

	return (
		<Paper className={cls.root} elevation={1} onClick={onClick}>
			{renderHead()}
			{renderBody()}
		</Paper>
	);
});
