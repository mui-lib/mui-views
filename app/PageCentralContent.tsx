import React from 'react';

interface IProps {
	maxWidth?: number;
	margin?: string | number;
	padding?: string | number;
	children?: any;
}

export const PageCentralContent = (
	{maxWidth = 960, margin = '0 auto', padding = 16, children}: IProps,
) => (
	<div style={{margin, maxWidth, padding}}>{children}</div>
);
