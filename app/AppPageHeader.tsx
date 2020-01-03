//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles({
	ctnPageTitle: {fontWeight: 'bold', padding: '8px'},
});

interface IProps {
	title: string
}

export const AppPageHeader = React.memo(({title}: IProps) => {
	const cls = useStyles();
	return (
		<Typography gutterBottom variant="h3" component='h1' color='primary' className={cls.ctnPageTitle}>{title}</Typography>
	);
});
