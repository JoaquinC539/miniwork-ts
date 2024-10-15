import { CatalogData } from "./CatalogData";

export interface CatalogDataResponse{
    operationStatus: boolean;
    code: string|null;
    message: string|null;
    userMessage: string|null,
    result: CatalogData[]
}