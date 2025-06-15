import {
    ItemInterface,
    MaterialInterface,
    ItemMaterialInterface,
    TipoInterface,
    OutfitInterface,
} from "../entitities/Item";

export interface ItemRepository{
    getAllItems: ()=> Promise<ItemInterface[]>
    getAllOutfits: ()=> Promise<OutfitInterface[]>;
    getAllMaterials: ()=> Promise<MaterialInterface[]>;
    getAllTipos: ()=> Promise<TipoInterface[]>;
    getItemByOutfit:(idOutfit: number) => Promise<ItemInterface[]>
    getItemByTipo:(idTipo: number) => Promise<ItemInterface[]>
    getItemByNombre: (nombre: string) => Promise<ItemInterface>;
    getItemById: (idItem: number) => Promise<ItemInterface>;
    getItemDetailsById: (idItem: number) => Promise<ItemInterface>;
}
