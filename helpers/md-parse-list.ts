//

import {ITreedList} from '../data/ViewPlainList';

export const isMdList = (md: string): boolean =>
	md.startsWith('- ') || md.startsWith('0. ') || md.startsWith('1. ') ||
	md.includes('\n- ') || md.includes('\n0. ') || md.includes('\n1. ');

// Parse the given markdown document into treed list.
export const mdParseList = (md?: string): ITreedList[] | undefined => {
	md = md?.trim();
	if (!md || !isMdList(md)) {return; }
	const root: ITreedList[] = [];
	const parents: ITreedList[] = [];
	md.split('\n').map(line => {
		let ith = 0;
		for (; ;) {
			if (!line.startsWith('\t')) {break;}
			line = line.substr(1);
			ith++;
		}

		const item: ITreedList = {name: line.substr(2).trim(), ordered: !line.startsWith('- ')};
		parents[ith] = item;
		if (ith === 0) {
			root.push(item);
			return;
		}

		const parent = parents[ith - 1];
		if (!parent.children) {parent.children = [];}
		parent.children.push(item);
	});

	return root;
};
