export interface CatalogResponse{
    operationStatus?: boolean;
    code?: string;
    message: string;
    userMessage?: string | null;
    result?: unknown | null; 
    totalRecords?: number | null;
    totalPages?: number | null;
}