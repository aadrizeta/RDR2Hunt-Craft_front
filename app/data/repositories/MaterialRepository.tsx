import {MaterialRepository} from "../../domain/repositories/MaterialRepository";
import {MaterialInterface} from "../../domain/entitities/Material";
import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";

export class MaterialRepositoryImpl implements MaterialRepository{
    async getAllMaterials(): Promise<MaterialInterface[]> {
        try {
            const response = await ApiDelivery.get("materials/all");
            return Promise.resolve(response.data);
        }catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }

}
