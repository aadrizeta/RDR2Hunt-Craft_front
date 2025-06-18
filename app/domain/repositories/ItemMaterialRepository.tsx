import {ItemMaterialInterface} from "../entitities/ItemMaterial";

export interface ItemMaterialRepository{
    getByMaterial: (idMaterial: number)=> Promise<ItemMaterialInterface[]>
}
