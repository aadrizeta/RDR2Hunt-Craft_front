import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../../../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ItemRepositoryImpl } from "../../../data/repositories/ItemRepository";
import { View, Text, ActivityIndicator } from "react-native";
import {ItemInterface} from "../../../domain/entitities/Item";

type ItemDetailScreenNavigationProp = DrawerNavigationProp<RootStackParamList>;
type ItemDetailRouteProp = RouteProp<RootStackParamList, "ItemDetail">;

function ItemDetailScreen() {
    const navigation = useNavigation<ItemDetailScreenNavigationProp>();
    const route = useRoute<ItemDetailRouteProp>();

    const { id_item, item_name } = route.params;

    const itemRepo = new ItemRepositoryImpl();

    // Estado para guardar el ítem
    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id_item){
            fetchItemById(id_item);
        }
    }, []);

    const fetchItemById =async (id_item) =>{
        try {
            const response = await itemRepo.getItemById(id_item);
            console.log("Item:", response);
        } catch (error: any) {
            // Intenta imprimir diferentes formas del error
            console.log("Error completo:", error);
            console.log("Error mensaje:", error?.message);
            console.log("Error respuesta:", error?.response?.data);
            setError("Error al obtener los ítems");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View>
            <Header
                imageSource={require("../../../../assets/icons/back_icon.png")}
                screenTitle={item_name}
                method={() => navigation.goBack()}
            />
            <View>
                <Text>{}</Text>
            </View>

        </View>
    );
}

export default ItemDetailScreen;
