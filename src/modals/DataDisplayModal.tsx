import { FC, useEffect, useState } from "react";
import { DataDisplayModalProps } from "../interfaces/modals/DataDisplayModalProps";
import { SectionData } from "../types/SectionData";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { TextSection } from "../interfaces/modals/TextSection";
import { TableSection } from "../interfaces/modals/TableSection";
import { renderCollapsableTableSection } from "./renderCollapsableTableSection";

const DataDisplayModal: FC<DataDisplayModalProps> = ({ isOpen, onClose, data = [], modalTitle = "Title" }) => {
    const [displayData, setDisplayData] = useState<SectionData[]>(data);

    useEffect(() => {
        if (data.length > 0) {
            setDisplayData(data);
        }
    }, [data]);

    const renderTextSection = (section: TextSection) => {
        if (typeof section.data === 'object') {
            return (
                <>
                    {
                        Object.keys(section.data).map((key, index) => (
                            <Typography key={index} variant="body1">
                                <strong>{key}: </strong>
                                {(section.data as { [key: string]: string | number })[key]}
                            </Typography>
                        ))
                    }
                </>
            )
        } else {
            return (
                <Typography variant="body1">
                    <strong>{section.title}: </strong> {section.data}
                </Typography>
            )
        }
    }

    const renderTableSection=(section:TableSection)=>{
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {section.columns.map((column,index)=>(
                                <TableCell key={index}>{column}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {section.rows.map((row,index)=>(
                            <TableRow key={index}>
                                {section.columns.map((col,colIndex)=>(
                                    <TableCell key={colIndex}>
                                        {row[col]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    


    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" >
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent>
                {displayData && displayData.length > 0 ? (
                    displayData.map((section, index) => (
                        <Box key={index} mb={3} p={2} border={1} borderRadius={2} borderColor={"blue.300"}>
                            <Typography variant="h6" gutterBottom>{section.title}</Typography>
                            {section.type==='text' && renderTextSection(section)}
                            {section.type==='table' && renderTableSection(section)}
                            {section.type==="collapsibleTable" && renderCollapsableTableSection(section)}
                        </Box>
                    ))
                ) :
                    (
                        <Typography variant="body1">No hay información</Typography>
                    )
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cerrar</Button>
            </DialogActions>
        </Dialog>
    )

}
export default DataDisplayModal;