import { BaseSection } from "./BaseSection";

export interface TableSection extends BaseSection{
    type:'table';
    columns:string[];
    rows:Array<{[key:string]:string|number}>
}