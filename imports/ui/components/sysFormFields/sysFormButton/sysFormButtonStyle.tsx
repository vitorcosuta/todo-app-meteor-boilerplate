import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { sysSizing } from '/imports/ui/materialui/styles';

const StyledSysFormButton = styled(Button)(({ theme }) => ({
    border: 'none',
    backgroundColor: theme.palette.divider,
    color: theme.palette.common.black,
    maxWidth: '278px',
    maxHeight: '50px',
    width: '100%',
    margin: sysSizing.base.baseFixed050,
    '&:hover': {
        border: 'none',
        backgroundColor: theme.palette.text.secondary,
        color: theme.palette.common.white,
    },
}));

export default StyledSysFormButton;
