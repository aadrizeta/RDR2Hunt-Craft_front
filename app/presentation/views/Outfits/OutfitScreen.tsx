import React, {useEffect, useState} from "react";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";
import DrawerNavigator from "../../navigation/DrawerNavigator";
import {useNavigation} from "@react-navigation/native";
import {ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import stylesHome from "../home/StylesHome";
import stylesItem from "../Items/Styles";
import Header from "../../components/Header";
import {OutfitInterface} from "../../../domain/entitities/Item";
import {AxiosError} from "axios";
import {ApiDelivery} from "../../../data/sources/remote/api/ApiDelivery";
import {OutfitRepositoryImpl} from "../../../data/repositories/OutfitRepository";
import colors from "../../../../assets/colors/colors";
import ItemContainer from "../../components/ItemContainer";
import OutfitDropwdown from "../../components/OutfitDropwdown";

type OutfitsScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>
function Outfits(){
    const [outfits, setOutfits] = useState<OutfitInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<OutfitsScreenNavigationProp>()
    const outfitRepo = new OutfitRepositoryImpl()

    useEffect(() => {
        loadOutfits();
    }, []);

    const loadOutfits =async () => {
        try {
            const response = await outfitRepo.getAllOutfits()
            setOutfits(response);
            console.log(response)
        } catch (error) {
            const e = error as AxiosError;
            console.log("Error loading outfits:", e.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return(
        <View style={stylesItem.main}>
            <Header
                imageSource={require('../../../../assets/icons/menu.png')}
                screenTitle={"Outfits"}
                method={() => navigation.openDrawer()}
            />
            {loading ? (
                <ActivityIndicator size="large" color={colors.yellowRDR2} style={{ marginTop: 32 }} />
            ) : (
                <ScrollView style={stylesItem.scrollView}>
                    <OutfitDropwdown outfits={outfits}/>
                </ScrollView>
            )}
        </View>
    )
}
export default Outfits;
