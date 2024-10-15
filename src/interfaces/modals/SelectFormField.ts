import { FormField } from "./FormField";
import { SelectOption } from "./SelectOption";

export interface SelectFormField extends FormField{
    type:"select";
    options:SelectOption[];
}