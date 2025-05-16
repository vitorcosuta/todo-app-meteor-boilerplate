import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { sysSizing } from '/imports/ui/materialui/styles';

const StyledSysFormButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.divider,
    border: 'none',
    color: theme.palette.common.black,
    margin: sysSizing.base.baseFixed050,
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
}));

export default StyledSysFormButton;
