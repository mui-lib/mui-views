//

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {margin: 0, padding: '0 2em'},
});

export interface ITreedList {
	name: string;
	// Is children ordered or not.
	ordered?: boolean;
	children?: ITreedList[];
}

interface IProps {
	ordered?: boolean;
	list: ITreedList[];
}

// A view of plain list, to visualize ordered or unordered list, like in markdown.
export const ViewPlainList = React.memo(({ordered, list}: IProps) => {
	const cls = useStyles();

	const renderList = (items: ITreedList[], ordered?: boolean) => ordered ? (
		<ol className={cls.root}>{renderItems(items)}</ol>
	) : (
		<ul className={cls.root}>{renderItems(items)}</ul>
	);

	const renderItems = (items: ITreedList[]) => items.map(({name, children, ordered}, index) => (
		<li key={index}>
			{name}
			{children && children.length > 0 ? renderList(children, ordered) : undefined}
		</li>
	));

	return renderList(list, ordered);
}); 