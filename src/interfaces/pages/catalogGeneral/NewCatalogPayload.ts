export interface NewCatalogPayload {
    username: string;
    role: string;
    numPage?: number | null;
    sizePage?: number | null;
    idCatalog: string;
    idElement?: string | number | null;
    nombre: string;
  }