import { SectionData } from "../../types/SectionData";
export interface DataDisplayModalProps{
    isOpen: boolean;
    onClose: () => void;
    modalTitle?: string;
    data: SectionData[];
}