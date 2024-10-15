import { EmptyFormModalProps } from "./EmptyFormModalProps";

export interface EditFormModalProps extends EmptyFormModalProps{
    editValues:{[key:string]:string|number|boolean}
}