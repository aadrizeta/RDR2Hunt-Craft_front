import {
    ItemInterface,
    TipoInterface,
    OutfitInterface,
} from "../entitities/Item";
import {MaterialInterface} from "../entitities/Material";

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
