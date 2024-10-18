import { ReactNode } from "react";

export interface GenericModalProps{
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    children: ReactNode;
}