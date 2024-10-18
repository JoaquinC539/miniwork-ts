import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CollapsableTableSection } from "../interfaces/modals/CollapsableTableSection";
import CollapsableTableRow from "./CollapsableTableRow";

export const renderCollapsableTableSection = (section: CollapsableTableSection) => {
    return (

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>                        
                        {section.columns.map((column,index)=>(
                            <TableCell  key={index} >{column}</TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {section.rows.map((row,index)=>(
                        <CollapsableTableRow  key={index} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}
