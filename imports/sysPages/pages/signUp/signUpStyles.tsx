import React from "react";
import { styled } from "@mui/material/styles";
import { sysSizing } from '/imports/ui/materialui/styles';
import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button"

interface ISignUpStyles {
	Container: React.ElementType<BoxProps>;
	FormButton: React.ElementType<ButtonProps>;
	FormInput: React.ElementType<BoxProps>;
	FormRouter: React.ElementType<BoxProps>;
}

export const SignUpStyles: ISignUpStyles = {
	Container: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		maxWidth: 500,
		margin: '0 auto',
		gap: theme.spacing(10),
		paddingTop: '10vh',
	})),
	FormButton: styled(Button)(({ theme }) => ({
		backgroundColor: theme.palette.divider,
		border: 'none',
		color: theme.palette.common.black,
		margin: 'auto',
		maxHeight: '50px',
		maxWidth: '278px',
		width: '100%',
		'&:hover': {
			border: 'none',
			backgroundColor: theme.palette.text.secondary,
			color: theme.palette.common.white,
		},
		'&:active': {
			backgroundColor: theme.palette.divider,
			border: 'none',
		},
		'&:focus': {
			backgroundColor: theme.palette.divider,
			border: 'none',
		},
		'&.Mui-focusVisible': {
			backgroundColor: theme.palette.divider,
			border: 'none',
		},
	})),
	FormInput: styled(Box)(() => ({
        width: '100%', 
		display: 'flex', 
		margin: '20px auto', 
    })),
	FormRouter: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row', 
		width: '100%', 
		justifyContent: 'center',
		gap: theme.spacing(1)
	})),
};
