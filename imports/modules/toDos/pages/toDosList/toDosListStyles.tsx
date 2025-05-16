import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import  Box,{ BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IToDosListStyles {
	Container: ElementType<BoxProps>;
	TabSection: ElementType<BoxProps>;
}

const ToDosListStyles: IToDosListStyles = {
	Container: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100vw',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
    	marginBottom: sysSizing.contentFabDistance
	})),
	TabSection: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
    	marginBottom: sysSizing.contentFabDistance
	}))
};

export default ToDosListStyles;
