import { styled } from '@mui/material/styles';
import Link from "@mui/material/Link";

const StyledSysLink = styled(Link)(({ theme }) => ({
    color: theme.palette.common.black,
}));

export default StyledSysLink;