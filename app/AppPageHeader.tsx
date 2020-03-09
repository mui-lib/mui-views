//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles({
	ctnPageTitle: {fontWeight: 'bold', padding: '8px'},
});

interface IProps {
	title: string
	secondary?: boolean;
}

export const AppPageHeader = React.memo(({title, secondary}: IProps) => {
	const cls = useStyles();
	return (
		<Typography
			gutterBottom color='primary' className={cls.ctnPageTitle}
			variant={secondary ? 'h4' : 'h3'} component={secondary ? 'h2' : 'h1'}
		>
			{title}
		</Typography>
	);
});
