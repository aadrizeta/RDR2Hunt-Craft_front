import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../../../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ItemRepositoryImpl } from "../../../data/repositories/ItemRepository";
import {View, Text, ActivityIndicator, FlatList, Image} from "react-native";
import { ItemInterface } from "../../../domain/entitities/Item";
import styles from "./Styles";
import stylesItem from "./Styles";

type ItemDetailScreenNavigationProp = DrawerNavigationProp<RootStackParamList>;
type ItemDetailRouteProp = RouteProp<RootStackParamList, "ItemDetail">;

function ItemDetailScreen() {
    const navigation = useNavigation<ItemDetailScreenNavigationProp>();
    const route = useRoute<ItemDetailRouteProp>();

    const { id_item, item_name } = route.params;

    const itemRepo = new ItemRepositoryImpl();

    const [item, setItem] = useState<ItemInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const fetchedItem = await itemRepo.getItemDetailsById(id_item);
                setItem(fetchedItem);
                console.log(fetchedItem)
                setError(null);
            } catch (err: any) {
                setError("Error al cargar el ítem");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchItem();
    }, [id_item]);

    if (loading) {
        return (
            <View style={[stylesItem.main, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={stylesItem.main}>
                <Header
                    imageSource={require("../../../../assets/icons/back_icon.png")}
                    screenTitle={item_name}
                    method={() => navigation.goBack()}
                />
                <Text style={{ color: "red", padding: 16 }}>{error}</Text>
            </View>
        );
    }

    if (!item) {
        return (
            <View style={stylesItem.main}>
                <Header
                    imageSource={require("../../../../assets/icons/back_icon.png")}
                    screenTitle={item_name}
                    method={() => navigation.goBack()}
                />
                <Text>No se encontró el ítem</Text>
            </View>
        );
    }

    return (
        <View style={stylesItem.main}>
            <Header
                imageSource={require("../../../../assets/icons/back_icon.png")}
                screenTitle={item.nombre}
                method={() => navigation.goBack()}
            />
            <View style={{ padding: 16 }}>
                <Text>Precio: ${item.precio?.toFixed(2) ?? "N/A"}</Text>
                <Text>Tipo: {item.tipoNombre?.toString() ?? "N/A"}</Text>
                <Text>Outfit: {item.outfitNombre?.toString() ?? "N/A"}</Text>
                <View style={{ padding: 5 }}>
                    { item.image && (
                        <Image
                            source={{ uri: item.image }}
                            style={{
                                width: "100%",
                                height: 200,
                                resizeMode: "contain",
                                marginBottom: 16,
                                borderRadius: 8,
                            }}
                        />
                    )}

                </View>

                <Text style={[{ marginTop: 16 }]}>Materiales:</Text>
                <FlatList
                    data={item.materiales}
                    keyExtractor={(mat) => mat.materialId.toString()}
                    renderItem={({ item: mat }) => (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 }}>
                            <Text>{mat.materialNombre}</Text>
                            <Text>Cantidad: {mat.cantidad}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

export default ItemDetailScreen;
