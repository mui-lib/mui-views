//

import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconFolder from '@material-ui/icons/FolderOpenOutlined';
import IconSubject from '@material-ui/icons/SubjectOutlined';
import IconTag from '@material-ui/icons/BookmarkBorderOutlined';

const useStyles = makeStyles({
	iconMenuItem: {minWidth: 0, paddingRight: 5, color: '#e6ac00'},
});

interface IProps {
	color?: string;
	icon?: 'session' | 'entry' | 'tag' | React.ReactElement;
}

export const AppMenuIcon = React.memo(({color, icon}: IProps) => {
	const cls = useStyles();
	const renderIcon = () => {
		if (typeof icon !== 'string') {
			return icon as any as React.ReactElement;
		}
		switch (icon) {
			case 'session':
				return (<IconFolder/>);
			case 'tag':
				return (<IconTag/>);
			case 'entry':
			default:
				return (<IconSubject/>);
		}
	};
	return (
		<ListItemIcon className={cls.iconMenuItem} style={color ? {color} : undefined}>{renderIcon()}</ListItemIcon>
	);
});