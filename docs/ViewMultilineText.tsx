import React from 'react';

interface IProps {
	className: string;
	text?: string;
}

export const ViewMultilineText = (
	{className, text = ''}: IProps,
) => (
	<div className={className}>
		{text.split('\n').map((line) => (
			<span>{line}<br/></span>
		))}
	</div>
);
