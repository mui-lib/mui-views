//

import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		group: {
			backgroundColor: '#e8e8e8',
			// Use the css selector to remove the padding(s) of children.
			// @see https://material-ui.com/styles/basics/#nesting-selectors
			'& > ul': {padding: 0},
		},
		root: {
			backgroundColor: '#e8e8e8', minWidth: 240, maxWidth: 260,
		},
		sectionHeader: {fontStyle: 'italic'},
		listSection: {backgroundColor: 'inherit'},
		ul: {backgroundColor: 'inherit', padding: 0},
		menuItem: {fontWeight: 'bold', background: '#ddd', color: '#666'},
		menuItemFollowed: {marginTop: 1},
		menuItemSkeleton: {background: '#e0e0e0', minHeight: '46px', padding: '0 12px', display: 'flex', flexFlow: 'column', justifyContent: 'center'},
		skeleton: {height: '2.5em'},
	}),
);

