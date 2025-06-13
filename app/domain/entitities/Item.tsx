
export interface ItemInterface {
    id: number;
    nombre: string;
    precio: number;
    id_tipo: number;
    id_outfit: number;
    tipo: TipoInterface;
    outfit?: OutfitInterface;
    materiales: ItemMaterialInterface[];
}
export interface MaterialInterface{
    id: number;
    nombre: string;
}
export interface ItemMaterialInterface{
    id: number;
    item: ItemInterface;
    material: MaterialInterface;
    cantidad: number;
}
export interface OutfitInterface{
    id: number;
    nombre: string;
    items: ItemInterface[];
}
export interface TipoInterface {
    id: number;
    nombre: string;
}