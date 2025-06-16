import {MaterialInterface} from "../entitities/Material";

export interface MaterialRepository{
    getAllMaterials: () => Promise<MaterialInterface[]>
}
