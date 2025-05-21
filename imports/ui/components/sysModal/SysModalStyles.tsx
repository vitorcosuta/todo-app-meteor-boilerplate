import React, { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

interface ISysModalStyles {
    ModalContainer: ElementType<BoxProps>;
}

const SysModalStyles: ISysModalStyles = {
    ModalContainer: styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '727px',
        height: '856px',
        backgroundColor: theme.palette.background.paper,
        padding: '30px 60px',
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
    }))
}

export default SysModalStyles;