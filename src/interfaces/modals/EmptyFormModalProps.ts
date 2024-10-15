import { ModalFormField } from "../../types/ModalFormField";

export interface EmptyFormModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit:(formData:{[key:string]:string|number|boolean})=>void;
    formFields:ModalFormField[];
    formTitle:string;
}