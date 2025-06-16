import {OutfitInterface} from "../entitities/Item";

export interface OutfitRepository{
    getAllOutfits: ()=> Promise<OutfitInterface[]>
    getOutfitById: (idOutfit: number)=> Promise<OutfitInterface>
}
