
export interface ItemInterface {
    id: number;
    nombre: string;
    precio: number;
    image: string;
    tipoId?: number | null;          // nullable, según backend
    tipoNombre?: string | null;
    outfitId?: number | null;
    outfitNombre?: string | null;
    materiales: ItemMaterialSimpleInterface[];
}
export interface MaterialInterface{
    id: number;
    nombre: string;
}
export interface ItemMaterialSimpleInterface {
    materialId: number;
    materialNombre: string;
    cantidad: number;
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
