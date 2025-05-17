import { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import sysMainSizes from "../../materialui/sysSizes";

interface ITodoCollapseStyles {
    Wrapper: ElementType<BoxProps>;
    DropdownBox: ElementType<BoxProps>;
}

const TodoCollapseStyles: ITodoCollapseStyles = {
    Wrapper: styled(Box)(() => ({
        width: '100%',
    })),
    DropdownBox: styled(Box)(() => ({
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: sysMainSizes.spacingFixedLg
    }))
}

export default TodoCollapseStyles;