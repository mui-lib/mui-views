//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import IconAdd from '@material-ui/icons/Add';

export const useStyles = makeStyles({
	ctnFab: {position: 'absolute', bottom: 50, right: 32},
});

interface IProps {
	onClick: React.MouseEventHandler;
}

export const AppActionButton = React.memo(({onClick}: IProps) => {
	const cls = useStyles();
	return (
		<Fab className={cls.ctnFab} color="primary" onClick={onClick}><IconAdd/></Fab>
	);
});
