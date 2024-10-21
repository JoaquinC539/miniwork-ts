import { NotificationPage } from "./NotificationPage";

export interface NotificationBarProps{
    notification:NotificationPage[];
    onClose:(index:number)=>void;
}