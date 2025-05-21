import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IToDosListStyles {
	TabSection: ElementType<BoxProps>;
	SearchInput: ElementType<BoxProps>;
	ModalHeader: ElementType<BoxProps>;
}

const ToDosListStyles: IToDosListStyles = {
	TabSection: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
    	marginBottom: sysSizing.contentFabDistance,
	})),
	SearchInput: styled(Box)(() => ({
		width: '100%', 
		display: 'flex', 
		maxWidth: '528px',
	})),
	ModalHeader: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	}))
};

export default ToDosListStyles;
