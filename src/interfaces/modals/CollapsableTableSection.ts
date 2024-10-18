import { BaseSection } from "./BaseSection";
import { CollapsableRowData } from "./CollapsableRowData";



export interface CollapsableTableSection extends BaseSection{
    type:'collapsibleTable';
    columns:string[];
    rows:CollapsableRowData[]
}