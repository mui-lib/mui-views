//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles({
	ctnPageDescription: {margin: '8px'},
});

interface IProps {
	description?: string
}

export const AppPageParagraph = React.memo(({description}: IProps) => {
	const cls = useStyles();
	if (!description) {return <div/>;}
	return (
		<div className={cls.ctnPageDescription}>{description}</div>
	);
});
