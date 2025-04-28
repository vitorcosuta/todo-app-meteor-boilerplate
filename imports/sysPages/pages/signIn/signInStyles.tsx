import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { sysSizing } from '../../../ui/materialui/styles';

interface ISignInStyles {
	Container: React.ElementType;
	Content: React.ElementType;
	FormWrapper: React.ElementType;
	FormInput: React.ElementType;
	FormHelper: React.ElementType;
	Title: React.ElementType;
	CommonText: React.ElementType;
}

const SignInStyles: ISignInStyles = {
	Container: styled(Box)(({ theme }) => ({
		minHeight: '100vh',
		width: '100%',
		backgroundColor: theme.palette.info.contrastText,
		color: theme.palette.common.black,
		position: 'relative',
	})),
	Content: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: theme.spacing(6),
		padding: `${sysSizing.base.baseFixed8} ${sysSizing.spacingFixedXl}`,
	})),
	FormWrapper: styled(Box)(({ theme }) => ({
		width: '60%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: theme.spacing(3),
	})),
	FormInput: styled(Box)(({ theme }) => ({
		width: '100%', 
		display: 'flex', 
		margin: '0 auto', 
		maxWidth: '577px'
	})),
	FormHelper: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row', 
		width: '100%', 
		justifyContent: 'center',
		gap: theme.spacing(1)
	})),
	Title: styled(Typography)(({ theme }) => ({
		fontSize: `calc(3 * ${sysSizing.base.baseFixed125})`, // 60px
		fontWeight: 900,
		letterSpacing: '0.15%',
		lineHeight: '100%',
	})),
	CommonText: styled(Typography)(({ theme }) => ({
		fontSize: sysSizing.base.baseFixed1, // 16px
		fontWeight: 400,
		lineHeight: sysSizing.base.baseFixed15, // 24px
		letterSpacing: '0.15%',
	})),
};

export default SignInStyles;