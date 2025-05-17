import { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

interface ICustomTabPanelStyles {
    TabPanelBox: ElementType<BoxProps>;
}

const CustomTabPanelSyles: ICustomTabPanelStyles = {
    TabPanelBox: styled(Box)(() => ({
        width: '100%'
    }))
};

export default CustomTabPanelSyles;