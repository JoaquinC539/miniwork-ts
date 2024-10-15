import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SelectFormField } from "../interfaces/modals/SelectFormField";
import { ModalFormField } from "../types/ModalFormField";
import { EditFormModalProps } from "../interfaces/modals/EditFormModalProps";

const EditFormModal: FC<EditFormModalProps> = ({
    isOpen,
    onClose,
    formFields,
    editValues,
    onSubmit,
    formTitle
}) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string | number | boolean }>(editValues);

    useEffect(() => {
        if (editValues) {
            setFormValues(editValues);
        }
    }, [editValues])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const handleSelectChange = (e: ChangeEvent<{ value: unknown }>, name: string) => {
        setFormValues((prevValues) => ({ ...prevValues, [name]: e.target.value as string }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        console.log("submit edit modal")
        e.preventDefault();
        onSubmit(formValues);
        onClose();
    };

    const isSelectField = (field: ModalFormField): field is SelectFormField => {
        return field.type === "select"
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>{formTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field, index) => (
                        <div key={index} className="mb-2 row">
                            <div className="col-12">
                                {/* Handle select fields */}
                                {isSelectField(field) ? (
                                    <FormControl fullWidth margin="dense">
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select
                                            value={formValues[field.name] || ""}
                                            onChange={(e) => handleSelectChange(e as ChangeEvent<{ value: unknown }>, field.name)}
                                        >
                                            {(field as SelectFormField).options.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        label={field.label}
                                        type={field.type || "text"}
                                        name={field.name}
                                        onChange={handleChange}
                                        value={formValues[field.name] || ""}
                                        placeholder={field.placeholder}
                                        fullWidth
                                        margin="dense"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <DialogActions>
                        <Button onClick={onClose}>Cerrar</Button>
                        <Button type="submit" variant="contained">
                            Submit
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}


export default EditFormModal;