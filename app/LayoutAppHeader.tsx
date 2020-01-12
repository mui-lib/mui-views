//

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const useStyles = makeStyles({
	container: {height: '100%', display: 'flex', flexFlow: 'column'},
	ctnAppBar: {background: '#383'},
	headerTitle: {fontWeight: 'bold', fontSize: '1.5em'},
	// Make the body scrollable, referring the fixed header.
	body: {flex: 1, background: '#eee', overflow: 'auto'},

	// The navigator and content mode.
	ctnNavContent: {flex: 1, background: '#eee', overflow: 'hidden', display: 'flex'},
	nav: {display: 'flex', overflowY: 'auto'},
	nav2: {display: 'flex', overflowY: 'auto'},
	content: {flex: 1, overflow: 'auto'},
});

interface IProps {
	title: string;
	embedded?: boolean;
	nav?: React.ReactNode;
	// The secondary menu, next to the primary navigator.
	// FIXME Check out the differences between nav and menu?
	nav2?: React.ReactNode;
	body: React.ReactNode;
}

// The layout with app header for embedded and standalone applications.
// Possible Names: [ LayoutAppHeader | LayoutEmbeddedApp | LayoutStandaloneApp ]
export const LayoutAppHeader = React.memo<IProps>(({embedded, title, nav, nav2, body}, next, cls = useStyles()) => (
	<div className={cls.container}>
		<AppBar position='static' className={embedded || window['_$embedded'] ? cls.ctnAppBar : undefined}>
			<Toolbar>
				<Typography variant="h6" color="inherit" className={cls.headerTitle}>{title}</Typography>
			</Toolbar>
		</AppBar>
		{nav ? (
			<div className={cls.ctnNavContent}>
				<div className={cls.nav}>{nav}</div>
				{nav2 ? <div className={cls.nav2}>{nav2}</div> : undefined}
				<div className={cls.content}>{body}</div>
			</div>
		) : (
			<div className={cls.body}>
				{body}
			</div>
		)}
	</div>
));
