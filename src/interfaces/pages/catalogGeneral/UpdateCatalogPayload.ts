export interface UpdateCatalogPayload {
    role: string;
    numPage?: number | null;
    sizePage?: number | null;
    idCatalog: string;
    idElement: number;
    nombre: string;
    statusElement: string;
  }