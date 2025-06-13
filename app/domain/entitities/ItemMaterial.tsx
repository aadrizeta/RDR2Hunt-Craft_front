import {ItemInterface} from "./Item";
import {Material} from "./Material";

export interface ItemMaterial{
    id: number;
    item: ItemInterface;
    material: Material;
    cantidad: number;
}