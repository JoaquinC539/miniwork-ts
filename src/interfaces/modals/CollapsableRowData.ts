export interface CollapsableRowData{
    mainRow:{[key:string]:string|number};
    nestedColumns:string[];
    nestedRows:Array<{[key:string]:string|number}>
}