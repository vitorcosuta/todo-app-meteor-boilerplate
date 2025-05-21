import React from "react";
import Modal from "@mui/material/Modal";
import SysModalStyles from "./SysModalStyles";

interface SysModalProps {
    children: React.ReactNode;
    open: boolean;
    onClose: (event: React.SyntheticEvent | {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

export const SysModal = (props: SysModalProps) => {

    const { children, open, onClose } = props;

    const { ModalContainer } = SysModalStyles;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalContainer>
                { children }
            </ModalContainer>
        </Modal>
    );
}