import {OutfitRepository} from "../../domain/repositories/OutfitRepository";
import {OutfitInterface} from "../../domain/entitities/Item";
import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";

export class OutfitRepositoryImpl implements OutfitRepository {
    async getAllOutfits(): Promise<OutfitInterface[]> {
        try {
            const response = await ApiDelivery.get("/outfits/all")
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }

    async getOutfitById(idOutfit: number): Promise<OutfitInterface> {
        try {
            const response = await ApiDelivery.get(`/outfits/by-id/${idOutfit}`)
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }
}
