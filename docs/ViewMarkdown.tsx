//

import Typography from '@material-ui/core/Typography';
import React from 'react';
import {ViewPlainList} from '../data/ViewPlainList';
import {isMdList, mdParseList} from '../helpers/md-parse-list';

interface IProps {
	md: string;
}

// Rendering the simple document in the markdown format.
export const ViewMarkdown = React.memo(({md}: IProps) => {

	if (isMdList(md)) return (
		<ViewPlainList list={mdParseList(md) || []}/>
	);

	return (
		<Typography>{md}</Typography>
	);
});