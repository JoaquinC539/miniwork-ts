export interface CatalogData {
    username: string | null;
    role: string | null;
    numPage: number;
    sizePage: number;
    id: string;
    description: string | null;
    statusElement: 'ACTIVO' | 'INACTIVO';
    idCatalog: string;
    idElement: number;
    nombre: string;
    descriptionElement: string | null;
    valAlphanumOne: string | null;
    valNumberOne: number | null;
    valAlphanumTwo: string | null;
    valNumberTwo: number | null;
}
