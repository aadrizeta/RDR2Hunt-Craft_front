import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../../../../App";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ItemRepositoryImpl } from "../../../data/repositories/ItemRepository";
import {View, Text, ActivityIndicator, FlatList, Image, TouchableOpacity, Platform, ToastAndroid} from "react-native";
import { ItemInterface } from "../../../domain/entitities/Item";
import styles from "./Styles";
import stylesItem from "./Styles";
import stylesDetails from "./ItemDetailsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const [isFav, setIsFav] = useState(false);

    const FAVORITES_KEY = 'FAVORITE_ITEMS';
    const getFavorites = async (): Promise<number[]> =>{
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            return stored ? JSON.parse(stored) : [];

        } catch (error) {
            console.error('Error al leer favoritos:', error);
            return [];
        }
    }
    const saveFavorites = async (favorites: number[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error('Error al guardar favoritos:', error);
        }
    };
    // Añadir o eliminar un favorito
    const toggleFavorite = async (id: number): Promise<boolean> => {
        const favorites = await getFavorites();
        const isFav = favorites.includes(id);

        const updated = isFav
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];

        await saveFavorites(updated);
        return !isFav;
    };

// Verificar si un ítem es favorito
    const isFavorite = async (id: number): Promise<boolean> => {
        const favorites = await getFavorites();
        return favorites.includes(id);
    };
    useEffect(() => {
        const loadFavoriteStatus = async () => {
            const fav = await isFavorite(id_item);
            setIsFav(fav);
        };
        loadFavoriteStatus();
    }, [id_item]);

    const handleToggleFavorite = async () => {
        const newStatus = await toggleFavorite(id_item);
        setIsFav(newStatus);
        const currentFavorites = await getFavorites();

        if (newStatus) {
            console.log(`Item con ID ${id_item} añadido a favoritos.`);
            console.log("guardados: ", currentFavorites);
            if (Platform.OS === "android") {
                ToastAndroid.show("Añadido a favoritos", ToastAndroid.SHORT);
            }
            // Para iOS puedes usar alert o librería externa
        } else {
            console.log(`Item con ID ${id_item} eliminado de favoritos.`);
            console.log("guardados: ", currentFavorites);
            if (Platform.OS === "android") {
                ToastAndroid.show("Eliminado de favoritos", ToastAndroid.SHORT);
            }
        }
    };

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
            <TouchableOpacity onPress={handleToggleFavorite}>
                <Image
                    source={
                        isFav
                            ? require('../../../../assets/icons/starMarked.png')
                            : require('../../../../assets/icons/star.png')
                    }
                    style={stylesDetails.favIcon}
                />
            </TouchableOpacity>
            <Header
                imageSource={require("../../../../assets/icons/back_icon.png")}
                screenTitle={item.nombre}
                method={() => navigation.goBack()}
            />
            <View style={stylesDetails.body}>
                <View style={stylesDetails.imageContainer}>
                    <Image
                        source={{ uri: item.image }}
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                        }}
                    />
                </View>
                <View style={stylesDetails.dataRow}>
                    <Text style={stylesDetails.dataText}>
                        Category: {item.tipoNombre}
                    </Text>
                    <Text style={stylesDetails.priceText}>
                        $ {item.precio?.toFixed(2) ?? "N/A"}
                    </Text>
                </View>
                {item.outfitNombre && (
                    <Text style={stylesDetails.dataText}>
                        Outfit: {item.outfitNombre.toString()}
                    </Text>
                )}
                <View style={stylesDetails.materials}>
                    <Text style={stylesDetails.dataText}>Materiales:</Text>
                    <FlatList
                        data={item.materiales}
                        renderItem={({ item: mat }) => (
                            <View style={stylesDetails.materialContainer}>
                                <Text style={stylesDetails.materialDataText}>{mat.materialNombre}</Text>
                                <Text style={stylesDetails.materialDataText}>x {mat.cantidad}</Text>
                            </View>
                        )}
                    />
                </View>

            </View>
        </View>
    );
}

export default ItemDetailScreen;
