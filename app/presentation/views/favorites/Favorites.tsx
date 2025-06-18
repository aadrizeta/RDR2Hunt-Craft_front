import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import Header from "../../components/Header";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import stylesItem from "../Items/Styles";
import {ItemRepositoryImpl} from "../../../data/repositories/ItemRepository";
import {useEffect, useState, useCallback} from "react";
import {ItemInterface} from "../../../domain/entitities/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemContainer from "../../components/ItemContainer";
import colors from "../../../../assets/colors/colors";

const FAVORITES_KEY = "FAVORITE_ITEMS";
type OutfitsScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>
function Favorites() {
    const navigation = useNavigation<OutfitsScreenNavigationProp>()
    const [items, setItems] = useState<ItemInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const itemRepo = new ItemRepositoryImpl()

    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                try {
                    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
                    const ids: number[] = stored ? JSON.parse(stored) : [];

                    if (ids.length === 0) {
                        setItems([]);
                        return;
                    }

                    const itemPromises = ids.map((id) => itemRepo.getItemById(id));
                    const fetchedItems = await Promise.all(itemPromises);

                    setItems(fetchedItems);
                    console.log("Favoritos cargados:", fetchedItems);
                } catch (err) {
                    console.error("Error cargando favoritos:", err);
                } finally {
                    setLoading(false);
                }
            };
            loadFavorites(); // Llamamos la función async desde una función normal
        }, [])
    );

    return(
        <View style={stylesItem.main}>
            <Header
                imageSource={require("../../../../assets/icons/menu.png")}
                screenTitle={"Favorites"}
                method={() => navigation.openDrawer()}
            />
            {loading ? (
                <ActivityIndicator size="large" color="gray" style={{ marginTop: 20 }} />
            ) : items.length === 0 ? (
                <View style={styles.container}>
                    <Image
                        source={require('../../../../assets/pictures/favs.png')}
                        style={styles.image}
                    />
                    <Text style={styles.text}>No Favorite Items Found</Text>
                </View>

            ) : (
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    {items.map((item) => (
                        <ItemContainer
                            key={item.id}
                            name={item.nombre}
                            price={item.precio ?? 0}
                            id={item.id}
                            onPress={() => navigation.navigate('ItemDetail', {
                                id_item: item.id,
                                item_name: item.nombre
                            })}
                        />
                    ))}
                </ScrollView>
            )}

        </View>
    )
}
export default Favorites;

const styles = StyleSheet.create({
    text:{
        fontFamily: 'UIFontDefault',
        fontSize: 20,
        color: colors.textDefault,
        textAlign: "center"
    },
    image: {
        width: '85%',
        height: 140,
        borderRadius: 12,
        resizeMode: 'cover',
        marginVertical: 20,
    },
    container: {
        alignItems: "center",
    }
})
