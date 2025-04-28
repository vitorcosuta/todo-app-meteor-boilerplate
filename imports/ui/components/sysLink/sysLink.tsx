import React from "react";
import { LinkProps } from "@mui/material/Link";
import StyledSysLink from "./sysLinkStyle";

const SysLink: React.FC<LinkProps> = ({ children, ...props }) => {

    return (
        <StyledSysLink
            {...props}
        >
            {children}
        </StyledSysLink>
    );
};

export default SysLink;