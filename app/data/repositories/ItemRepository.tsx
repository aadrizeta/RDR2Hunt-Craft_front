import {AxiosError} from "axios";
import {ApiDelivery} from "../sources/remote/api/ApiDelivery";
import {ItemRepository} from "../../domain/repositories/ItemRepository";
import {
    ItemInterface,
    MaterialInterface,
    ItemMaterialInterface,
    TipoInterface,
    OutfitInterface,
} from "../../domain/entitities/Item";

export class ItemRepositoryImpl implements ItemRepository{
    async getAllItems(): Promise<ItemInterface[]> {
        try {
            const response = await ApiDelivery.get("/items/all")
            return Promise.resolve(response.data);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
        return Promise.resolve([]);
    }

    async getAllMaterials(): Promise<MaterialInterface[]> {
        try {
            const response = await ApiDelivery.get("/materials/all")
            return Promise.resolve([]);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }

    }

    async getAllOutfits(): Promise<OutfitInterface[]> {
        try {
            const response = await ApiDelivery.get("/outfits/all")
            return Promise.resolve([]);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }

    async getAllTipos(): Promise<TipoInterface[]> {
        try {
            const response = await ApiDelivery.get("/tipos/all")
            return Promise.resolve([]);
        } catch (error) {
            let e = (error as AxiosError);
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.resolve(JSON.parse(JSON.stringify(e.response?.data)));
        }
    }

    async getItemByOutfit(idOutfit: number): Promise<ItemInterface[]> {
        try {
            const response = await ApiDelivery.get(`/items/by-outfit/${idOutfit}`);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = error as AxiosError;
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async getItemByTipo(idTipo: number): Promise<ItemInterface[]> {
        try {
            const response = await ApiDelivery.get(`/items/by-tipo/${idTipo}`);
            return Promise.resolve(response.data);

        } catch (error) {
            let e = error as AxiosError;
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async getItemByNombre(nombre: string): Promise<ItemInterface> {
        try {
            const response = await ApiDelivery.get(`/nombre/${encodeURIComponent(nombre)}`);
            return response.data as ItemInterface;
        } catch (error) {
            let e = error as AxiosError;
            console.log("Error: " + JSON.stringify(e.response?.data));
            return Promise.reject(e.response?.data);
        }
    }

    async getItemById(idItem: number): Promise<ItemInterface> {
        try {
            const response = await ApiDelivery.get(`/items/id/${idItem}`);
            return response.data as ItemInterface;
        } catch (error: any) {
            console.log("Error en getItemById:", error?.response?.data || error?.message || error);
            throw error;
        }
    }

    async getItemDetailsById(idItem: number): Promise<ItemInterface> {
        try {
            const response = await ApiDelivery.get(`/items/details/${idItem}`)
            return response.data as ItemInterface;

        }catch (error: any) {
            console.log("Error en getItemById:", error?.response?.data || error?.message || error);
            throw error;
        }
    }



}
