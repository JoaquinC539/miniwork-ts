import { FC } from "react";
import { GenericModalProps } from "../../interfaces/modals/GenericModalProps";
import {  Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const GenericModal:FC<GenericModalProps>=({isOpen, onClose, modalTitle, children})=>{
    return(
        <Dialog open={isOpen} onClose={onClose}aria-labelledby="modal-title"
        aria-describedby="modal-description" fullWidth maxWidth="md">
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent>
                {children}
                    
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default GenericModal;