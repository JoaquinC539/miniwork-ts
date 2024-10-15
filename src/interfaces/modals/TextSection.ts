import { BaseSection } from "./BaseSection";

export interface TextSection extends BaseSection{
    type:'text'
    data:{[key:string]:string|number}|string;
    
}