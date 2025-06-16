import {ItemInterface} from "./Item";
import {MaterialInterface} from "./Material";

export interface ItemMaterialInterface{
    id: number;
    item: ItemInterface;
    material: MaterialInterface;
    cantidad: number;
}
