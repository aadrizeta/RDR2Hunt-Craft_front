import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import {useNavigation} from "@react-navigation/native";
import stylesHome from "../home/StylesHome";
import stylesItem from "./Styles";
import Header from "../../components/Header";
import {ItemRepositoryImpl} from "../../../data/repositories/ItemRepository";
import ItemContainer from "../../components/ItemContainer";

type ItemsScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>

function Items({route}){
    const navigation = useNavigation<ItemsScreenNavigationProp>()
    const {category, id} = route.params || {category: "Items"};

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemRepo = new ItemRepositoryImpl();


    useEffect(() => {
        if (id) {
            fetchItemsByTipo(id);
        }
    }, [id]);

    const fetchItemsByTipo = async (idTipo) => {
        try {
            const response = await itemRepo.getItemByTipo(idTipo);
            setItems(response);
            console.log(response)
        } catch (error) {
            console.log("Error al obtener los ítems:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={stylesItem.main}>
            {/* Header con navegación al Drawer */}
            <Header
                imageSource={require("../../../../assets/icons/menu.png")}
                screenTitle={category}
                method={() => navigation.openDrawer()}
            />

            {/* Lista de ítems con scroll */}
            {loading ? (
                <ActivityIndicator size="large" color="#8B5E3C" />
            ) : (
                <ScrollView style={stylesItem.scrollView}>
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
    );
}
export default Items;
