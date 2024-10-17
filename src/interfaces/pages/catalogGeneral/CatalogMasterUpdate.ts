import { CatalogoMaster } from "./CatalogMaster";

export interface CatalogMasterUpdate{
    user: string;
  role: string;
  srcApp: string;
  idCatalog: number;
  catalogMaster:CatalogoMaster
}