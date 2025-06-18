import {ItemMaterialRepository} from "../../domain/repositories/ItemMaterialRepository";
import {ItemMaterialInterface} from "../../domain/entitities/ItemMaterial";
import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";


export class ItemMaterialRepositoryImpl implements ItemMaterialRepository{
    async getByMaterial(idMaterial: number): Promise<ItemMaterialInterface[]> {
        try {
            const response = await ApiDelivery.get(`/item-materials/by-material/${idMaterial}`);
            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }

}
