import {Item} from "./Item";


export interface Outfit{
    id: number;
    nombre: string;
    items: Item[];
}