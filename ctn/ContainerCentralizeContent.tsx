import React from 'react';

interface IProps {
	children?: any;
}

export const ContainerCentralizeContent = (
	{children}: IProps,
) => (
	<div style={{textAlign: 'center'}}>{children}</div>
);
