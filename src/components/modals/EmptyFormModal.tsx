import { ChangeEvent, FC, FormEvent, useState } from "react";
import { EmptyFormModalProps } from "../../interfaces/modals/EmptyFormModalProps";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { SelectFormField } from "../../interfaces/modals/SelectFormField";
import { ModalFormField } from "../../types/ModalFormField";
import Grid from '@mui/material/Grid2'


const EmptyFormModal: FC<EmptyFormModalProps> = ({
    isOpen,
    onClose,
    formFields = [],
    onSubmit,
    formTitle,
}) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string | number | boolean }>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    const handleSelectChange = (e: ChangeEvent<{ value: unknown }>, name: string) => {
        setFormValues((prevValues) => ({ ...prevValues, [name]: e.target.value as string }));
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formValues);
        }
        onClose();
    }

    const isSelectField = (field: ModalFormField): field is SelectFormField => {
        return field.type === "select"
    }

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth>
            <DialogTitle>{formTitle}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    {formFields.map((field, index) => (
                        
                        <Grid key={index} container mb={2} spacing={2}>
                            <Grid size={{xs:12}}>
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
                            </Grid>
                        </Grid>
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
export default EmptyFormModal;