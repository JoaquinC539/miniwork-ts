import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { FC, Fragment, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CollapsableRowData } from "../../interfaces/modals/CollapsableRowData";


const CollapsableTableRow: FC<{ row: CollapsableRowData }> = ({ row }) => {
    const [rowData, setRowData] = useState(row);
    const [open, setOpen] = useState<boolean>(false)
    useEffect(() => {
        setRowData(rowData)
    }, [rowData])

    return (
        <Fragment>
            <TableRow>
                {Object.keys(rowData.mainRow).map((key, index) => (
                    <TableCell key={index}>{rowData.mainRow[key]}</TableCell>
                ))}
                <TableCell>
                    <IconButton aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open}>
                        <Box>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {rowData.nestedColumns.map((col, index) => (
                                            <TableCell key={index}>{col}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowData.nestedRows.map((nestedRow, index) => (
                                        <TableRow key={index}>
                                            {Object.keys(nestedRow).map((key, idx) => (
                                                <TableCell key={idx}>{nestedRow[key]}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    )
}
export default CollapsableTableRow;