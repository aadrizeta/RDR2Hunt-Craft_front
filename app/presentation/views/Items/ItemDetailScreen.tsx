import React, {useEffect, useMemo, useState} from "react";
import Header from "../../components/Header";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootStackParamList } from "../../../../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ItemRepositoryImpl } from "../../../data/repositories/ItemRepository";
import {ActivityIndicator, FlatList, Image, Platform, Text, ToastAndroid, TouchableOpacity, View
} from "react-native";
import { ItemInterface } from "../../../domain/entitities/Item";
import stylesItem from "./Styles";
import stylesDetails from "./ItemDetailsStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import stylesHome from "../home/StylesHome";
import ItemModal from "../../modals/ItemModal";

type ItemDetailScreenNavigationProp = DrawerNavigationProp<RootStackParamList>;
type ItemDetailRouteProp = RouteProp<RootStackParamList, "ItemDetail">;

const FAVORITES_KEY = 'FAVORITE_ITEMS';
const CRAFTED_ITEMS_KEY = 'CRAFTED_ITEMS';

function ItemDetailScreen() {
    const navigation = useNavigation<ItemDetailScreenNavigationProp>();
    const route = useRoute<ItemDetailRouteProp>();
    const { id_item, item_name } = route.params;

    const itemRepo = new ItemRepositoryImpl();

    const [item, setItem] = useState<ItemInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFav, setIsFav] = useState(false);
    const [materialProgress, setMaterialProgress] = useState<Record<number, number>>({});
    const [legendaryMaterials, setLegendaryMaterials] = useState<number[]>([]);
    const [isCrafted, setIsCrafted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const getFavorites = async (): Promise<number[]> => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error al leer favoritos:", error);
            return [];
        }
    };

    const saveFavorites = async (favorites: number[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.error("Error al guardar favoritos:", error);
        }
    };

    const toggleFavorite = async (id: number): Promise<boolean> => {
        const favorites = await getFavorites();
        const isFav = favorites.includes(id);
        const updated = isFav
            ? favorites.filter(favId => favId !== id)
            : [...favorites, id];

        await saveFavorites(updated);
        return !isFav;
    };

    const getCraftedItems = async (): Promise<number[]> => {
        try {
            const stored = await AsyncStorage.getItem(CRAFTED_ITEMS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error al leer items fabricados:", error);
            return [];
        }
    };

    const saveCraftedItems = async (craftedItems: number[]) => {
        try {
            await AsyncStorage.setItem(CRAFTED_ITEMS_KEY, JSON.stringify(craftedItems));
        } catch (error) {
            console.error("Error al guardar items fabricados:", error);
        }
    };

    const addCraftedItem = async (id: number) => {
        const craftedItems = await getCraftedItems();
        if (!craftedItems.includes(id)) {
            craftedItems.push(id);
            await saveCraftedItems(craftedItems);
            setIsCrafted(true);
            Platform.OS === 'android'
                ? ToastAndroid.show("Item añadido a fabricados", ToastAndroid.SHORT)
                : alert("Item añadido a fabricados");
            console.log("fabricados: ", craftedItems)
        }
    };
    const craftItem = async (item: ItemInterface) => {
        try {
            const updatedProgress = { ...materialProgress };

            for (const mat of item.materiales) {
                const { materialId, cantidad } = mat;
                const isLegendary = legendaryMaterials.includes(materialId);
                if (!isLegendary) {
                    const current = updatedProgress[materialId] || 0;
                    const newAmount = Math.max(0, current - cantidad);

                    updatedProgress[materialId] = newAmount;

                    // Guarda el nuevo valor en AsyncStorage
                    await AsyncStorage.setItem(
                        `material_${materialId}`,
                        newAmount.toString()
                    );

                    console.log(`Actualizado material_${materialId}: ${current} -> ${newAmount}`);
                }
            }

            setMaterialProgress(updatedProgress); // Actualiza el estado local
            await addCraftedItem(item.id);        // Marca el item como fabricado
        } catch (err) {
            console.error("Error al fabricar el ítem:", err);
            Platform.OS === 'android'
                ? ToastAndroid.show("Error al fabricar el ítem", ToastAndroid.SHORT)
                : alert("Error al fabricar el ítem");
        }
    };


    const handleToggleFavorite = async () => {
        const newStatus = await toggleFavorite(id_item);
        setIsFav(newStatus);
        const currentFavorites = await getFavorites();
        const message = newStatus ? "Añadido a favoritos" : "Eliminado de favoritos";
        Platform.OS === "android" && ToastAndroid.show(message, ToastAndroid.SHORT);
    };
    const canCraft = useMemo(() => {
        if (!item) return false;

        return item.materiales.every(mat => {
            const owned = materialProgress[mat.materialId] || 0;
            const isLegendary = legendaryMaterials.includes(mat.materialId);
            return isLegendary || owned >= mat.cantidad;
        });
    }, [item, materialProgress, legendaryMaterials]);

    useEffect(() => {
        const init = async () => {
            try {
                setLoading(true);

                // Fetch item details
                const fetchedItem = await itemRepo.getItemDetailsById(id_item);
                setItem(fetchedItem);

                // Load favorites and crafted status
                const [favorites, craftedItems] = await Promise.all([
                    getFavorites(),
                    getCraftedItems()
                ]);
                setIsFav(favorites.includes(id_item));
                setIsCrafted(craftedItems.includes(id_item));

                // Load material progress
                const keys = await AsyncStorage.getAllKeys();
                const stores = await AsyncStorage.multiGet(keys.filter(k => k.startsWith("material_")));
                const progress: Record<number, number> = {};
                stores.forEach(([key, value]) => {
                    const id = parseInt(key.replace("material_", ""));
                    progress[id] = parseInt(value || "0", 10);
                });
                setMaterialProgress(progress);

                const legendary = await AsyncStorage.getItem("checked_legendary_materials");
                setLegendaryMaterials(legendary ? JSON.parse(legendary) : []);

                setError(null);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los datos del ítem");
            } finally {
                setLoading(false);
            }
        };
        init();
        console.log("isCrafted:", isCrafted, "canCraft:", canCraft);
    }, [id_item]);

    if (loading) {
        return (
            <View style={[stylesItem.main, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error || !item) {
        return (
            <View style={stylesItem.main}>
                <Header
                    imageSource={require("../../../../assets/icons/back_icon.png")}
                    screenTitle={item_name}
                    method={() => navigation.goBack()}
                />
                <Text style={{ color: "red", padding: 16 }}>{error ?? "No se encontró el ítem"}</Text>
            </View>
        );
    }

    return (
        <View style={stylesItem.main}>
            <TouchableOpacity onPress={handleToggleFavorite}>
                <Image
                    source={
                        isFav
                            ? require("../../../../assets/icons/starMarked.png")
                            : require("../../../../assets/icons/star.png")
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
                    <Image source={{ uri: item.image }} style={{ width: "100%", aspectRatio: 1 }} />
                </View>
                <View style={stylesDetails.dataRow}>
                    <Text style={stylesDetails.dataText}>Category: {item.tipoNombre}</Text>
                    <Text style={stylesDetails.priceText}>${item.precio?.toFixed(2) ?? "N/A"}</Text>
                </View>
                {item.outfitNombre && (
                    <Text style={stylesDetails.dataText}>Outfit: {item.outfitNombre}</Text>
                )}
                <View style={stylesDetails.materials}>
                    <Text style={stylesDetails.dataText}>Materials:</Text>
                    <FlatList
                        data={item.materiales}
                        keyExtractor={(mat) => mat.materialId.toString()}
                        renderItem={({ item: mat }) => {
                            const owned = materialProgress[mat.materialId] || 0;
                            const legendary = legendaryMaterials.includes(mat.materialId);
                            const textStyle = legendary || owned >= mat.cantidad
                                ? stylesDetails.materialDataTextActive
                                : stylesDetails.materialDataText;

                            return (
                                <View style={stylesDetails.materialContainer}>
                                    <Text style={textStyle}>{mat.materialNombre}</Text>
                                    {legendary ? (
                                        <Image
                                            source={require("../../../../assets/icons/check.png")}
                                            style={stylesHome.menuIcon}
                                        />
                                    ) : (
                                        <Text style={textStyle}>
                                            x {mat.cantidad} ({owned}/{mat.cantidad})
                                        </Text>
                                    )}
                                </View>
                            );
                        }}
                    />
                </View>
                <TouchableOpacity
                    style={[
                        isCrafted
                            ? stylesDetails.craftButtonDisable
                            : canCraft
                                ? stylesDetails.craftButtonEnable
                                : stylesDetails.craftButtonDisable
                    ]}
                    onPress={() => setShowModal(true) }
                    disabled={!canCraft || isCrafted}
                >
                    <Text style={stylesDetails.craftButtonText}>
                        {isCrafted ? "Item Crafted" : "Craft Item"}
                    </Text>
                </TouchableOpacity>

            </View>
            <ItemModal
                visible={showModal}
                onClose={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
                onConfirm={() => {
                    craftItem(item);
                    setShowModal(false);
                }}
                materiales={item.materiales}
                item={item}/>
        </View>
    );
}

export default ItemDetailScreen;
